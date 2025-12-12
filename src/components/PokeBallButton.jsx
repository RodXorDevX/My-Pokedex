import React from 'react';
import './PokeBallButton.css';

const PokeBallButton = ({ onClick }) => {
    return (
        <div className="pokeball-container">
           
            <button className="pokeball-button" onClick={onClick}>
              
            </button>
        </div>
    );
};

export default PokeBallButton;