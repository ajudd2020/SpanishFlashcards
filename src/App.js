import React from 'react';
import './App.css';
import CardList from './components/CardList/CardList'
import Footer from './components/Footer/Footer'

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      displayInstructions: true,
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
  }
  

  handleOnChange (event){
    this.setState({searchValue: event.target.value.trim()})
    this.setState({error: false})
  };

  handleSearch (event) {
    this.setState({searchValue: event.target.value.trim()})
    console.log("encoded",this.state.searchValue)
    var letters = /^[A-za-z\s]*$/;
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

  makeAPICall (searchInput) {
    var url = `https://www.dictionaryapi.com/api/v3/references/spanish/json/${searchInput}?key=fa92e333-2908-43c0-948e-097fbca8468b`
    console.log(url);
    const wordArray = [];
    fetch (url)
      .then (response => {
        console.log(response)
        return response.json();
      })
      .then (words => {
        console.log(words)
        if (words.length === 0) {
          alert("Invalid Search. Please Try again")
        }
        console.log("words", words)
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
  }

  displaySearch (listInfo) {
    var display = listInfo
    var displayArray = []
    for (let i=0; i<display.length; i++) {
      let key = i
      let displayAnswer = display[i].answer.split(":").pop();
      let displayPOS = display[i].POS
      let displayEnglish = display[i].english
      displayArray.push(<div className="searchItems" key={key} onClick = {(e) => this.handleClick(e, displayAnswer, displayEnglish)}>
          <div className = "English">{displayEnglish}</div>
          <div className="POS">Part of Speech: {displayPOS}</div>
          <div className="answer">{displayAnswer}</div>
        </div>)
    }
    this.setState({displayInstructions: false})
    this.setState({searchList:displayArray})
  }

handleClick(e, Spanish, English) {
  e.preventDefault();
  var newCardData = []
  newCardData.push(English, Spanish)
  this.setState({cardData:[...this.state.cardData, newCardData]})
  this.setState({searchList: ""})
  this.setState({displayClear: true})
}

clearResults (event) {
  event.preventDefault();
  this.setState({cardData: [] })
  this.setState({displayClear: false})
  this.setState({displayInstructions: true})
}

createFrontOnChange (event) {
  this.setState({frontValue: encodeURIComponent(event.target.value.trim())})
  this.setState({error: false})
}

createBackOnChange (event) {
  this.setState({backValue: encodeURIComponent(event.target.value.trim())})
  this.setState({error: false})
}

handleCreateCard (event) {
  event.preventDefault();
  var createCardData = [];
  if (this.state.frontValue === "" || this.state.backValue === "") {
    alert("Please enter a word and definition!")
  } else {
    createCardData.push(this.state.frontValue, this.state.backValue);
    this.setState({cardData:[...this.state.cardData, createCardData]});
    this.setState({displayClear: true});
    this.setState({displayInstructions: false});
    this.setState({frontValue: ""});
    this.setState({backValue: ""});
  }
}


  render() {
    return (
      <div className="App">
          <h1>Spanish Flashcard Generator</h1>
          <div className="forms">
              <div>
                <form className="SearchForm">
                      <input name="APISearch" type="text" placeholder="Enter a word"
                      onChange = {event => this.handleOnChange(event)}
                      value = {this.state.searchValue} />
                      <button onClick= {this.handleSearch}>Search</button>
                </form>
              </div>
              <div>
                <form className="CreateForm">
                  <label for="CreateCardFront">Word for front of card:</label>
                  <input name="CreateCardFront" id ="CreateCardFront" type="text" 
                  placeholder="Enter your word"
                  onChange = {event => this.createFrontOnChange(event)}
                  value = {this.state.frontValue} />
                  <label for="CreateCardBack">Word for back of card:</label>
                  <input name="CreateCardBack" id="CreateCardBack" type="text" 
                  placeholder="Enter your definition"
                  onChange = {event => this.createBackOnChange(event)}
                  value = {this.state.backValue} />
                  <button onClick = {this.handleCreateCard}>Create Card!</button>
                </form>
              </div>
          </div>
          <div className="searchDisplay">
              {this.state.displayInstructions?
              <div className="instructions"><div>This site searchs the Webster's Dictionary API to provide you with the most accurate definition avaliable.</div> <div>Please enter the word you want to search for. Then, click on the definition that you want added to your flashcards</div><div>You can search in English or in Spanish.</div></div>: 
              <div className="searchBox">
                  {this.state.searchList}
              </div>}
          </div>
          {this.state.error? <h2 className="error">{this.state.errorMessage}. Please try your search again.</h2>: ""}
          <CardList cardData= {this.state.cardData}/>
          {this.state.displayClear? <button onClick = {event =>this.clearResults(event)}>Clear Cards</button>: ""}
          <Footer/>
      </div>
    );
  }
  
}

export default App;
