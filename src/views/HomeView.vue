<template>
  <main>
      <div class="consulta">
        <div class="first-sect">
          <h2>Consulta CNPJ</h2>
          <div class="input-container">
            <input
              v-model="cnpj"
              placeholder="Digite o CNPJ (ex.: 12.345.678/0001-00)"
              type="text"
              inputmode="numeric"
              @input="formatCNPJ"
              maxlength="18"
              :style="{
                borderColor: isValidCNPJ === true ? '#4caf50' : isValidCNPJ === false ? '#d32f2f' : '#ccc'
              }"
            />
            <button @click="consultar">Consultar</button>
          </div>
          <p v-if="loading">Consultando</p>
          <p v-if="erro" class="erro">{{ erro }}</p>
        </div>
        <SearchComponent v-if="resultado" :company="resultado" @close="closeModal" />
      </div>

  </main>
</template>

<script>
import axios from 'axios';
import { validarCNPJ } from '../utils/script';
import SearchComponent from '../components/SearchComponent.vue';

export default {
  name: 'ConsultaCNPJ',
  components: { SearchComponent },
  data() {
    return {
      cnpj: '',
      resultado: null,
      erro: '',
      isValidCNPJ: null,
      loading: false
    };
  },
  methods: {
    async consultar() {
      this.resultado = null;
      this.erro = '';
      try {
        const cleanedCNPJ = this.cnpj.replace(/[^\d]/g, '');
        const valid = validarCNPJ(cleanedCNPJ);
        if (!valid.valido) {
          this.erro = valid.reason;
          this.isValidCNPJ = false;
          return;
        }
        this.isValidCNPJ = true;
        this.loading = true;

        const response = await axios.get(`https://api-consulta-cnpj-c6ve.onrender.com/consulta/${cleanedCNPJ}`);
        this.resultado = response.data;
        if (this.resultado) this.loading = false;
      } catch (error) {
        this.erro = error.response?.data?.message || 'Erro ao consultar o CNPJ';
        this.isValidCNPJ = false;
        this.loading = false;
      }
    },
    formatCNPJ() {
      // Remove tudo que não for número
      let digits = this.cnpj.replace(/\D/g, '');

      // Aplica a máscara de CNPJ (00.000.000/0000-00)
      if (digits.length > 2) digits = digits.replace(/^(\d{2})(\d)/, '$1.$2');
      if (digits.length > 5) digits = digits.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      if (digits.length > 8) digits = digits.replace(/\.(\d{3})(\d)/, '.$1/$2');
      if (digits.length > 12) digits = digits.replace(/(\d{4})(\d)/, '$1-$2');

      this.cnpj = digits;

      // Valida o CNPJ em tempo real
      if (digits.length == 14) {
        const valid = validarCNPJ(digits);
        this.isValidCNPJ = valid.valido;
        this.erro = valid.valido ? '' : valid.reason;
      } else {
        this.isValidCNPJ = null;
        this.erro = '';
      }
    },
    closeModal() {
      this.resultado = null;
      this.isValidCNPJ = null;
      this.erro = '';
    },
  },
};
</script>

<style scoped>
.consulta {
  margin: 40px 0;
}

.first-sect {
  text-align: center;
  align-content: center;
  padding: 20px;
  background: var(--greyWhite);
  box-shadow: 0 0 5px var(--baseHover);
  border-radius: 8px;
}

h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-width: 35%;
  box-shadow: 0 0 2px var(--button);  
}

input:focus {
  border-color: var(--baseBlue);
  outline: none;
}

.erro {
  color: #d32f2f;
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .input-container {
    flex-direction: column;
  }

  button {
    margin: 0;
  }

  input {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 24px;
  }
}
</style>