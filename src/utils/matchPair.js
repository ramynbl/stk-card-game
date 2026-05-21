/**
 * Vérifie si une carte Inspiration et une carte Innovation forment une paire valide.
 * Dans notre modèle, une paire valide = même id de paire pour les deux cartes.
 *
 * @param {number|null} inspirationId
 * @param {number|null} innovationId
 * @returns {boolean}
 */
export function matchPair(inspirationId, innovationId) {
  if (inspirationId === null || innovationId === null) return false;
  return inspirationId === innovationId;
}
