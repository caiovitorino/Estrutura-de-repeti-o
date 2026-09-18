function classificarConsumo(consumo: number): string {
  if (consumo < 0) {
    return "Valor inválido: o consumo não pode ser negativo.";
  }
  if (consumo <= 100) {
    return "Faixa 1: Consumo até 100 kWh";
  } else if (consumo <= 220) {
    return "Faixa 2: Consumo de 101 a 220 kWh";
  } else {
    return "Faixa 3: Consumo acima de 220 kWh";
  }
}

// Registro das 5 saídas de teste solicitadas: 0, 100, 101, 220, 221
const testesQ1 = [0, 100, 101, 220, 221];
testesQ1.forEach(consumo => {
  console.log(`Consumo: ${consumo} kWh -> ${classificarConsumo(consumo)}`);
});
/* SAÍDAS ESPERADAS:
   Consumo: 0 kWh -> Faixa 1: Consumo até 100 kWh
   Consumo: 100 kWh -> Faixa 1: Consumo até 100 kWh
   Consumo: 101 kWh -> Faixa 2: Consumo de 101 a 220 kWh
   Consumo: 220 kWh -> Faixa 2: Consumo de 101 a 220 kWh
   Consumo: 221 kWh -> Faixa 3: Consumo acima de 220 kWh
*/
