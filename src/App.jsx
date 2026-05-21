import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import pairsData from './data/pairs.json';

const ROUND_PAIRS = pairsData.pairs.slice(0, 8);
const LINK_OFFSET = 18;

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const inspirationVariants = {
  idle:            { x: 0 },
  linking:         { x: LINK_OFFSET },
  linked:          { x: LINK_OFFSET },
  'linking-wrong': { x: LINK_OFFSET },
  shaking: {
    x: [
      LINK_OFFSET,
      LINK_OFFSET + 10, LINK_OFFSET - 10,
      LINK_OFFSET + 6,  LINK_OFFSET - 6,
      LINK_OFFSET + 3,  LINK_OFFSET - 3,
      LINK_OFFSET,
    ],
  },
  separating: { x: 0 },
};

const innovationVariants = {
  idle:            { x: 0 },
  linking:         { x: -LINK_OFFSET },
  linked:          { x: -LINK_OFFSET },
  'linking-wrong': { x: -LINK_OFFSET },
  shaking: {
    x: [
      -LINK_OFFSET,
      -LINK_OFFSET - 10, -LINK_OFFSET + 10,
      -LINK_OFFSET - 6,  -LINK_OFFSET + 6,
      -LINK_OFFSET - 3,  -LINK_OFFSET + 3,
      -LINK_OFFSET,
    ],
  },
  separating: { x: 0 },
};

const linkTransition     = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
const shakeTransition    = { duration: 0.55, ease: 'easeInOut' };
const separateTransition = { duration: 0.7, ease: [0.4, 0, 0.6, 1] };

function getTransition(linkStatus) {
  if (linkStatus === 'shaking')    return shakeTransition;
  if (linkStatus === 'separating') return separateTransition;
  return linkTransition;
}

