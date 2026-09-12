const carrosseis = document.querySelectorAll('.carrossel');

carrosseis.forEach(carrossel => {
    const itensOriginais = Array.from(carrossel.children);
    itensOriginais.forEach(item => {
        const clone = item.cloneNode(true);
        carrossel.appendChild(clone);
    });

    let tamanhoDeUmCiclo = 0;

    setTimeout(() => {
        const primeiroOriginal = carrossel.children[0];
        const primeiroClone = carrossel.children[itensOriginais.length];
        tamanhoDeUmCiclo = primeiroClone.offsetLeft - primeiroOriginal.offsetLeft;
    }, 100);

    carrossel.addEventListener('scroll', () => {
        if (!tamanhoDeUmCiclo) return;

        if (carrossel.scrollLeft >= tamanhoDeUmCiclo) {
            carrossel.style.scrollBehavior = 'auto';
            carrossel.scrollLeft -= tamanhoDeUmCiclo;
        } 
        else if (carrossel.scrollLeft <= 0) {
            carrossel.style.scrollBehavior = 'auto'; 
            carrossel.scrollLeft += tamanhoDeUmCiclo - 10; 
        }
    });

    let intervaloAutoScroll;
    const iniciarAutoScroll = () => {
        intervaloAutoScroll = setInterval(() => {
            const card = carrossel.querySelector('.item');
            // Calcula o tamanho do pulo (Largura do Card + o Gap de 32px)
            const gap = parseFloat(window.getComputedStyle(carrossel).gap) || 32;
            const avancar = card.offsetWidth + gap;

            carrossel.style.scrollBehavior = 'smooth';
            carrossel.scrollBy({ left: avancar, behavior: 'smooth' });
        }, 3500); 
    };

    const pararAutoScroll = () => clearInterval(intervaloAutoScroll);

    // INICIA (Para quando passar o mouse/dedo)
    iniciarAutoScroll();

    carrossel.addEventListener('mouseenter', pararAutoScroll);
    carrossel.addEventListener('mouseleave', iniciarAutoScroll);
    
    carrossel.addEventListener('touchstart', pararAutoScroll);
    carrossel.addEventListener('touchend', () => {
        setTimeout(iniciarAutoScroll, 1000);
    });
});