//Questão 1 — Tarifa de energia
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



//Questão 2 — Elegibilidade para benefício
interface Familia {
  nome: string;
  rendaPorPessoa: number;
  cadastroAtivo: boolean;
  possuiIdoso: boolean;
}

function avaliarBeneficio(familia: Familia): string {
  if (!familia.cadastroAtivo || familia.rendaPorPessoa > 706) {
    return `${familia.nome}: Não elegível ao benefício.`;
  }
  if (familia.possuiIdoso) {
    return `${familia.nome}: Elegível com PRIORIDADE (Possui idoso).`;
  }
  return `${familia.nome}: Elegível ao benefício (Atende critérios básicos).`;
}

// 4 Cenários de teste
const familias: Familia[] = [
  { nome: "Família Silva", rendaPorPessoa: 500, cadastroAtivo: true, possuiIdoso: true },   // Elegível + Prioridade
  { nome: "Família Souza", rendaPorPessoa: 600, cadastroAtivo: true, possuiIdoso: false },  // Elegível Básica
  { nome: "Família Lima", rendaPorPessoa: 800, cadastroAtivo: true, possuiIdoso: true },    // Renda excede
  { nome: "Família Santos", rendaPorPessoa: 400, cadastroAtivo: false, possuiIdoso: false } // Cadastro inativo
];

familias.forEach(f => console.log(avaliarBeneficio(f)));


//Questão 3 — Alerta de temperatura

function avaliarTemperatura(temp: number): string {
  // Garantia de ordem: validações de limites absolutos primeiro
  if (temp < -20 || temp > 100) {
    return "Erro: Leitura fora do limite operacional do sensor (Dado Inválido).";
  }
  if (temp <= 29) {
    return "Status: Normal";
  } else if (temp <= 39) {
    return "Status: Atenção";
  } else {
    return "Status: Crítico";
  }
}

// Teste de Mesa
const leiturasTemp = [-25, -20, 29, 30, 39, 40, 100, 105];
leiturasTemp.forEach(t => console.log(`Temp ${t}°C -> ${avaliarTemperatura(t)}`));

//Questão 4 — Controle de acesso

type Perfil = "aluno" | "professor" | "coordenador" | "desconhecido";

function obterPermissao(perfil: Perfil): string {
  switch (perfil) {
    case "aluno":
      return "Acesso permitido: Área Acadêmica e Disciplinas.";
    case "professor":
      return "Acesso permitido: Gestão de Turmas e Lançamento de Notas.";
    case "coordenador":
      return "Acesso permitido: Painel de Gestão do Curso e Relatórios Gerais.";
    default:
      return "Alerta de Segurança: Perfil desconhecido. Nenhum acesso concedido.";
  }
}

// Execução com perfis válidos e entrada inválida
const perfis: Perfil[] = ["aluno", "professor", "coordenador", "desconhecido"];
perfis.forEach(p => console.log(`Perfil [${p}]: ${obterPermissao(p)}`));

//Questão 5 — Desconto progressivo

function calcularDesconto(valorCompra: number, eInstitucional: boolean): { percentual: number; valorFinal: number } {
  let percentual = 0;

  if (valorCompra > 600) {
    percentual = 15;
  } else if (valorCompra > 300) {
    percentual = 10;
  } else if (valorCompra > 100) {
    percentual = 5;
  }

  if (eInstitucional) {
    percentual += 3;
  }

  // Teto máximo de desconto de 18%
  if (percentual > 18) {
    percentual = 18;
  }

  const valorFinal = valorCompra * (1 - percentual / 100);
  return { percentual, valorFinal };
}

// Testes para auditoria da regra
const compras = [
  { valor: 80, inst: false },
  { valor: 150, inst: false },
  { valor: 400, inst: true },
  { valor: 700, inst: true } // 15% + 3% = 18%
];

compras.forEach(c => {
  const res = calcularDesconto(c.valor, c.inst);
  console.log(`Valor: R$${c.valor} | Institucional: ${c.inst} -> Desconto: ${res.percentual}% | Total: R$${res.valorFinal.toFixed(2)}`);
});

