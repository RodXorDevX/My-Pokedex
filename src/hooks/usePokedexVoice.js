import { useRef, useState, useCallback, useEffect } from 'react';

const usePokedexVoice = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isVoiceReady, setIsVoiceReady] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Verificar y esperar a que ResponsiveVoice esté listo
  useEffect(() => {
    const checkResponsiveVoice = () => {
      if (window.responsiveVoice && typeof window.responsiveVoice.speak === 'function') {
        setIsVoiceReady(true);
        return true;
      }
      return false;
    };

    // Verificar inmediatamente si ya está cargado
    if (checkResponsiveVoice()) {
      setIsInitialized(true);
      return;
    }

    // Si no está listo, configurar el event listener
    const handleReady = () => {
      if (checkResponsiveVoice()) {
        setIsInitialized(true);
      }
    };

    window.addEventListener('responsiveVoiceReady', handleReady);
    
    // Verificar periódicamente por si el evento no se dispara
    const interval = setInterval(() => {
      if (checkResponsiveVoice()) {
        clearInterval(interval);
        setIsInitialized(true);
      }
    }, 1000);

    // Limpiar
    return () => {
      window.removeEventListener('responsiveVoiceReady', handleReady);
      clearInterval(interval);
    };
  }, []);

  const speak = useCallback((text) => {
    if (!isInitialized) {
      console.warn('ResponsiveVoice no está inicializado');
      return;
    }

    try {
      setIsSpeaking(true);
      
      window.responsiveVoice.speak(text, 'Spanish Latin American Male', {
        rate: 1.2,
        pitch: 1.0,
        volume: 1.0,
        onend: () => {
          setIsSpeaking(false);
        },
        onerror: () => {
          setIsSpeaking(false);
        }
      });
      
    } catch (error) {
      console.error('Error al reproducir voz:', error);
      setIsSpeaking(false);
    }
  }, [isInitialized]);

  const stop = useCallback(() => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stop,
    isSpeaking
  };
};

export default usePokedexVoice;
