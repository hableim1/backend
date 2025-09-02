const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('Testes da função calcularMediaAluno', () => {
  test('A função calcularMediaAluno deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test('Deve lançar erro se a1 ou a2 não forem informados', () => {
    expect(() => calcularMediaAluno(undefined, 7)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(8, undefined)).toThrow("Notas a1 ou a2 não informadas");
  });

  test('Deve lançar erro se a1 ou a2 forem negativos', () => {
    expect(() => calcularMediaAluno(-1, 7)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(8, -2)).toThrow("Notas a1 ou a2 não podem ser negativas");
  });

  test('Deve calcular média base (a1 * 0.4 + a2 * 0.6) quando a3 não é informada', () => {
    expect(calcularMediaAluno(6, 8)).toBeCloseTo(7.2);
  });

  test('Deve lançar erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(6, 7, -5)).toThrow("Nota a3 não pode ser negativa");
  });

  test('Deve considerar melhor combinação entre a1 e a3', () => {
    expect(calcularMediaAluno(6, 5, 9)).toBeCloseTo(7.8);
  });

  test('Deve considerar melhor combinação entre a2 e a3', () => {
    expect(calcularMediaAluno(9, 5, 8)).toBeCloseTo(8.4);
  });
});