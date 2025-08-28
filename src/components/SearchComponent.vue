<template>
  <div class="modal-overlay">
    <div class="result-container">
      <div class="header-actions">
        <h3>{{ company.nome_fantasia + ' - ' + company.razao_social || 'Não informado' }}</h3>
        <div>
          <button @click="closeModal">Fechar</button>
          <button @click="gerarPDF">Gerar PDF</button>
        </div>
      </div>
      
      <div class="tables-container">
        <!-- Informações Básicas -->
        <table class="info-table">
          <thead>
            <tr>
              <th colspan="4">Informações Básicas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">CNPJ</td>
              <td>{{ formatCNPJ(company.cnpj) }}</td>
              <td class="label">Situação</td>
              <td>{{ company.situacao || 'Não informado' }}</td>
            </tr>
            <tr>
              <td class="label">Razão Social</td>
              <td>{{ company.razao_social || 'Não informado' }}</td>
              <td class="label">Motivo</td>
              <td>{{ company.motivo || 'N/A' }}</td>
            </tr>
            <tr>
              <td class="label">Nome Fantasia</td>
              <td>{{ company.nome_fantasia || 'Não informado' }}</td>
              <td class="label">Porte da Empresa</td>
              <td>{{ company.porte_empresa || 'Não informado' }}</td>
            </tr>
            <tr>
              <td class="label">Capital Social</td>
              <td>R$ {{ formatCurrency(company.capital_social) }}</td>
              <td class="label">Natureza Jurídica</td>
              <td>{{ company.natureza_juridica || 'Não informado' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Contato -->
        <table class="info-table">
          <thead>
            <tr>
              <th colspan="4">Contato</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">Endereço</td>
              <td>{{ company.logradouro }}, {{ company.numero }} {{ company.complemento ? `, ${company.complemento}` : '' }}</td>
              <td class="label">Bairro</td>
              <td>{{ company.bairro || 'Não informado' }}</td>
            </tr>
            <tr>
              <td class="label">Município/UF</td>
              <td>{{ company.municipio }}/{{ company.uf }}</td>
              <td class="label">CEP</td>
              <td>{{ formatCEP(company.cep) }}</td>
            </tr>
            <tr>
              <td class="label">Telefone 1</td>
              <td>{{ company.telefone_1 || 'N/A' }}</td>
              <td class="label">Telefone 2</td>
              <td>{{ company.telefone_2 || 'N/A' }}</td>
            </tr>
            <tr>
              <td class="label">Fax</td>
              <td>{{ company.fax || 'N/A' }}</td>
              <td class="label">Email</td>
              <td>{{ company.email ? company.email.toLowerCase() : 'Não informado' }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Informações Tributárias -->
        <table class="info-table">
          <thead>
            <tr>
              <th colspan="4">Informações Tributárias</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">Opção pelo Simples</td>
              <td>{{ company.opcao_pelo_simples || 'Não informado' }}</td>
              <td class="label">Data Opção Simples</td>
              <td>{{ formatDate(company.data_opcao_simples) }}</td>
            </tr>
            <tr>
              <td class="label">Data Exclusão Simples</td>
              <td>{{ formatDate(company.data_exclusao_simples) }}</td>
              <td class="label">MEI</td>
              <td>{{ company.mei || 'Não informado' }}</td>
            </tr>
            <tr>
              <td class="label">Data Opção MEI</td>
              <td>{{ formatDate(company.data_opcao_mei) }}</td>
              <td class="label">Data Exclusão MEI</td>
              <td>{{ formatDate(company.data_exclusao_mei) }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Atividades Econômicas -->
        <table class="info-table">
          <thead>
            <tr>
              <th colspan="2">Atividades Econômicas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">CNAE Principal</td>
              <td>{{ company.cnae_principal || 'Não informado' }}</td>
            </tr>
            <tr>
              <td class="label">CNAEs Secundários</td>
              <td>
                <ul>
                  <li v-for="(cnae, index) in company.cnaes_secundarios" :key="index">
                    {{ cnae.cnae_secundario || 'Não informado' }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Sócios -->
        <table class="info-table full-width socios">
          <thead>
            <tr>
              <th colspan="5">Sócios</th>
            </tr>
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Qualificação</th>
              <th>Data de Entrada</th>
              <th>Faixa Etária</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(socio, index) in company.socios" :key="index">
              <td>{{ socio.nome_socio_razao_social || 'Não informado' }}</td>
              <td>{{ formatCPF(socio.cnpj_cpf_socio) }}</td>
              <td>{{ socio.qualificacao_socio || 'Não informado' }}</td>
              <td>{{ formatDate(socio.data_entrada_sociedade) }}</td>
              <td>{{ socio.faixa_etaria || 'Não informado' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Biblioteca para requisições HTTP

export default {
  name: 'SearchComponent',
  props: {
    company: {
      type: Object,
      required: true // Propriedade obrigatória para os dados da empresa
    }
  },
  methods: {
    closeModal() {
      this.$emit('close'); // Emite o evento close explicitamente
    },
    // Método para formatar o CNPJ no padrão brasileiro
    formatCNPJ(cnpj) {
      if (!cnpj) return 'N/A';
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    },
    // Método para formatar o CPF ou CNPJ no padrão brasileiro
    formatCPF(cpf) {
      if (!cpf) return 'N/A';
      if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      return cpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    },
    // Método para formatar o CEP no padrão brasileiro
    formatCEP(cep) {
      if (!cep) return 'N/A';
      return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    },
    // Método para formatar o valor monetário no padrão brasileiro
    formatCurrency(value) {
      if (!value) return 'N/A';
      return parseFloat(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    },
    // Método para formatar a data no padrão DD/MM/YYYY
    formatDate(date) {
      if (!date) return 'N/A';
      return date; // Data já vem formatada do backend (DD/MM/YYYY)
    },
    // Método para gerar e baixar o PDF chamando a API do backend
    async gerarPDF() {
      try {
        const cleanedCNPJ = this.company.cnpj.replace(/[^\d]/g, '');
        const response = await axios.get(`https://api-consulta-cnpj-c6ve.onrender.com/gerar-pdf/${cleanedCNPJ}`, {
          responseType: 'blob' // Recebe o PDF como binário para download
        });
        
        // Cria um URL temporário para o blob do PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `empresa_${cleanedCNPJ}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Erro ao gerar o PDF:', error);
        alert('Erro ao gerar o PDF. Verifique se o CNPJ é válido ou se o servidor está ativo.');
      }
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fundo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  user-select: none;
  color: #000;
}

.result-container {
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  background: var(--greyWhite);
  border: 2px solid var(--baseBlue);
  padding: 20px;
  box-shadow: 0 0 20px var(--baseBlue);
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  & div button {
    margin: 5px;
  }
}

h3 {
  font-weight: 600;
  color: var(--grey);
}

.header-actions button {
  margin-left: 10px;
  border-radius: 5px;
}

.tables-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.info-table {
  width: 100%;
  min-width: 280px;
  border-collapse: collapse;
  box-shadow: 0 0 3px 1px var(--baseHover);
}

.info-table th {
  background: var(--baseBlue);
  color: white;
  font-size: 17px;
  font-weight: 600;
  padding: 10px;
  text-align: center;
}

.info-table td {
  padding: 10px;
  font-size: 15px;
  border-bottom: 1px solid #000;
  width: max-content;
}

.info-table .label {
  font-weight: 600;
}

.info-table tr:hover {
  background: var(--white);
}

.info-table ul {
  list-style: disc;
  padding-left: 15px;
  margin: 0;
}

.full-width {
  width: 100%;
}

.full-width th,
.full-width td {
  min-width: 90px;
}

@media (max-width: 768px) {
  .tables-container {
    flex-direction: column;
    align-items: center;
  }

  .info-table {
    width: 100%;
    min-width: 0;
  }

  .info-table th,
  .info-table td {
    font-size: 14px;
    padding: 8px;
  }

  .info-table td, .info-table tr th {
    display: flex;
    width: 100%;  
  }

  .header-actions {
    flex-direction: column;
  }

  .header-actions div {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  h3 {
    font-size: 20px;
  }

  .info-table th,
  .info-table td {
    font-size: 13px;
    padding: 6px;
  }

  .result-container {
    max-width: 95%;
  }
}
</style>