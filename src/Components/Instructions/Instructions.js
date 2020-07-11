import React from 'react';
import './Instructions.css'

export default function Instructions () {

    return (
        <>
            <h2>Welcome to the Spanish/ English Flashcard Generator</h2>
            <div>
                <p>Use this app to create flashcards to study Spanish/ English English/Spanish vocaulary.</p>
                <h2>To generate your cards:</h2>
                <ol>
                    <li>
                        Enter a word into the search field.
                    </li>
                    <li>
                        Choose the translation/ definition that best fits your needs
                    </li>
                    <li>
                        Click on translation of your choice to add it to your flashcards!
                    </li>
                </ol>
                <h3>Or, you can create your own!</h3>
            </div>
        </>
    )
}