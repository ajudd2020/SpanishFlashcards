import React from 'react';
import './Contact.css'

export default function Contact () {

    return(
        <>
            <h1>Contact Us</h1>
            <div>
                <h3>
                    Questions? Concerns? Comments? 
                </h3>
                <h3>
                    ¿Preguntas? ¿Quejas? ¿Comenatios? 
                </h3>
                <h4>
                    We want to hear from you!
                </h4>
                <form className="ContactForm" action="https://formspree.io/myynnraz" method="POST">
                    <label htmlFor="name">First/ Last Name:
                        <input className="ContactInput" type="text" name="name" id="name" placeholder="Name" required="required"></input>
                    </label>
                    <label htmlFor="contact">E-mail Address:
                        <input className="ContactInput" type="email" name="contact" id="contact" placeholder="E-mail Address" required="required"></input>
                    </label>
                    <div className="TextArea">
                        <label htmlFor="comments">Comments:</label>
                        <textarea name="comments" id="comments" rows="20" cols="40" placeholder="Enter Your Comments Here">
                        </textarea>
                    </div>
                    <button className="ContactSubmit" value="submit">Submit</button>
                </form>
            </div>
        </>
    )
}