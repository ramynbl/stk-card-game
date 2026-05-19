import { useState } from 'react'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('start')

  return (
    <div className="app-container">
      <header className="game-header">
        <h1 className="title">STK Card Game</h1>
        <p className="subtitle">
          Projet propre et prêt pour le développement. Modifiez <code>src/App.jsx</code> pour commencer.
        </p>
      </header>

      <main className="game-main">
        {gameState === 'start' ? (
          <div className="setup-card">
            <h2>Prêt à jouer ?</h2>
            <p>Bienvenue dans STK Card Game. Personnalisez cet espace pour concevoir votre jeu.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setGameState('playing')}
            >
              Lancer le jeu
            </button>
          </div>
        ) : (
          <div className="game-board">
            <h2>Plateau de jeu</h2>
            <div className="placeholder-deck">
              <p>Votre deck de cartes apparaîtra ici</p>
            </div>
            <button 
              className="btn btn-secondary"
              onClick={() => setGameState('start')}
            >
              Retour à l'accueil
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
