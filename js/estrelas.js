let mouseX = -1000;
let mouseY = -1000;
window.addEventListener('mousemove', (evento) => {
    mouseX = evento.clientX;
    mouseY = evento.clientY;
});


const canvas = document.getElementById('fundo-estrelas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;


// Vê se o usuário redimensionou a tela
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const NUM = 60; // Quantidade de estrelas
const RADIUS = 3.5; // Tamanho da estrela
const balls = [];


const colors = ['#00d285', '#e2f13c', '#00e5ff', '#ff2e93', '#a855f7'];

function createBall(fromEdge) {
    const speed = 0.1 + Math.random() * 0.2; // Velocidade
    const angle = Math.random() * Math.PI * 2;
    let x, y;
    
    if (fromEdge) {
        const side = Math.floor(Math.random() * 4);
        if (side === 0)      { x = Math.random() * width; y = -RADIUS; }
        else if (side === 1) { x = width + RADIUS; y = Math.random() * height; }
        else if (side === 2) { x = Math.random() * width; y = height + RADIUS; }
        else                 { x = -RADIUS; y = Math.random() * height; }
    } else {
        x = Math.random() * width;
        y = Math.random() * height;
    }
    
    return {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        baseOpacity: Math.random() * 0.5 + 0.2, // Opacidade base
        color: colors[Math.floor(Math.random() * colors.length)], // Pega uma cor aleatória
        pulse: Math.random() * Math.PI * 2 // Usado para fazer a estrela piscar
    };
}

const sparks = [];

// Função que cria a supernova
function createSupernova(x, y, color) {
    const numSparks = 22; // Quantidade de faíscas por explosão
    for (let i = 0; i < numSparks; i++) {
        const angle = Math.random() * Math.PI * 2; // Direção
        const force = Math.random() * 4 + 2; // Força do disparo

        sparks.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * force,
            vy: Math.sin(angle) * force,
            alpha: 1, // Começa 100% visível
            color: color, // Herda a cor da estrela que explodiu
            size: Math.random() * 2 + 0.5 // Tamanhos variados para dar realismo
        });
    }
}

// Cria um numero inicial de estrelas
for (let i = 0; i < NUM; i++) {
    balls.push(createBall(false));
}

function isOffscreen(b) {
    return b.x < -RADIUS || b.x > width + RADIUS || b.y < -RADIUS || b.y > height + RADIUS;
}


// A função que roda a cada frame
function animate() {
    // Limpa a tela transparente
    ctx.clearRect(0, 0, width, height);

    for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];

        // Move a estrela
        b.x += b.vx;
        b.y += b.vy;
        b.pulse += 0.02;

        // Se sair da tela, recria na borda oposta
        if (isOffscreen(b)) { 
            balls[i] = createBall(true); 
            continue; 
        }

        // INTERAÇÃO COM MOUSE
        const dx = mouseX - b.x;
        const dy = mouseY - b.y;
        const distanciaQuadrada = (dx * dx) + (dy * dy);
        const limite = RADIUS + 10;

        if (distanciaQuadrada < limite * limite) {
            createSupernova(b.x, b.y, b.color);
            balls[i] = createBall(true);
            continue;
        }

        // Efeito de piscar
        const currentOpacity = b.baseOpacity + Math.sin(b.pulse) * 0.3;

        // Desenha a estrela
        ctx.save();

        ctx.globalCompositeOperation = 'lighter'; // Faz as cores se somarem
        ctx.globalAlpha = Math.max(0.1, currentOpacity); // Não deixa ficar 100% invisível

        ctx.shadowColor = b.color; // Configura sombra
        ctx.shadowBlur = 18; // Espalhamento da luz

        ctx.beginPath();
        ctx.arc(b.x, b.y, RADIUS, 0, Math.PI * 2);
        
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;

        ctx.fill();


        ctx.beginPath();
        ctx.arc(b.x, b.y, RADIUS - 1, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.restore();
    }


    for (let j = sparks.length - 1; j >= 0; j--) {
        const s = sparks[j];

        // Move a faísca
        s.x += s.vx;
        s.y += s.vy;
        
        // Atrito porque sim :)
        s.vx *= 0.95; 
        s.vy *= 0.95; 
        
        // fade da faísca
        s.alpha -= 0.04; 

        // Se apagou totalmente
        if (s.alpha <= 0) {
            sparks.splice(j, 1);
            continue;
        }

        // Desenha a faísca brilhante
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = Math.max(0, s.alpha); // Evita valores negativos
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 10;
        
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        ctx.restore();
    }
    
    // Chama o próximo frame
    requestAnimationFrame(animate);
}

// Inicia a animação
animate();