function App() {
  const [selectedLeft, setSelectedLeft]   = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [linkStatus, setLinkStatus]       = useState('idle');
  const [currentView, setCurrentView]     = useState('sequence-1');
  const [wrongAttempt, setWrongAttempt]   = useState(false);
  const [matchedPairIds, setMatchedPairIds] = useState([]);
  const [shuffledInspiration] = useState(() => shuffleArray(ROUND_PAIRS));
  const [shuffledInnovation]  = useState(() => shuffleArray(ROUND_PAIRS));

  const isLocked = linkStatus !== 'idle';
  const allFound = matchedPairIds.length === ROUND_PAIRS.length;

  const selectedLeftPair  = ROUND_PAIRS.find(p => p.id === selectedLeft)  ?? null;
  const selectedRightPair = ROUND_PAIRS.find(p => p.id === selectedRight) ?? null;
  const linkedPair        = ROUND_PAIRS.find(p => p.id === selectedLeft)  ?? null;

  const handleLier = () => {
    if (isLocked) return;
    if (selectedLeft === selectedRight) {
      setLinkStatus('linking');
    } else {
      setLinkStatus('linking-wrong');
    }
  };

  const handleAnimationComplete = (definition) => {
    if (definition === 'linking')       setLinkStatus('linked');
    if (definition === 'linking-wrong') setLinkStatus('shaking');
    if (definition === 'shaking')       setLinkStatus('separating');
    if (definition === 'separating') {
      setLinkStatus('idle');
      setWrongAttempt(true);
    }
  };

  const handleSuivant = () => {
    setMatchedPairIds(prev => [...prev, selectedLeft]);
    setLinkStatus('idle');
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongAttempt(false);
  };

  const handleReessayer = () => {
    setWrongAttempt(false);
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  const showDescriptions = linkStatus === 'idle' && !wrongAttempt;

  const renderLeftGrid = () => shuffledInspiration.map((pair) => {
    const isSelected = selectedLeft === pair.id;
    const isMatched  = matchedPairIds.includes(pair.id);
    return (
      <div
        key={`left-${pair.id}`}
        className={`grid-square ${isSelected ? 'selected' : ''} ${isLocked || isMatched ? 'locked' : ''} ${isMatched ? 'matched' : ''}`}
        onClick={() => !isLocked && !isMatched && setSelectedLeft(pair.id)}
      >
        <img src={pair.inspiration.image} alt={pair.inspiration.alt} className="grid-img" />
      </div>
    );
  });

  const renderRightGrid = () => shuffledInnovation.map((pair) => {
    const isSelected = selectedRight === pair.id;
    const isMatched  = matchedPairIds.includes(pair.id);
    return (
      <div
        key={`right-${pair.id}`}
        className={`grid-square ${isSelected ? 'selected' : ''} ${isLocked || isMatched ? 'locked' : ''} ${isMatched ? 'matched' : ''}`}
        onClick={() => !isLocked && !isMatched && setSelectedRight(pair.id)}
      >
        <img src={pair.innovation.image} alt={pair.innovation.alt} className="grid-img" />
      </div>
    );
  });

  return (
    <div className="container">
      <header className="header">
        <div className="logo-placeholder">
          <h1>STK</h1>
          <span>ARCHITECTURE</span>
        </div>
        <div className="header-right">
          <div className="sequence">
            {currentView === 'sequence-1' ? 'Séquence 1/4' : 'Séquence 2/4'}
          </div>
          <div className="pairs-counter">{matchedPairIds.length}/{ROUND_PAIRS.length} paires trouvées</div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {currentView === 'sequence-1' && (
          <motion.main
            key="sequence-1"
            className="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="cards-row">
              {/* Grille gauche */}
              <div className="grid-container">{renderLeftGrid()}</div>

              {/* Carte Inspiration */}
              <motion.div
                className="card-wrapper card-wrapper-left"
                variants={inspirationVariants}
                animate={linkStatus}
                transition={getTransition(linkStatus)}
                onAnimationComplete={handleAnimationComplete}
              >
                <div className="card placeholder-card-left">
                  <img
                    src={selectedLeftPair?.inspiration.image ?? '/assets/cards/inspiration/card-inspiration-01.webp'}
                    alt={selectedLeftPair?.inspiration.alt ?? 'Inspiration'}
                    className="card-img"
                  />
                </div>
                <AnimatePresence>
                  {showDescriptions && selectedLeftPair && (
                    <motion.div
                      className="description"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3>{selectedLeftPair.inspiration.title}</h3>
                      <p>{selectedLeftPair.inspiration.shortDescription}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Carte Innovation */}
              <motion.div
                className="card-wrapper card-wrapper-right"
                variants={innovationVariants}
                animate={linkStatus}
                transition={getTransition(linkStatus)}
              >
                <div className="card placeholder-card-right">
                  <img
                    src={selectedRightPair?.innovation.image ?? '/assets/cards/innovation/card-innovation-01.webp'}
                    alt={selectedRightPair?.innovation.alt ?? 'Innovation'}
                    className="card-img"
                  />
                </div>
                <AnimatePresence>
                  {showDescriptions && selectedRightPair && (
                    <motion.div
                      className="description"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3>{selectedRightPair.innovation.title}</h3>
                      <p>{selectedRightPair.innovation.shortDescription}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Grille droite */}
              <div className="grid-container">{renderRightGrid()}</div>
            </div>

            {/* Section bas : explications + actions */}
            <div className="bottom-action-section">

              {/* Succès : Le lien biomimétique */}
              <AnimatePresence>
                {linkStatus === 'linked' && linkedPair && (
                  <motion.div
                    className="explanation-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h2>{linkedPair.explanation.title}</h2>
                    <p>{linkedPair.explanation.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Erreur : Piste d'observation */}
              <AnimatePresence>
                {linkStatus === 'idle' && wrongAttempt && (
                  <motion.div
                    className="explanation-text"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2>Piste d'observation</h2>
                    <p>Observez comment une forme peut réduire l'effort d'un mouvement.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bouton contextuel */}
              <div className="center-action">
                <AnimatePresence mode="wait">
                  {allFound && linkStatus === 'idle' && (
                    <motion.button
                      key="sequence-suivante"
                      className="btn-lier"
                      onClick={() => setCurrentView('sequence-2')}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      Séquence suivante
                    </motion.button>
                  )}
                  {!allFound && linkStatus === 'idle' && !wrongAttempt && selectedLeft !== null && selectedRight !== null && (
                    <motion.button
                      key="lier"
                      className="btn-lier"
                      onClick={handleLier}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      Lier
                    </motion.button>
                  )}
                  {linkStatus === 'linked' && (
                    <motion.button
                      key="suivant"
                      className="btn-lier"
                      onClick={handleSuivant}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      Suivant
                    </motion.button>
                  )}
                  {!allFound && linkStatus === 'idle' && wrongAttempt && (
                    <motion.button
                      key="reessayer"
                      className="btn-lier"
                      onClick={handleReessayer}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    >
                      Réessayer
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.main>
        )}

        {currentView === 'sequence-2' && (
          <motion.main
            key="sequence-2"
            className="transition-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="transition-title">
              S<span style={{ fontStyle: 'italic' }}>é</span>quence 2<span style={{ fontFamily: 'Geist Sans, sans-serif', fontWeight: 300, fontSize: '0.9em' }}>/4</span>
            </h2>
            <button className="btn-commencer" onClick={() => setCurrentView('sequence-1')}>
              Commencer
            </button>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
