<template>
    <header>
        <router-link to="/">
            <img src="/images/logo-white.svg" alt="" height="60px">
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
    background-color: var(--baseBlue);
    box-shadow: 0 1px 3px var(--baseHover);
    & nav ul {
        display: flex;
        gap: 15px;
        & a {
            color: var(--white);
        }

    }    
}
</style>