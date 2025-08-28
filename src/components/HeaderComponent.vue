<template>
    <header>
        <router-link to="/">
            <img src="/images/logo-banner.png" alt="" height="60px">
        </router-link>
        <nav>
            <ul>
                <li>
                    <router-link to="/">Início</router-link>
                </li>
                <li>
                    <router-link to="/Empresas">Empresas</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: var(--baseHover);
    box-shadow: 2px 2px 2px var(--baseBlue);
    & nav ul {
        display: flex;
        gap: 15px;
        & a {
            color: var(--black);
        }

    }    
}
</style>