import { useState } from 'react';
import './App.css';

function App() {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);

  // Générateur pour la grille de gauche
  const renderLeftGrid = () => {
    return Array.from({ length: 8 }).map((_, i) => {
      const isDark = i < 2; // Les deux premiers sont foncés
      const isSelected = selectedLeft === i;
      return (
        <div 
          key={`left-${i}`}
          className={`grid-square ${isDark ? 'dark' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedLeft(i)}
        >
          <img src="/assets/cards/inspiration/card-inspiration-01.png" alt="Inspiration" className="grid-img" />
        </div>
      );
    });
  };

  // Générateur pour la grille de droite
  const renderRightGrid = () => {
    return Array.from({ length: 8 }).map((_, i) => {
      const isDark = i < 2;
      const isSelected = selectedRight === i;
      return (
        <div 
          key={`right-${i}`}
          className={`grid-square ${isDark ? 'dark' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedRight(i)}
        >
          <img src="/assets/cards/innovation/card-innovation-01.png" alt="Innovation" className="grid-img" />
        </div>
      );
    });
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo-placeholder">
          <h1>STK</h1>
          <span>ARCHITECTURE</span>
        </div>
        <div className="sequence">
          Séquence 1/4
        </div>
      </header>

      <main className="main-content">
        
        {/* Grille de gauche */}
        <div className="grid-container">
          {renderLeftGrid()}
        </div>
        
        {/* Carte et Description de gauche */}
        <div className="card-wrapper">
          <div className="card placeholder-card-left">
            {/* Image de la baleine */}
            <img src="/assets/cards/inspiration/card-inspiration-01.png" alt="Nageoires de baleine" className="card-img" />
            <div className="card-text">
              <h2>Nageoires<br/>de baleine</h2>
              <p>Inspiration</p>
            </div>
          </div>
          
          <div className="description">
            <h3>Nageoires de baleine</h3>
            <p>Sa morphologie brise la résistance du courant pour glisser avec un effort minimal.</p>
          </div>
        </div>

        {/* Bouton Lier (Placé plus bas entre les descriptions) */}
        <div className="center-action">
          <button className="btn-lier">Lier</button>
        </div>

        {/* Carte et Description de droite */}
        <div className="card-wrapper">
          <div className="card placeholder-card-right">
            {/* Image de l'éolienne */}
            <img src="/assets/cards/innovation/card-innovation-01.png" alt="Éoliennes" className="card-img" />
            <div className="card-text">
              <h2>Éoliennes</h2>
              <p>Innovation</p>
            </div>
          </div>
          
          <div className="description">
            <h3>Éoliennes</h3>
            <p>Ces pales géantes tournent même par vent très faible grâce à leur profil unique</p>
          </div>
        </div>

        {/* Grille de droite */}
        <div className="grid-container">
          {renderRightGrid()}
        </div>

      </main>
    </div>
  );
}

export default App;
