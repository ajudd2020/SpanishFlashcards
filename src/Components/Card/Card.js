import React from 'react'
import './Card.css'


class Cards extends React.Component {
    constructor() {
        super();
        this.state = {
            isFront: true
        };
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(event) {
        event.preventDefault();
        this.setState({isFront: !this.state.isFront})
    };

    render(){
    const frontClass = "Front " + (this.state.isFront? "": "Hidden");
    const backClass = "Back " + (this.state.isFront? "Hidden": "");
    
        return(
            <>
                <div className = "FlashCard" onClick = {event => this.handleClick(event)}>
                    <div className = {frontClass}>
                        <div>{this.props.front}</div>
                    </div>
                    <div className = {backClass}>
                        <div>{this.props.back}</div>
                    </div>
                </div>
            </>
        );
    };
};

export default Cards
