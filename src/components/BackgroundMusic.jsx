import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

const BackgroundMusic = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  
  // Exponer métodos al componente padre
  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        return audioRef.current.play();
      }
      return Promise.reject('Audio element not found');
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
    isPaused: () => {
      return audioRef.current ? audioRef.current.paused : true;
    }
  }));

  // Reproducir automáticamente cuando el componente se monte
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.loop = true;
          audioRef.current.volume = 0.3; // Volumen más bajo para la música de fondo
          
          // Intentar reproducir (puede fallar debido a políticas de autoplay)
          const playPromise = audioRef.current.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log("La reproducción automática fue prevenida:", error);
              // El usuario debe interactuar primero con la página
              document.addEventListener('click', handleFirstInteraction, { once: true });
            });
          }
        }
      } catch (error) {
        console.error("Error al reproducir el audio:", error);
      }
    };

    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log("Error al reproducir después de la interacción:", error);
        });
      }
    };

    playAudio();

    // Limpiar el event listener si el componente se desmonta
    return () => {
      document.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/assets/sounds/pokemon-opening-theme.mp3"
      preload="auto"
    />
  );
});

BackgroundMusic.displayName = 'BackgroundMusic';

export default BackgroundMusic;