//Questão 6 — Validação de triângulo
function classificarTriangulo(a: number, b: number, c: number): string {
  // Medidas devem ser estritamente positivas
  if (a <= 0 || b <= 0 || c <= 0) {
    return "Medidas inválidas: todos os lados devem ser maiores que zero.";
  }

  // Validação da Desigualdade Triangular
  const eValido = (a + b > c) && (a + c > b) && (b + c > a);
  if (!eValido) {
    return "Os lados informados não formam um triângulo.";
  }

  // Classificação
  if (a === b && b === c) {
    return "Triângulo Equilátero";
  } else if (a === b || a === c || b === c) {
    return "Triângulo Isósceles";
  } else {
    return "Triângulo Escaleno";
  }
}

// Testes
console.log(classificarTriangulo(3, 3, 3)); // Equilátero
console.log(classificarTriangulo(3, 3, 5)); // Isósceles
console.log(classificarTriangulo(3, 4, 5)); // Escaleno
console.log(classificarTriangulo(1, 2, 5)); // Inválido

//Questão 7 — Ano bissexto

function eBissexto(ano: number): boolean {
  // Agrupamento lógico: Divisível por 400 OU (Divisível por 4 E NÃO divisível por 100)
  return (ano % 400 === 0) || (ano % 4 === 0 && ano % 100 !== 0);
}

const anos = [1900, 2000, 2024, 2100];
anos.forEach(ano => {
  console.log(`Ano ${ano}: ${eBissexto(ano) ? "É Bissexto" : "Não é Bissexto"}`);
});

/* Explosão Lógica dos Operadores:
   - `(ano % 400 === 0)` Garante a exceção centenária especial (ex: 2000 é bissexto).
   - `(ano % 4 === 0 && ano % 100 !== 0)` Regra geral do bissexto excluindo múltiplos de 100 comum (ex: 1900 e 2100 não são).
*/


//Questão 8 — Frete por região
type Regiao = "N" | "NE" | "CO" | "SE" | "S";

function calcularFrete(regiao: Regiao, valorPedido: number): number {
  let freteBase = 0;

  switch (regiao) {
    case "N":  freteBase = 40; break;
    case "NE": freteBase = 30; break;
    case "CO": freteBase = 25; break;
    case "SE": freteBase = 15; break;
    case "S":  freteBase = 20; break;
  }

  // Isenção condicional aplicada sem recalcular valorPedido
  const temFreteGratis = valorPedido > 500 && (regiao === "NE" || regiao === "SE");
  return temFreteGratis ? 0 : freteBase;
}

// Matriz de testes
console.log("NE > 500:", calcularFrete("NE", 600)); // 0
console.log("SE <= 500:", calcularFrete("SE", 400)); // 15
console.log("S > 500:", calcularFrete("S", 600));   // 20

//Questão 9 — Média acadêmica
function avaliarNotas(n1: number, n2: number, n3: number): string {
  // Validação preliminar das notas
  const notas = [n1, n2, n3];
  for (const n of notas) {
    if (n < 0 || n > 10) {
      return "Erro: Todas as notas devem estar no intervalo de 0 a 10.";
    }
  }

  const media = (n1 + n2 + n3) / 3;

  if (media >= 7) {
    return `Média: ${media.toFixed(2)} - Aprovado`;
  } else if (media >= 5) {
    return `Média: ${media.toFixed(2)} - Recuperação`;
  } else {
    return `Média: ${media.toFixed(2)} - Reprovado`;
  }
}

// Testes em pontos de fronteira
console.log(avaliarNotas(7, 7, 7));   // Aprovado (7.0)
console.log(avaliarNotas(5, 5, 5));   // Recuperação (5.0)
console.log(avaliarNotas(4.9, 5, 5)); // Reprovado (<5.0)
console.log(avaliarNotas(11, 8, 9));  // Entrada inválida

//Questão 10 — Semáforo inteligente

type CorSemaforo = "verde" | "amarelo" | "vermelho";

