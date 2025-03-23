const theme = {
  colors: {
    primary: '#e50914',     // Rouge Netflix
    secondary: '#b81d24',   // Rouge foncé Netflix
    dark: '#000000',        // Noir
    light: '#ffffff',       // Blanc
    darkGrey: '#141414',    // Gris foncé (fond)
    mediumGrey: '#333333',  // Gris moyen
    lightGrey: '#8c8c8c',   // Gris clair (texte secondaire)
    success: '#46d369',     // Vert (rating élevé)
    overlay: 'rgba(0, 0, 0, 0.75)', // Overlay pour les modals
  },
  fonts: {
    regular: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  },
  spacing: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  breakpoints: {
    mobile: '576px',      // Petit mobile
    tablet: '768px',      // Tablette
    laptop: '992px',      // Portable
    desktop: '1200px',    // Bureau
    largeDesktop: '1400px' // Grand écran
  },
  transitions: {
    default: '0.3s ease',
    slow: '0.5s ease',
    fast: '0.15s ease'
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.2)',
    large: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  borderRadius: {
    small: '2px',
    medium: '4px',
    large: '8px',
  }
};

export default theme;