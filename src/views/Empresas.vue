<template>
  <main>
    <div>
      <h3>Consultar Estabelecimentos disponíveis no banco:</h3>
      <div>
        <button @click="mostrarEmpresas">Mostrar Empresas</button>

        <div v-if="empresas.length">
          <h3>Estabelecimentos encontrados: {{ empresas.length }}</h3>
          <div
            v-for="empresa in empresas"
            :key="empresa.cnpj"
            style="text-align: left; margin-left: 5%;"
          >
            <p><b>Razão Social:</b> {{ empresa.nome }}</p>
            <p><b>CNPJ:</b> {{ empresa.cnpj }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue"
import empresasJson from "../estab.json"

const empresas = ref([])

function mostrarEmpresas() {
  empresas.value = empresasJson
}
</script>

<style scoped>
pre {
  text-align: left;
}
</style>