function controlarSemaforo(cor: CorSemaforo, pedestrePresente: boolean, sensorOk: boolean): string {
  if (!sensorOk) {
    return "MODO DE SEGURANÇA ATIVADO: Amarelo piscante (Instabilidade nos sensores).";
  }

  switch (cor) {
    case "vermelho":
      return "Veículos: PARAR | Pedestres: ATRAVESSAR";
    case "verde":
      return pedestrePresente
        ? "Veículos: ATENÇÃO (Pedestre aguardando) | Pedestres: AGUARDAR"
        : "Veículos: PROSSEGUIR | Pedestres: AGUARDAR";
    case "amarelo":
      return "Veículos: PREPARAR PARADA | Pedestres: AGUARDAR";
  }
}

// Cenários documentados
console.log(controlarSemaforo("verde", true, true));
console.log(controlarSemaforo("vermelho", false, true));
console.log(controlarSemaforo("amarelo", false, false)); // Falha no sensor

//Questão 11 — Soma de consumo

const consumoSemanal: number[] = [120, 150, 110, 200, 180, 90, 160];

// Passo 1: Calcular o total
let totalConsumo = 0;
for (let i = 0; i < consumoSemanal.length; i++) {
  totalConsumo += consumoSemanal[i];
}

// Passo 2: Calcular a média
const mediaConsumo = totalConsumo / consumoSemanal.length;

// Passo 3: Contar os dias acima da média
let diasAcimaMedia = 0;
for (const consumo of consumoSemanal) {
  if (consumo > mediaConsumo) {
    diasAcimaMedia++;
  }
}

console.log(`Total: ${totalConsumo} kWh`);
console.log(`Média: ${mediaConsumo.toFixed(2)} kWh`);
console.log(`Dias acima da média: ${diasAcimaMedia}`);

//Questão 12 — Contagem regressiva

// For decrescente para contagem do experimento
for (let i = 10; i >= 0; i--) {
  console.log(`Contagem: ${i}`);
}
console.log("Experimento iniciado com sucesso!");

//Questão 13 — Tabuada parametrizada
function gerarTabuada(num: number): void {
  if (!Number.isInteger(num) || num < 1 || num > 100) {
    console.log(`Erro: O número ${num} é inválido. Forneça um inteiro entre 1 e 100.`);
    return;
  }

  console.log(`--- Tabuada do ${num} ---`);
  for (let i = 1; i <= 10; i++) {
    console.log(`${num} x ${i} = ${num * i}`);
  }
}

// Testes: 1 válido e 2 inválidos
gerarTabuada(7);   // Válido
gerarTabuada(0);   // Inválido (fora da faixa)
gerarTabuada(5.5); // Inválido (não inteiro)

//Questão 14 — Tentativas de login

function simularLogin(tentativasSimuladas: string[]): void {
  const SENHA_CORRETA = "senhaSegura123";
  let indice = 0;
  let autenticado = false;

  while (indice < tentativasSimuladas.length && indice < 3) {
    const tentativa = tentativasSimuladas[indice];
    console.log(`Tentativa ${indice + 1}: ${tentativa}`);

    if (tentativa === SENHA_CORRETA) {
      autenticado = true;
      console.log("Acesso concedido!");
      break;
    }
    indice++;
  }

  if (!autenticado) {
    console.log("Acesso bloqueado: 3 tentativas incorretas atingidas.");
  }
}

console.log("--- Teste de Sucesso ---");
simularLogin(["1234", "senhaSegura123", "outra"]);

console.log("\n--- Teste de Bloqueio ---");
simularLogin(["errada1", "errada2", "errada3"]);

//Questão 15 — Menu obrigatório

function executarMenu(entradasSimuladas: number[]): void {
  let ponteiro = 0;
  let opcao: number;

  do {
    opcao = entradasSimuladas[ponteiro] || 3; // Fallback para sair
    console.log(`\nMenu Exibido. Opção digitada: ${opcao}`);
    
    switch (opcao) {
      case 1: console.log("Ação: Cadastrar dados."); break;
      case 2: console.log("Ação: Consultar dados."); break;
      case 3: console.log("Saindo do sistema..."); break;
      default: console.log("Opção inválida! Tente novamente."); break;
    }

    ponteiro++;
  } while (opcao !== 3 && ponteiro < entradasSimuladas.length);
}

