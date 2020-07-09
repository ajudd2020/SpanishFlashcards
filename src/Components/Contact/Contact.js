import React from 'react';
import './Contact.css'

export default function Contact () {

    return(
        <>
            <h1>Contact</h1>
            <div>
                <p>
                    Questions? Concerns? Comments? 
                </p>
                <p>
                    ¿Preguntas? ¿Quejas? ¿Comenatios? 
                </p>
                <p>
                    We want to hear from you! 
                </p>
                <form className="ContactForm">
                    <label htmlFor="name">First/ Last Name:
                        <input className="ContactInput" type="text" id="name" placeholder="Name"></input>
                    </label>
                    <label htmlFor="contact">E-mail Address:
                        <input className="ContactInput" type="e-mail" id="contact" placeholder="E-mail Address"></input>
                    </label>
                </form>
                <div className="TextArea">
                    <label htmlFor="comments">Comments:</label>
                    <textarea id="comments" rows="20" placeholder="Enter Your Comments Here">
                    </textarea>
                </div>
                <button className="ContactSubmit">Submit</button>
            </div>
        </>
    )
}