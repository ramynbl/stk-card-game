/**
 * Mélange un tableau sans modifier l'original (algorithme Fisher-Yates).
 * Utile si on veut afficher les cartes dans un ordre aléatoire.
 *
 * @param {Array} array
 * @returns {Array} nouveau tableau mélangé
 */
export function shuffleArray(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
