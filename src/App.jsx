import '@fontsource/playfair-display';
import '@fontsource/dm-serif-display';
import './index.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import pairsData from './data/pairs.json';
import { soundManager } from './utils/soundManager';
import GameRound from './components/GameRound';
import LandingScreen from './pages/LandingScreen/LandingScreen';

const SEQUENCES = pairsData.metadata.sequences.map(seq =>
  seq.pairIds.map(id => pairsData.pairs.find(p => p.id === id))
);
const TOTAL_SEQUENCES = SEQUENCES.length;

function App() {
  const [started, setStarted] = useState(false);
  const [seqIndex, setSeqIndex] = useState(0);
  const [appView, setAppView] = useState('game');

  useEffect(() => {
    soundManager.init();
  }, []);

  useEffect(() => {
    if (appView === 'transition') {
      soundManager.play('levelTransition');
    }
  }, [appView]);

  if (!started) {
    return <LandingScreen onStart={() => setStarted(true)} />;
  }

  const handleSequenceComplete = () => {
    if (seqIndex < TOTAL_SEQUENCES - 1) {
      setAppView('transition');
    } else {
      setAppView('end');
    }
  };

  const handleStart = () => {
    setSeqIndex(i => Math.min(i + 1, TOTAL_SEQUENCES - 1));
    setAppView('game');
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        {appView === 'game' && (
          <GameRound
            key={seqIndex}
            pairs={SEQUENCES[seqIndex]}
            sequenceNumber={seqIndex + 1}
            totalSequences={TOTAL_SEQUENCES}
            onComplete={handleSequenceComplete}
          />
        )}

        {appView === 'transition' && (
          <motion.main
            key="transition"
            className="transition-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="transition-title">
              S<span style={{ fontStyle: 'italic' }}>é</span>quence{' '}
              <span style={{ fontFamily: '"DM Serif Display", serif', fontWeight: 400 }}>
                {seqIndex + 2}/{TOTAL_SEQUENCES}
              </span>
            </h2>
            <button
              className="btn-commencer"
              onClick={() => {
                soundManager.play('button');
                handleStart();
              }}
            >
              Commencer
            </button>
          </motion.main>
        )}

        {appView === 'end' && (
          <motion.main
            key="end"
            className="transition-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="transition-title">
              Parcours<br />
              <span style={{ fontStyle: 'italic' }}>terminé</span>
            </h2>
            <p style={{ textAlign: 'center', color: '#5c5c5c', marginBottom: '40px', fontSize: '15px' }}>
              Vous avez découvert {pairsData.metadata.totalPairs} liens biomimétiques.
            </p>
            <button
              className="btn-commencer"
              onClick={() => {
                soundManager.play('button');
                setSeqIndex(0);
                setAppView('game');
              }}
            >
              Recommencer
            </button>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
