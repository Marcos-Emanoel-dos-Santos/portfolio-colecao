const carrosseis = document.querySelectorAll('.carrossel');

carrosseis.forEach(carrossel => {
    const itensOriginais = Array.from(carrossel.children);
    itensOriginais.forEach(item => {
        const clone = item.cloneNode(true);
        carrossel.appendChild(clone);
    });

    const getTamanhoCiclo = () => {
        const primeiroOriginal = carrossel.children[0];
        const primeiroClone = carrossel.children[itensOriginais.length];
        return primeiroClone.offsetLeft - primeiroOriginal.offsetLeft;
    };

    carrossel.addEventListener('scroll', () => {
        const tamanhoDeUmCiclo = getTamanhoCiclo();
        if (!tamanhoDeUmCiclo) return;

        const scrollAtual = Math.ceil(carrossel.scrollLeft);

        if (scrollAtual >= tamanhoDeUmCiclo) {
            carrossel.style.scrollBehavior = 'auto';
            carrossel.scrollLeft -= tamanhoDeUmCiclo;
        } 
        else if (carrossel.scrollLeft <= 0) {
            carrossel.style.scrollBehavior = 'auto'; 
            carrossel.scrollLeft += tamanhoDeUmCiclo;
        }
    });

    let intervaloAutoScroll;
    const iniciarAutoScroll = () => {
        clearInterval(intervaloAutoScroll); 
        
        intervaloAutoScroll = setInterval(() => {
            const card = carrossel.querySelector('.item');
            const gap = parseFloat(window.getComputedStyle(carrossel).gap) || 32;
            const avancar = card.offsetWidth + gap;

            carrossel.style.scrollBehavior = 'smooth';
            carrossel.scrollBy({ left: avancar, behavior: 'smooth' });
        }, 3500); 
    };

    const pararAutoScroll = () => clearInterval(intervaloAutoScroll);

    // INICIA
    iniciarAutoScroll();

    carrossel.addEventListener('mouseenter', pararAutoScroll);
    carrossel.addEventListener('mouseleave', iniciarAutoScroll);
    
    carrossel.addEventListener('touchstart', pararAutoScroll, { passive: true });
    carrossel.addEventListener('touchend', () => {
        setTimeout(iniciarAutoScroll, 2500);
    });
});