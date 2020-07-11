import React from 'react';
import './Home.css';
import CardList from '../CardList/CardList';
import Footer from '../Footer/Footer';
import Instructions from '../Instructions/Instructions';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayClear: false,
      searchValue: '',
      wordList: [],
      searchList: '',
      cardData: [],
      error: false,
      errorMessage: "",
      frontValue: '',
      backValue: ''
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.makeAPICall = this.makeAPICall.bind(this);
    this.displaySearch = this.displaySearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearResult = this.clearResults.bind(this);
    this.createFrontOnChange = this.createFrontOnChange.bind(this);
    this.createBackOnChange= this.createBackOnChange.bind(this);
    this.handleCreateCard = this.handleCreateCard.bind(this);
  };
  

  handleOnChange (event){
    this.setState({searchValue: event.target.value})
    this.setState({error: false})
  };

  handleSearch (event) {
    if (this.state.searchValue.trim() ==="") {
      alert("Please enter a word to search for");
      this.setState({searchValue: ""})
    } else {
      var letters = /^[A-Za-zÀ-ÿ\s]*$/;
      event.preventDefault();
      if (this.state.searchValue === ""){
        alert ("Please enter a valid search")
      } else if (this.state.searchValue.match(letters)) {
        this.makeAPICall(this.state.searchValue);
      } else {
        this.setState({searchValue: ""})
        alert ("Please enter only letters")
      }
    };
  };

  makeAPICall (searchInput) {
    const API_KEY = process.env.REACT_APP_API_KEY;
    var url = `https://www.dictionaryapi.com/api/v3/references/spanish/json/${searchInput}?key=${API_KEY}`
    const wordArray = [];
    fetch (url)
      .then (response => {
        return response.json();
      })
      .then (words => {
        if (words.length === 0) {
          alert("Invalid Search. Please Try again")
        }
        for (const word of words) {
          for (let i=0; i<word.shortdef.length; i++){
            let answer = word.shortdef[i];
            let partOfSpeech = word.fl;
            let englishDef = word.hwi.hw;
            wordArray.push({answer: answer, POS: partOfSpeech, english: englishDef})
          }
        }
        this.setState({wordList : wordArray})
        this.displaySearch(this.state.wordList);
        this.setState({searchValue: ""})
      })
      .catch((error) => {
        let errorTest = String(error)
        this.setState({error: true})
        this.setState({errorMessage: errorTest})
        this.setState({searchValue:""})
      });
  };

  displaySearch (listInfo) {
    var display = listInfo
    var displayArray = []
    for (let i=0; i<display.length; i++) {
      let key = i
      let displayAnswer = display[i].answer;
      let displayPOS = display[i].POS
      let displayEnglish = display[i].english
      displayArray.push(<div className="searchItems" key={key} onClick = {(e) => this.handleClick(e, displayAnswer.split(":").pop(), displayEnglish)}>
          <div className = "English">{displayEnglish}</div>
          <div className="POS">Part of Speech: {displayPOS}</div>
          <div className="answer">{displayAnswer}</div>
        </div>)
    };
    this.setState({searchList:displayArray});
  };

  handleClick(e, Spanish, English) {
    e.preventDefault();
    var newCardData = [];
    newCardData.push(English, Spanish);
    this.setState({cardData:[...this.state.cardData, newCardData]});
    this.setState({searchList: ""});
    this.setState({displayClear: true});
  };

  clearResults (event) {
    event.preventDefault();
    this.setState({cardData: [] });
    this.setState({displayClear: false});
  };

  createFrontOnChange (event) {
    this.setState({frontValue: event.target.value});
    this.setState({error: false});
  };

  createBackOnChange (event) {
    this.setState({backValue: event.target.value});
    this.setState({error: false});
  };

  handleCreateCard (event) {
    event.preventDefault();
    var createCardData = [];
    if (this.state.frontValue.trim() === "" || this.state.backValue.trim() === "") {
      alert("Please enter a word and definition.")
      this.setState({frontValue: ""});
      this.setState({backValue: ""});
    } else {
      var lettersNumbers = /^[A-Za-zÀ-ÿ\s0-9]*$/;
      if (this.state.frontValue.match(lettersNumbers) && this.state.backValue.match(lettersNumbers)) {
        createCardData.push((this.state.frontValue), (this.state.backValue));
        this.setState({cardData:[...this.state.cardData, createCardData]});
        this.setState({displayClear: true});
        this.setState({displayInstructions: false});
        this.setState({frontValue: ""});
        this.setState({backValue: ""});
      } else {
        alert("Only letters and numbers are valid characters. Please try again.");
        this.setState({frontValue: ""});
        this.setState({backValue: ""});
      }
    };
  };


  render() {
    return (
      <div className="App">
          <h1>Spanish Flashcard Generator</h1>
          <Instructions/>
          <div className="forms">
              <div className="formContainer">
                <div className="FormHeading">Generate a Card</div>
                <form className="SearchForm">
                    <input name="APISearch" type="text" placeholder="Search the dictionary"
                    onChange = {event => this.handleOnChange(event)}
                    value = {this.state.searchValue} />
                    <button onClick= {this.handleSearch}>Search</button>
                </form>
              </div>
              <div className="formContainer">
                <div className ="FormHeading">Create a Card</div>
                <form className="CreateForm">
                    <label htmlFor="CreateCardFront">Word for front of card:</label>
                    <input name="CreateCardFront" id ="CreateCardFront" type="text" 
                    placeholder="Enter your word"
                    onChange = {event => this.createFrontOnChange(event)}
                    value = {this.state.frontValue} />
                    <label htmlFor="CreateCardBack">Word for back of card:</label>
                    <input name="CreateCardBack" id="CreateCardBack" type="text" 
                    placeholder="Enter your definition"
                    onChange = {event => this.createBackOnChange(event)}
                    value = {this.state.backValue} />
                    <button onClick = {this.handleCreateCard}>Create Card!</button>
                </form>
              </div>
          </div>
          <div className="searchDisplay">
              <div className="searchBox">
                  {this.state.searchList}
              </div>
          </div>
          <div>
              <CardList cardData= {this.state.cardData}/>
              {this.state.displayClear? <button className="ClearButton" onClick = {event =>this.clearResults(event)}>Clear Cards</button>: ""}
          </div>
          {this.state.error? <h2 className="error">{this.state.errorMessage}. Please try your search again.</h2>: ""}
          <div className="Footer">
              <Footer/>
          </div>
      </div>
    );
  };
  
};

export default Home;