// Execução com entradas contendo erro (99)
executarMenu([99, 1, 2, 3]);

//Questão 16 — Filtragem de sensores

const leiturasBrutas: number[] = [22, -5, 24, 999, 25];
const leiturasValidas: number[] = [];
let soma = 0;

for (const leitura of leiturasBrutas) {
  if (leitura === 999) {
    break; // Flag de encerramento do lote
  }
  if (leitura < 0) {
    continue; // Ignora leitura negativa de falha
  }
  
  leiturasValidas.push(leitura);
  soma += leitura;
}

const media = leiturasValidas.length > 0 ? soma / leiturasValidas.length : 0;

console.log("Leituras Processadas:", leiturasValidas);
console.log(`Média do Relatório: ${media.toFixed(2)}`);

//Questão 17 — Busca de matrícula

interface Estudante {
  matricula: number;
  nome: string;
}

const estudantes: Estudante[] = [
  { matricula: 101, nome: "Ana" },
  { matricula: 102, nome: "Bruno" },
  { matricula: 103, nome: "Carla" },
  { matricula: 104, nome: "Diego" }
];

function buscarMatricula(alvo: number): void {
  let encontrado = false;
  let iteracoes = 0;

  for (let i = 0; i < estudantes.length; i++) {
    iteracoes++;
    if (estudantes[i].matricula === alvo) {
      console.log(`Matrícula ${alvo} pertencente a ${estudantes[i].nome} encontrada em ${iteracoes} iteração(ões).`);
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    console.log(`Matrícula ${alvo} não foi localizada (Percorridas ${iteracoes} iterações).`);
  }
}

buscarMatricula(102); // Sucesso rápido
buscarMatricula(999); // Malsucedido

//Questão 18 — Controle de estoque

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
}

const estoque: Produto[] = [
  { id: 1, nome: "Teclado", quantidade: 0 },
  { id: 2, nome: "Mouse", quantidade: 3 },
  { id: 3, nome: "Monitor", quantidade: 10 },
  { id: 4, nome: "Cabo HDMI", quantidade: 0 },
  { id: 5, nome: "Headset", quantidade: 4 }
];

let zerados = 0;
let abaixoDeCinco = 0;
let regulares = 0;

for (const item of estoque) {
  if (item.quantidade === 0) {
    zerados++;
    console.log(`[ZERADO] ${item.nome}`);
  } else if (item.quantidade < 5) {
    abaixoDeCinco++;
    console.log(`[ALERTA LOW] ${item.nome} (${item.quantidade} un)`);
  } else {
    regulares++;
    console.log(`[REGULAR] ${item.nome} (${item.quantidade} un)`);
  }
}

console.log(`\nResumo: Zerados: ${zerados} | Abaixo de 5: ${abaixoDeCinco} | Regulares: ${regulares}`);

//Questão 19 — Números pares e ímpares

let contPares = 0;
let contImpares = 0;
let contMultiplos5 = 0;

for (let i = 1; i <= 50; i++) {
  if (i % 2 === 0) {
    contPares++;
  } else {
    contImpares++;
  }

  // Contagem independente
  if (i % 5 === 0) {
    contMultiplos5++;
  }
}

console.log(`Pares: ${contPares}`);
console.log(`Ímpares: ${contImpares}`);
console.log(`Múltiplos de 5: ${contMultiplos5}`);

//Questão 20 — Sequência de Fibonacci

function gerarFibonacci(n: number): void {
  if (n < 2 || n > 30) {
    console.log(`Erro: Solicitação de ${n} termos inválida. Informe um valor de 2 a 30.`);
    return;
  }

  let t1 = 0;
  let t2 = 1;
  const resultado: number[] = [t1, t2];

  for (let i = 3; i <= n; i++) {
    const proximo = t1 + t2;
    resultado.push(proximo);
    t1 = t2;
    t2 = proximo;
  }

  console.log(`Fibonacci (${n} termos): ${resultado.join(", ")}`);
}

