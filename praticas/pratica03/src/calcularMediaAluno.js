function calcularMediaAluno(a1, a2, a3) {
    if (a1 === undefined || a2 === undefined) {
      throw new Error("Notas a1 ou a2 não informadas");
    }
  
    if (a1 < 0 || a2 < 0) {
      throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
  
    if (a3 !== undefined && a3 < 0) {
      throw new Error("Nota a3 não pode ser negativa");
    }
  
    if (a3 === undefined) {
      return a1 * 0.4 + a2 * 0.6;
    }
  
    const mediaBase = a1 * 0.4 + a2 * 0.6;
    const mediaComA3a1 = a1 * 0.4 + a3 * 0.6;
    const mediaComA3a2 = a3 * 0.4 + a2 * 0.6;
  
    return Math.max(mediaBase, mediaComA3a1, mediaComA3a2);
  }
  
  module.exports = { calcularMediaAluno };