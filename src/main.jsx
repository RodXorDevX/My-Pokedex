import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Importar estilos globales
import './components/Pokedex.css';
import './components/PokemonInfo.css';
import PokeBallButton from './components/PokeBallButton';

function RootApp() {
  const [showPokedex, setShowPokedex] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  const handleOpenPokedex = () => {
    setShowPokedex(true);
    setAudioEnabled(true); // Habilitar audio al abrir la Pokédex

    // Verificar y reproducir música de fondo
    const backgroundMusic = new Audio('/assets/sounds/background-music.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play().catch(error => {
      console.error('Error al reproducir música de fondo:', error);
    });

    // Verificar y reproducir sonido de clic
    const clickSound = new Audio('/assets/sounds/click-sound.mp3');
    clickSound.play().catch(error => {
      console.error('Error al reproducir el sonido de clic:', error);
    });
  };

  const handlePokeBallClick = () => {
    // Lógica para reproducir música, sonido y abrir la Pokédex
    console.log('Pokébola presionada');
    // Aquí puedes redirigir a la vista de la Pokédex o manejar el estado
  };

  if (!showPokedex) {
    return (
      <div className="home-screen">
        <div className="choose-text">¡Elige tu Pokémon!</div>
           <div className="arrow-text">               
                <div className="arrow"></div>
            </div>
        <PokeBallButton onClick={handlePokeBallClick} />
        <div className="pokeball-container" onClick={handleOpenPokedex}>
          <img
            src="/assets/img/pokeball-icon.png"
            alt="Pokeball Icon"
            className="pokeball-icon"
          />
          
          
        </div>
      </div>
    );
  }

  return <App audioEnabled={audioEnabled} />; // Pasar audioEnabled a App
}

// Renderizar la aplicación en el elemento con id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
