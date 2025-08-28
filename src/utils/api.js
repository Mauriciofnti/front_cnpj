import axios from 'axios';
import { validarCNPJ } from './formaterValidator';

export async function consultarCNPJ(cnpj, setLoading, setErro, setIsValidCNPJ) {
  setErro('');
  setIsValidCNPJ(null);
  try {
    const cleanedCNPJ = cnpj.replace(/[^\d]/g, '');
    const valid = validarCNPJ(cleanedCNPJ);
    if (!valid.valido) {
      setErro(valid.reason);
      setIsValidCNPJ(false);
      return null;
    }
    setIsValidCNPJ(true);
    setLoading(true);

    const response = await axios.get(`https://api-consulta-cnpj-c6ve.onrender.com/consulta/${cleanedCNPJ}`);
    setLoading(false);
    return response.data;
  } catch (error) {
    setErro(error.response?.data?.message || 'Erro ao consultar o CNPJ');
    setIsValidCNPJ(false);
    setLoading(false);
    return null;
  }
}