gerarFibonacci(2);  // Borda inferior
gerarFibonacci(8);  // Intermediário
gerarFibonacci(35); // Valor inválido

//Questão 21 — Número primo

function ePrimo(n: number): boolean {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  // Limite da busca até a raiz quadrada do número
  const limite = Math.sqrt(n);
  for (let i = 3; i <= limite; i += 2) {
    if (n % i === 0) {
      return false; // Divisor encontrado, encerra precocemente
    }
  }
  return true;
}

const numerosTeste = [2, 17, 25, 29, 100];
numerosTeste.forEach(num => {
  console.log(`${num} é primo? ${ePrimo(num)}`);
});

//Questão 22 — Fatorial seguro

function calcularFatorial(n: number): string {
  // Validação preliminar das restrições
  if (!Number.isInteger(n) || n < 0 || n > 15) {
    return `Erro: Entrada [${n}] inválida. Forneça um inteiro entre 0 e 15.`;
  }

  // Tratamento do caso 0!
  if (n === 0) {
    return "0! = 1";
  }

  let resultado = 1;
  for (let i = 1; i <= n; i++) {
    resultado *= i;
  }

  return `${n}! = ${resultado}`;
}

// 4 Categorias de Teste
console.log(calcularFatorial(0));   // Caso 0!
console.log(calcularFatorial(5));   // Inteiro válido
console.log(calcularFatorial(-3));  // Negativo
console.log(calcularFatorial(4.5)); // Fracionário

//Questão 23 — Matriz de notas

const notasTurmas: number[][] = [
  [8.0, 7.5, 9.0, 6.5],
  [5.0, 6.0, 4.5, 7.0],
  [9.5, 8.5, 10.0, 9.0]
];

let maiorNotaGeral = -1;

for (let i = 0; i < notasTurmas.length; i++) {
  let somaTurma = 0;
  for (let j = 0; j < notasTurmas[i].length; j++) {
    const notaAtual = notasTurmas[i][j];
    somaTurma += notaAtual;

    if (notaAtual > maiorNotaGeral) {
      maiorNotaGeral = notaAtual;
    }
  }
  const mediaTurma = somaTurma / notasTurmas[i].length;
  console.log(`Média da Turma ${i + 1}: ${mediaTurma.toFixed(2)}`);
}

console.log(`Maior nota geral entre todas as turmas: ${maiorNotaGeral}`);

//Questão 24 — Mapa de assentos

const reservados: string[] = ["A1", "B3", "C5", "E6"];
const filas = ["A", "B", "C", "D", "E"];

console.log("--- MAPA DE ASSENTOS ---");
for (const fila of filas) {
  let linha = `${fila}: `;
  for (let assentoNum = 1; assentoNum <= 6; assentoNum++) {
    const codigo = `${fila}${assentoNum}`;
    const estaReservado = reservados.includes(codigo);
    linha += `[${codigo}: ${estaReservado ? "X" : "L"}] `;
  }
  console.log(linha);
}

//Questão 25 — Economia de energia

interface ConsumoComunidade {
  residenciaId: number;
  anterior: number;
  atual: number;
}

const dados12Residencias: ConsumoComunidade[] = [
  { residenciaId: 1, anterior: 200, atual: 170 }, // 15% redução (Meta OK)
  { residenciaId: 2, anterior: 150, atual: 140 }, // ~6.6% redução (Meta NÃO)
  { residenciaId: 3, anterior: 0, atual: 100 },   // Zero anterior (Incalculável)
  { residenciaId: 4, anterior: 300, atual: 250 }, // 16.6% (Meta OK)
  { residenciaId: 5, anterior: 180, atual: 180 }, // 0% (Meta NÃO)
  { residenciaId: 6, anterior: 220, atual: 190 }, // 13.6% (Meta OK)
  { residenciaId: 7, anterior: 100, atual: 90 },  // 10% (Meta OK)
  { residenciaId: 8, anterior: 250, atual: 240 },
  { residenciaId: 9, anterior: 400, atual: 300 }, // Meta OK
  { residenciaId: 10, anterior: 130, atual: 120 },
  { residenciaId: 11, anterior: 190, atual: 170 }, // Meta OK
  { residenciaId: 12, anterior: 210, atual: 200 }
];

