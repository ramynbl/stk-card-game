/**
 * Calcule les infos de progression pour un round donné.
 *
 * @param {object} round - L'objet round depuis pairs.json
 * @param {number} currentPairIndex - Index de la paire courante (base 0)
 * @returns {{ current: number, total: number, isLast: boolean }}
 */
export function getRoundProgress(round, currentPairIndex) {
  const total = round?.pairIds?.length ?? 0;
  const current = currentPairIndex + 1;
  return {
    current,
    total,
    isLast: current >= total,
  };
}
