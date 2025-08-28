<template>
    <footer>
        <h5>Desenvolvido por: 
            <a href="https://github.com/Mauriciofnti"
            target="_blank">
                Maurício Fantinelli
                <img src="/images/github-mark.svg" alt="Github Link" height="20px">
            </a>
        </h5>
        <p>&copy; Alguns direitos reservados.</p>
    </footer>
</template>

<style scoped>
footer {
    text-align: center;
    display: flex;
    gap: 20px;
    padding: 20px 0px 10px;
    flex-direction: column;
    background-color: var(--baseHover);
    & a, p, h5 {
        color: var(--black);
    }
}
</style>