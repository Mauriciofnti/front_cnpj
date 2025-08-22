// Verifica se um CNPJ é válido.
export function validarCNPJ(cnpj) {
  if (typeof cnpj !== 'string' || cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
    return { valido: false, reason: 'CNPJ deve ter 14 dígitos numéricos' };
  }

  const digitos = cnpj.split('').map(Number);
  
  // Verifica se todos os dígitos são iguais (ex.: 00000000000000)
  if (digitos.every(d => d === digitos[0])) {
    return { valido: false, reason: 'CNPJ inválido (dígitos repetidos)' };
  }

  // Calcula o primeiro dígito verificador
  const peso1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = 0;
  for (let i = 0; i < 12; i++) {
    soma += digitos[i] * peso1[i];
  }
  const resto1 = soma % 11;
  const digitoVerificador1 = resto1 < 2 ? 0 : 11 - resto1;

  if (digitos[12] !== digitoVerificador1) {
    return { valido: false, reason: 'O primeiro dígito verificador está incorreto' };
  }

  // Calcula o segundo dígito verificador
  const peso2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  soma = 0;
  for (let j = 0; j < 13; j++) {
    soma += digitos[j] * peso2[j];
  }
  const resto2 = soma % 11;
  const digitoVerificador2 = resto2 < 2 ? 0 : 11 - resto2;

  if (digitos[13] !== digitoVerificador2) {
    return { valido: false, reason: 'O segundo dígito verificador está incorreto' };
  }

  return { valido: true, reason: 'CNPJ válido' };
}