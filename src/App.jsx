import { useEffect, useRef } from 'react';
import Pokedex from './components/Pokedex';
import BackgroundMusic from './components/BackgroundMusic';
import { getBackgroundImagePath } from './utils/assetHelper';
import './App.css';

function App() {
  const backgroundMusicRef = useRef(null);

  // Precargar la imagen de fondo
  useEffect(() => {
    const img = new Image();
    img.src = getBackgroundImagePath();
  }, []);

  return (
    <div className="app-container">
      <BackgroundMusic ref={backgroundMusicRef} />
      <Pokedex backgroundMusicRef={backgroundMusicRef} />
    </div>
  );
}

export default App;