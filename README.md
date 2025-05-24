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

## 🌐 Demo

Puedes ver una versión en vivo del proyecto en:
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-success?style=for-the-badge)](https://rodxordevx.github.io/My-Pokedex/)

## 🛠️ Tecnologías utilizadas

- React 18
- Vite
- CSS3 para estilos
- Web Speech API para la funcionalidad de voz
- PokeAPI para los datos de Pokémon
- ResponsiveVoice para la síntesis de voz
- GitHub Pages para el despliegue

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

## 🚀 Despliegue

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages. Para desplegar tu propia copia:

1. Asegúrate de tener instalado `gh-pages` (ya viene incluido en las dependencias de desarrollo):
   ```bash
   npm install --save-dev gh-pages
   ```

2. Actualiza la propiedad `homepage` en el `package.json` con tu nombre de usuario y repositorio:
   ```json
   "homepage": "https://tunombredeusuario.github.io/My-Pokedex"
   ```

3. Ejecuta el comando de despliegue:
   ```bash
   npm run deploy
   ```

4. Ve a la configuración de tu repositorio en GitHub, selecciona la pestaña "Pages" y asegúrate de que esté configurado para desplegar desde la rama `gh-pages`.

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

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

---

Desarrollado con ❤️ por [RodXorDevX](https://github.com/RodXorDevX)
