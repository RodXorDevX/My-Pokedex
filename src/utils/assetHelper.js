/**
 * Utilidad para manejar las rutas de los recursos de manera consistente
 */

/**
 * Obtiene la ruta completa para un recurso en la carpeta public
 * @param {string} path - Ruta relativa al recurso desde la carpeta public
 * @returns {string} Ruta completa al recurso
 */
export function getAssetPath(path) {
  // Si la ruta ya comienza con /, la devolvemos tal cual
  if (path.startsWith('/')) {
    return path;
  }
  // Si no, asumimos que es una ruta relativa a /assets
  return `/assets/${path}`;
}

/**
 * Obtiene la ruta completa para una imagen de tipo de Pokémon
 * @param {string} typeName - Nombre del tipo de Pokémon (ej: 'fire', 'water')
 * @returns {string} Ruta completa a la imagen del tipo
 */
export function getTypeImagePath(typeName) {
  // Mapeo de nombres de tipos a nombres de archivo
  const typeMap = {
    'fighting': 'fight', // Mapeo especial para 'fighting' que usa 'fight.png'
  };
  
  // Usar el nombre mapeado o el original
  const fileName = typeMap[typeName] || typeName;
  return getAssetPath(`img/${fileName}.png`);
}

/**
 * Obtiene la ruta completa para una imagen de Pokémon
 * @param {string} pokemonId - ID del Pokémon
 * @returns {string} Ruta completa a la imagen del Pokémon
 */
export function getPokemonImagePath(pokemonId) {
  return getAssetPath(`img/pokemon/${pokemonId}.png`);
}

/**
 * Obtiene la ruta completa para la imagen de la Pokédex
 * @returns {string} Ruta completa a la imagen de la Pokédex
 */
export function getPokedexImagePath() {
  return getAssetPath('img/pokedex.png');
}

/**
 * Obtiene la ruta completa para la imagen de fondo
 * @returns {string} Ruta completa a la imagen de fondo
 */
export function getBackgroundImagePath() {
  return getAssetPath('img/wallpaper.png');
}
