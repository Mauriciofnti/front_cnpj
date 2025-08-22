<template>
    <main>
        <div class="">
            <h3 class="">Consultar empresas disponiveis no banco:</h3>

            <!-- Botão para buscar -->
            <button @click="buscarDados" class="">Buscar</button>

            <!-- Loading -->
            <p v-if="loading" class="">Carregando...</p>

            <!-- Erro -->
            <p v-if="erro" class="">{{ erro }}</p>

            <!-- JSON formatado -->
            <pre v-for="empresa in dados" :key="empresa_cnpj">
                <p> Empresa: {{ empresa.razao_social }}
                    <span>cnpj: {{ empresa.cnpj_basico }}</span>
                </p>
            </pre>
            <!-- <pre v-if="dados" class="">{{ dados }}</pre> -->
        </div>        
    </main>
</template>

<script setup>
import { ref } from "vue"

const dados = ref(null)
const loading = ref(false)
const erro = ref(null)

async function buscarDados() {
  try {
    loading.value = true
    erro.value = null

    // Exemplo: poderia ser sua API local em Node
    const resp = await fetch("https://api-consulta-cnpj-c6ve.onrender.com/consulta/")
    if (!resp.ok) throw new Error("Erro na requisição")

    dados.value = await resp.json()
  } catch (e) {
    erro.value = e.message
  } finally {
    loading.value = false
  }
}
</script>
<style scoped>
pre {
    text-align: left;
}
</style>
