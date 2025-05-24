import { useState, useEffect, useRef, useCallback } from 'react';
import PokemonInfo from './PokemonInfo';
import './Pokedex.css';

const Pokedex = ({ backgroundMusicRef }) => {
    const [currentPokemonId, setCurrentPokemonId] = useState(1);
    const [pokemonData, setPokemonData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const audioRef = useRef(null);
    const totalPokemons = 649;

    // Efecto para inicializar el audio después del montaje
    useEffect(() => {
        audioRef.current = new Audio();
        
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const limitPokemonId = (id) => Math.min(Math.max(1, id), totalPokemons);

    const fetchPokemonData = async (pokemon) => {
        setIsLoading(true);
        setError(null);
        try {
            const [pokemonResponse, speciesResponse] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`),
                fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
            ]);

            if (!pokemonResponse.ok || !speciesResponse.ok) {
                throw new Error('Error al cargar el Pokémon');
            }

            const [pokemonData, speciesData] = await Promise.all([
                pokemonResponse.json(),
                speciesResponse.json()
            ]);

            const spanishDescription = speciesData.flavor_text_entries.find(
                entry => entry.language.name === 'es'
            )?.flavor_text || 'Descripción no disponible en español';

            const animatedSprite = pokemonData.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default;
            const defaultSprite = pokemonData.sprites.other?.['official-artwork']?.front_default || 
                                pokemonData.sprites.front_default;

            setPokemonData({
                ...pokemonData,
                description: spanishDescription.replace(/\f/g, ' '),
                spriteUrl: animatedSprite || defaultSprite,
                isAnimated: !!animatedSprite
            });
            
            setCurrentPokemonId(pokemonData.id);
        } catch (error) {
            console.error('Error al cargar el Pokémon:', error);
            setError('Error al cargar el Pokémon. Por favor, intenta de nuevo.');
            setPokemonData(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Función para reproducir el sonido del Pokémon
    const playPokemonSound = useCallback(() => {
        if (!pokemonData || !audioRef.current) return;
        
        try {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            
            const pokemonId = pokemonData.id;
            if (pokemonId >= 1 && pokemonId <= 649) {
                audioRef.current.src = `https://pokedex-api-sounds.onrender.com/sound/${pokemonId}`;
                audioRef.current.play().catch(console.error);
            }
        } catch (error) {
            console.error('Error en playPokemonSound:', error);
        }
    }, [pokemonData]);

    // Efecto para cargar los datos del Pokémon cuando cambia el ID
    useEffect(() => {
        fetchPokemonData(currentPokemonId);
    }, [currentPokemonId]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = searchTerm.trim();
        if (searchValue) {
            const pokemonId = !isNaN(searchValue) 
                ? limitPokemonId(parseInt(searchValue))
                : searchValue.toLowerCase();
            setCurrentPokemonId(pokemonId);
        }
        setSearchTerm('');
    };

    const handlePrevious = () => {
        setCurrentPokemonId(prev => prev > 1 ? prev - 1 : totalPokemons);
    };

    const handleNext = () => {
        setCurrentPokemonId(prev => prev < totalPokemons ? prev + 1 : 1);
    };

    if (isLoading) {
        return <div className="loading">Cargando...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="pokedex-container">
            {/* Video de fondo */}
            <div className="video-background">
                <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="video-bg"
                >
                    <source src="/assets/videos/background-pikachu.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                </video>
                <div className="video-overlay"></div>
            </div>
            
            <main>
                {pokemonData && (
                    <img 
                        src={pokemonData.spriteUrl} 
                        alt={pokemonData.name}
                        className={`pokemon_image ${pokemonData.isAnimated ? 'animated' : ''}`}
                        onClick={playPokemonSound}
                    />
                )}

                <div className="pokemon_data">
                    <span className="pokemon_number">
                        #{String(pokemonData?.id || '?').padStart(3, '0')}
                    </span>
                    <span> - </span>
                    <span className="pokemon_name">
                        {pokemonData?.name ? pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1) : '???'}
                    </span>
                </div>

                <form className="form" onSubmit={handleSearch}>
                    <input 
                        type="search" 
                        className="input_search" 
                        placeholder="Name or Number"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                </form>

                <div className="buttons">
                    <button type="button" className="button button_prev" onClick={handlePrevious}>
                        Previous
                    </button>
                    <button type="button" className="button button_next" onClick={handleNext}>
                        Next
                    </button>
                </div>

                <img 
                    src="/assets/img/pokedex.png" 
                    alt="pokedex" 
                    className="pokedex"
                />
            </main>

            {pokemonData && (
                <PokemonInfo 
                    pokemon={pokemonData} 
                    backgroundMusicRef={backgroundMusicRef}
                />
            )}
        </div>
    );
};

export default Pokedex;