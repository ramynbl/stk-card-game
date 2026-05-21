import { GameProvider } from './context/GameContext'
import GameScreen from './pages/GameScreen'

function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  )
}

export default App