let atingoMetaCount = 0;

for (const res of dados12Residencias) {
  if (res.anterior <= 0) {
    console.log(`Residência ${res.residenciaId}: Dados anteriores inválidos (Divisão por zero evitada).`);
    continue;
  }

  const reducaoPercentual = ((res.anterior - res.atual) / res.anterior) * 100;
  if (reducaoPercentual >= 10) {
    atingoMetaCount++;
    console.log(`Residência ${res.residenciaId}: Atingiu a meta! Redução de ${reducaoPercentual.toFixed(1)}%`);
  }
}

console.log(`\nTotal de residências que atingiram a meta: ${atingoMetaCount}`);

//Questão 26 — Caixa eletrônico

function decomporSaque(valor: number): void {
  console.log(`\nTentativa de saque: R$ ${valor}`);
  
  if (!Number.isInteger(valor) || valor <= 0) {
    console.log("Erro: O valor deve ser um número inteiro estritamente positivo.");
    return;
  }

  const cedulas = [100, 50, 20, 10, 5, 2];
  let restante = valor;
  const resultado: { [key: number]: number } = {};

  for (const cedula of cedulas) {
    const qtd = Math.floor(restante / cedula);
    if (qtd > 0) {
      resultado[cedula] = qtd;
      restante %= cedula;
    }
  }

  // Se sobrou algum valor que não pode ser fornecido por notas de 2, 5, 10, 20, 50, 100 (ex: R$ 1 ou R$ 3)
  if (restante !== 0) {
    console.log(`Erro: Valor de R$ ${valor} não pode ser sacado com as cédulas disponíveis.`);
  } else {
    console.log("Cédulas entregues:", resultado);
  }
}

// 3 Valores de teste
decomporSaque(380); // Válido
decomporSaque(1);   // Impossível
decomporSaque(-50); // Inválido

//Questão 27 — Pesquisa de satisfação

function gerarRelatorioPesquisa(respostas: number[]): void {
  const frequencias: number[] = new Array(11).fill(0); // Posições 0 a 10
  let respostasValidasCount = 0;
  let invalidasCount = 0;
  let somaNotas = 0;

  for (const nota of respostas) {
    if (Number.isInteger(nota) && nota >= 0 && nota <= 10) {
      frequencias[nota]++;
      somaNotas += nota;
      respostasValidasCount++;
    } else {
      invalidasCount++;
    }
  }

  console.log("--- RELATÓRIO DA PESQUISA DE SATISFAÇÃO ---");
  console.log(`Respostas inválidas descartadas: ${invalidasCount}`);
  
  if (respostasValidasCount === 0) {
    console.log("Nenhuma resposta válida recebida para cálculo de média.");
    return;
  }

  const mediaValida = somaNotas / respostasValidasCount;
  console.log(`Média de Satisfação: ${mediaValida.toFixed(2)}`);
  console.log("Distribuição por Nota:");
  frequencias.forEach((qtd, nota) => console.log(`Nota ${nota}: ${qtd} voto(s)`));
}

gerarRelatorioPesquisa([10, 8, 8, -1, 15, 0, 7, 9, 8]);

//Questão 28 — Detecção de sequência

function buscarTresConsecutivosIguais( codigos: number[] ): void {
  let localizado = false;

  // Percorre até a antepenúltima posição para evitar estouro de índice
  for (let i = 0; i < codigos.length - 2; i++) {
    if (codigos[i] === codigos[i + 1] && codigos[i] === codigos[i + 2]) {
      console.log(`Padrão detectado! Valor repetido: ${codigos[i]} iniciando no índice ${i}.`);
      localizado = true;
      break; // Interrompe imediatamente ao encontrar
    }
  }

  if (!localizado) {
    console.log("Nenhum padrão de três valores consecutivos iguais foi localizado.");
  }
}

