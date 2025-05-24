import { useEffect, useState, useRef, useCallback } from 'react';
import { getTypeImagePath } from '../utils/assetHelper';
import usePokedexVoice from '../hooks/usePokedexVoice';
import './PokemonInfo.css';

const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

const statNames = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque Especial',
    'special-defense': 'Defensa Especial',
    speed: 'Velocidad'
};

const PokemonInfo = ({ pokemon }) => {
    const [borderColor, setBorderColor] = useState('#d32f2f');
    const { speak, stop } = usePokedexVoice();
    const audioRef = useRef(new Audio());

    // Función para reproducir el sonido del Pokémon
    const playPokemonSound = useCallback(() => {
        if (!pokemon) return Promise.resolve();
        
        return new Promise((resolve) => {
            try {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                
                const pokemonId = pokemon.id;
                if (pokemonId >= 1 && pokemonId <= 649) {
                    audioRef.current.src = `https://pokedex-api-sounds.onrender.com/sound/${pokemonId}`;
                    audioRef.current.play()
                        .then(() => {
                            const onEnded = () => {
                                audioRef.current.removeEventListener('ended', onEnded);
                                resolve();
                            };
                            audioRef.current.addEventListener('ended', onEnded, { once: true });
                        })
                        .catch(error => {
                            console.error('Error al reproducir sonido del Pokémon:', error);
                            resolve();
                        });
                } else {
                    resolve();
                }
            } catch (error) {
                console.error('Error en playPokemonSound:', error);
                resolve();
            }
        });
    }, [pokemon]);

    // Función para hablar con la descripción del Pokémon
    const speakPokemonInfo = useCallback(async () => {
        if (!pokemon) return;
        
        const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const typesText = pokemon.types.length > 1 
            ? `Tipo ${pokemon.types[0].type.name} y ${pokemon.types[1].type.name}`
            : `Tipo ${pokemon.types[0].type.name}`;
            
        const heightText = `Altura: ${(pokemon.height / 10).toFixed(1)} metros.`;
        const weightText = `Peso: ${(pokemon.weight / 10).toFixed(1)} kilogramos.`;
        
        // Obtener estadísticas
        const statsText = pokemon.stats
            .map(stat => {
                const statName = stat.stat.name.replace('-', ' ');
                return `${statName}: ${stat.base_stat}`;
            })
            .join('. ');
        
        // Texto completo para la voz
        const fullText = `${pokemonName}. ${typesText}. ${heightText} ${weightText} ${pokemon.description || ''} Estadísticas: ${statsText}`;
        
        try {
            speak(fullText);
        } catch (error) {
            console.error('Error al reproducir voz:', error);
        }
    }, [pokemon, speak]);

    // Efecto para manejar la carga inicial del Pokémon
    useEffect(() => {
        if (pokemon?.types?.[0]) {
            const firstType = pokemon.types[0].type.name;
            setBorderColor(typeColors[firstType] || '#d32f2f');
            
            // Reproducir sonido del Pokémon y luego voz automáticamente
            const playSoundAndSpeak = async () => {
                try {
                    await playPokemonSound();
                    await speakPokemonInfo();
                } catch (error) {
                    console.error('Error al reproducir sonido y voz:', error);
                }
            };
            
            playSoundAndSpeak();
        }
        
        // Limpiar al desmontar
        return () => {
            stop();
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [pokemon, playPokemonSound, speakPokemonInfo, stop]);

    const getStatValue = (statName) => {
        const stat = pokemon.stats.find(s => s.stat.name === statName);
        return stat ? stat.base_stat : 0;
    };

    const getStatPercentage = (statName) => {
        const value = getStatValue(statName);
        return Math.min(100, (value / 255) * 100);
    };

    if (!pokemon) return null;

    return (
        <div className="datos" style={{ 
            borderColor: borderColor,
            boxShadow: `5px 5px 0 #888, 8px 8px 0 #333, 0 0 10px ${borderColor}80`
        }}>
            <div className="pokedex-header">
                <h2>Pokédex Info</h2>
            </div>
            
            <div className="datos-content-wrapper">
                <div className="datos-content">
                    <div className="pokemon-header">
                        <div className="pkmn-types">
                            {pokemon.types.map((typeObj, index) => {
                                const typeName = typeObj.type.name.toLowerCase();
                                return (
                                    <img
                                        key={index}
                                        className="pkmntype-img"
                                        src={getTypeImagePath(typeName)}
                                        alt={typeName}
                                        onError={(e) => {
                                            console.error(`Error loading type image: ${typeName}`);
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                );
                            })}
                        </div>

                        <div className="pokemon-details">
                            <p><strong>Altura:</strong> <span>{(pokemon.height / 10).toFixed(1)} m</span></p>
                            <p><strong>Peso:</strong> <span>{(pokemon.weight / 10).toFixed(1)} kg</span></p>
                        </div>
                    </div>
                    
                    <div className="pkmndescription">
                        <p>{pokemon.description || 'No hay descripción disponible para este Pokémon.'}</p>
                    </div>

                    <div className="stats-section">
                        <h3>Estadísticas Base</h3>
                        <div className="pkmnstats">
                            {Object.entries(statNames).map(([statKey, statName], index) => {
                                const value = getStatValue(statKey);
                                const maxStat = statKey === 'hp' ? 255 : 200;
                                const percentage = Math.min(100, (value / maxStat) * 100);
                                
                                return (
                                    <div key={statKey} className={`stat-container ${index % 2 === 0 ? 'first-stat' : 'second-stat'}`}>
                                        <div className="stat-info">
                                            <span className="stat-name">{statName}</span>
                                            <span className="stat-value">{value}</span>
                                        </div>
                                        <div className="stat-visual">
                                            <div 
                                                className="stat-dot"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor: borderColor,
                                                    opacity: 0.8
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonInfo;