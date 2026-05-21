// Identifiants des écrans — toujours utiliser ces constantes, jamais les strings brutes
export const SCREENS = {
  HOME: 'home',
  GAME: 'game',
  OBSERVATION: 'observation',
  EXPLANATION: 'explanation',
  END: 'end',
};

// Types d'actions du reducer — même principe
export const ACTION_TYPES = {
  START_GAME: 'START_GAME',
  SELECT_INSPIRATION: 'SELECT_INSPIRATION',
  SELECT_INNOVATION: 'SELECT_INNOVATION',
  VALIDATE_PAIR: 'VALIDATE_PAIR',
  RESET_ATTEMPT: 'RESET_ATTEMPT',
  NEXT_PAIR: 'NEXT_PAIR',
  NEXT_ROUND: 'NEXT_ROUND',
  FINISH_GAME: 'FINISH_GAME',
  RESTART_GAME: 'RESTART_GAME',
};