// Teste de Presença e Ausência
buscarTresConsecutivosIguais([10, 20, 5, 5, 5, 30]); // Presença
buscarTresConsecutivosIguais([10, 20, 5, 5, 8, 5]);  // Ausência

//Questão 29 — Simulação de pagamento

function simularPagamentoDivida(dividaInicial: number, pagamentoMensal: number): void {
  let saldo = dividaInicial;
  let mes = 0;
  const taxaJuros = 0.01;

  console.log(`Início da simulação: Dívida R$${dividaInicial.toFixed(2)} | Pagamento: R$${pagamentoMensal.toFixed(2)}`);

  while (saldo > 0 && mes < 120) {
    mes++;
    const juros = saldo * taxaJuros;
    
    if (pagamentoMensal <= juros) {
      console.log(`Erro no mês ${mes}: Pagamento mensal (R$${pagamentoMensal}) é inferior aos juros (R$${juros.toFixed(2)}). A dívida crescerá indefinidamente.`);
      return;
    }

    saldo = saldo + juros - pagamentoMensal;
    if (saldo < 0) saldo = 0;

    // Exibe marco a cada 12 meses ou quitação
    if (mes % 12 === 0 || saldo === 0) {
      console.log(`Mês ${mes}: Saldo restante R$ ${saldo.toFixed(2)}`);
    }
  }

  if (saldo === 0) {
    console.log(`Dívida totalmente quitada em ${mes} meses.`);
  } else {
    console.log("Simulação interrompida ao atingir o limite de 120 meses.");
  }
}

simularPagamentoDivida(1000, 150);

//Questão 30 — Projeto integrador

type Turno = "matutino" | "vespertino" | "noturno";

interface RegistroSala {
  sala: string;
  turno: Turno;
  leiturasDiarias: number[]; // Consumo diário dos 7 dias
}

interface RelatorioSala {
  sala: string;
  total: number;
  media: number;
  classificacao: string;
}

function validarEProcessarSala(registro: RegistroSala): RelatorioSala | null {
  // Validação preliminar das leituras
  for (const leitura of registro.leiturasDiarias) {
    if (leitura < 0) {
      console.log(`Erro na sala ${registro.sala}: Leitura negativa detectada (${leitura}).`);
      return null;
    }
  }

  let total = 0;
  for (const leitura of registro.leiturasDiarias) {
    total += leitura;
  }
  const media = total / registro.leiturasDiarias.length;

  let classificacao = "";
  if (total <= 300) {
    classificacao = "Baixo Consumo";
  } else if (total <= 600) {
    classificacao = "Consumo Moderado";
  } else {
    classificacao = "Alto Consumo";
  }

  return { sala: registro.sala, total, media, classificacao };
}

// Dados simulados
const dadosSalas: RegistroSala[] = [
  { sala: "Sala 101", turno: "matutino", leiturasDiarias: [40, 42, 38, 45, 50, 10, 15] },
  { sala: "Sala 102", turno: "vespertino", leiturasDiarias: [80, 90, 85, 95, 100, 20, 30] },
  { sala: "Sala 103", turno: "noturno", leiturasDiarias: [100, -10, 90, 80, 70, 40, 30] } // Falha no dado
];

const relatorios: RelatorioSala[] = [];
let salaMaiorConsumo: RelatorioSala | null = null;

for (const reg of dadosSalas) {
  const relatorio = validarEProcessarSala(reg);
  if (relatorio) {
    relatorios.push(relatorio);
    if (!salaMaiorConsumo || relatorio.total > salaMaiorConsumo.total) {
      salaMaiorConsumo = relatorio;
    }
  }
}

console.log("=== RELATÓRIO FINAL DE CONSUMO POR SALA ===");
relatorios.forEach(r => {
  console.log(`${r.sala} -> Total: ${r.total} kWh | Média: ${r.media.toFixed(2)} kWh/dia | Classificação: ${r.classificacao}`);
});

if (salaMaiorConsumo) {
  console.log(`\nA sala com maior consumo geral foi a ${salaMaiorConsumo.sala} com ${salaMaiorConsumo.total} kWh.`);
}

