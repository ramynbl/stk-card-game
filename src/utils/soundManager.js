class SoundManager {
  constructor() {
    this.sounds = {};
    this.isInitialized = false;
  }

  // Initialisation paresseuse pour éviter les erreurs d'instanciation Audio côté serveur si on passait en SSR
  init() {
    if (this.isInitialized || typeof window === 'undefined') return;

    this.sounds = {
      wrong: new Audio('/assets/sounds/son_reponse_fausse.mp3'),
      levelTransition: new Audio('/assets/sounds/son_transition_niveau.mp3'),
      gameStart: new Audio('/assets/sounds/son_debut_jeu.wav'),
      button: new Audio('/assets/sounds/son_bouton_1.wav'),
      cardFlip: new Audio('/assets/sounds/son_carte.wav'),
      correct: new Audio('/assets/sounds/son_reponse_valide.wav')
    };

    this.isInitialized = true;
  }

  play(soundName) {
    if (!this.isInitialized) {
      this.init();
    }

    const sound = this.sounds[soundName];
    if (sound) {
      // Cloner l'audio permet de jouer le même son plusieurs fois très rapidement (ex: clics multiples)
      // sans attendre que le premier se termine.
      const clone = sound.cloneNode();
      clone.play().catch(error => {
        console.warn(`Impossible de jouer le son ${soundName}:`, error);
      });
    } else {
      console.warn(`Son introuvable : ${soundName}`);
    }
  }
}

// On exporte une instance unique (Singleton)
export const soundManager = new SoundManager();
