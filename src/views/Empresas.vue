<template>
  <main>
    <div>
      <h3>Consultar Estabelecimentos disponíveis no banco:</h3>
      <div>
        <button @click="mostrarEmpresas">Mostrar Empresas</button>
        <div v-if="loading" class="dots" style="position: relative;">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p v-if="erro" class="erro">{{ erro }}</p>
        <div v-if="empresas.length" class="empresas">
          <h3>Estabelecimentos encontrados: {{ empresas.length }}</h3>
          
          <div
            v-for="empresa in empresasVisiveis"
            :key="empresa.cnpj"
            style="text-align: left; margin-left: 5%;"

          >
            <p><b>Razão Social:</b> {{ empresa.nome }}</p>
            <p>
              <b>CNPJ:</b>
              <span @click="mostrarDetalhes(empresa.cnpj)" style="cursor: pointer;">
                {{ empresa.cnpj }}
              </span>
            </p>
          </div>

          <!-- Paginação -->
          <div style="margin-top: 10px;" class="paginacao">
            <button @click="paginaAnterior" :disabled="pagina === 1">Anterior</button>
            <p>Página {{ pagina }} de {{ Math.ceil(empresas.length / itensPorPagina) }}</p>
            <button @click="proximaPagina" :disabled="pagina * itensPorPagina >= empresas.length">Próxima</button>
          </div>
        </div>
        <SearchComponent v-if="selectedEmpresa" :company="selectedEmpresa" @close="fecharModal" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { consultarCNPJ } from '../utils/api';
import SearchComponent from '../components/SearchComponent.vue';
import empresasJson from '../estab.json';

const empresas = ref([]);
const selectedEmpresa = ref(null);
const erro = ref('');
const loading = ref(false);

const pagina = ref(1);          // página atual
const itensPorPagina = 10;      // quantos itens mostrar por página

// Computed para pegar apenas os itens da página atual
const empresasVisiveis = computed(() => {
  const inicio = (pagina.value - 1) * itensPorPagina;
  const fim = pagina.value * itensPorPagina;
  return empresas.value.slice(inicio, fim);
});

function mostrarEmpresas() {
  empresas.value = empresasJson;
}

async function mostrarDetalhes(cnpj) {
  selectedEmpresa.value = null;
  const result = await consultarCNPJ(
    cnpj,
    (value) => (loading.value = value),
    (value) => (erro.value = value),
    () => {}
  );
  if (result) {
    selectedEmpresa.value = result;
  }
}

function fecharModal() {
  selectedEmpresa.value = null;
  erro.value = '';
}

function proximaPagina() {
  if (pagina.value * itensPorPagina < empresas.value.length) {
    pagina.value++;
  }
}

function paginaAnterior() {
  if (pagina.value > 1) {
    pagina.value--;
  }
}
</script>


<style scoped>
pre {
  text-align: left;
}

span {
  margin: 0 15px;
}

.empresas {
  border: 1px solid var(--baseHover);
  padding: 8px;
  margin-top: 8px;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 5px;
}

.paginacao {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;  
}

.erro {
  color: #d32f2f;
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
  text-align: center;
}

@media (min-width: 400px) {

}


</style>