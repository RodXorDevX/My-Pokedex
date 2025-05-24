# My Pokédex

Una aplicación web interactiva de Pokédex que te permite explorar información detallada de los primeros 649 Pokémon. Incluye características como búsqueda por nombre o número, visualización de estadísticas, tipos, descripciones en español y reproducción de sonidos de Pokémon.

## 🚀 Características

- **Búsqueda de Pokémon** por nombre o número (1-649)
- **Información detallada** incluyendo tipos, estadísticas, altura y peso
- **Descripciones en español** de cada Pokémon
- **Reproducción de sonidos** de los Pokémon
- **Interfaz de voz** que lee la información del Pokémon
- **Diseño responsivo** que se adapta a diferentes tamaños de pantalla
- **Animaciones** de sprites de Pokémon cuando están disponibles

## 🛠️ Tecnologías utilizadas

- React 18
- Vite
- CSS3 para estilos
- Web Speech API para la funcionalidad de voz
- PokeAPI para los datos de Pokémon
- ResponsiveVoice para la síntesis de voz

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RodXorDevX/My-Pokedex.git
   cd My-Pokedex
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## 🎮 Uso

1. **Búsqueda de Pokémon**:
   - Usa la barra de búsqueda para buscar un Pokémon por nombre o número (1-649)
   - Navega entre Pokémon usando los botones de navegación

2. **Reproducir sonido**:
   - Haz clic en el botón de altavoz para escuchar el sonido del Pokémon

3. **Información de voz**:
   - Haz clic en el botón de voz para escuchar la descripción del Pokémon

## 🌐 APIs utilizadas

### PokeAPI (https://pokeapi.co/)
- **Endpoints principales**:
  - `https://pokeapi.co/api/v2/pokemon/{id_or_name}` - Obtiene datos básicos del Pokémon
  - `https://pokeapi.co/api/v2/pokemon-species/{id_or_name}` - Obtiene la descripción en español y otra información de la especie

### API de Sonidos de Pokémon (https://pokedex-api-sounds.onrender.com/)
- **Endpoint**:
  - `https://pokedex-api-sounds.onrender.com/sound/{id}` - Reproduce el sonido del Pokémon con el ID especificado

### ResponsiveVoice
- Utilizado para la síntesis de voz que lee la información del Pokémon

## 🚀 Despliegue

El proyecto está configurado para desplegarse en GitHub Pages. Para desplegar:

```bash
npm run deploy
```

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Créditos

- [RodXorDevX](https://github.com/RodXorDevX) - Desarrollador
- [PokeAPI](https://pokeapi.co/) - Por proporcionar la API de Pokémon
- [PokéAPI-Sounds](https://pokedex-api-sounds.onrender.com/) - Por los sonidos de Pokémon
