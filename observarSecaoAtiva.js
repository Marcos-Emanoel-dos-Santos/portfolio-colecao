const opcoes = {
    root: null,
    threshold: 0.6
};

const observarSecoes = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('ativo');
        } 
        else {
            entrada.target.classList.remove('ativo');
        }
    });
}, opcoes);

const projetos = document.querySelectorAll('#destaques .sessao-tela');

projetos.forEach((projeto) => {
    observarSecoes.observe(projeto);
});