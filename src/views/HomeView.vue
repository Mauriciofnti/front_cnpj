<template>
  <main>
    <section>
      <div class="consulta">
        <div class="first-sect">
          <h2>Consultar CNPJ</h2>
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
            <p v-if="erro" class="erro">{{ erro }}</p>
            <div v-if="loading" class="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <SearchComponent v-if="resultado" :company="resultado" @close="closeModal" />    
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { consultarCNPJ } from '../utils/api';
import { validarCNPJ } from '../utils/formaterValidator';
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
      const result = await consultarCNPJ(
        this.cnpj,
        (value) => (this.loading = value),
        (value) => (this.erro = value),
        (value) => (this.isValidCNPJ = value)
      );
      if (result) {
        this.resultado = result;
      }
    },
    formatCNPJ() {
      let digits = this.cnpj.replace(/\D/g, '');
      if (digits.length > 2) digits = digits.replace(/^(\d{2})(\d)/, '$1.$2');
      if (digits.length > 5) digits = digits.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      if (digits.length > 8) digits = digits.replace(/\.(\d{3})(\d)/, '.$1/$2');
      if (digits.length > 12) digits = digits.replace(/(\d{4})(\d)/, '$1-$2');
      this.cnpj = digits;
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
  display: flex;
  justify-content: center;
}

.first-sect {
  text-align: center;
  align-content: center;
  padding: 20px;
  border: 1px double var(--baseHover);
  border-radius: 8px;
  width: 600px;
  background: var(--baseBlue);
}

h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.input-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-width: 35%;
  transition: all .1s ease;
  color: var(--black);
}

input:focus, input:active {
  box-shadow: 0 0 4px 4px var(--baseHover);
  outline: none;
}

.erro {
  color: #d32f2f;
  font-size: 16px;
  font-weight: 600;
  position: absolute;
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