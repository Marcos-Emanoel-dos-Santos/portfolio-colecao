const dadosProjetos = {
    // PROJETOS LABORATORIO
    'deans-list': {
        titulo: "Dean's List",
        tags: "Reconhecimento Acadêmico | Dedicação",
        texto: `
            <p>A Dean's List é um reconhecimento acadêmico dado aos alunos de destaque da Escola Politécnica da PUCPR.</p>
            <p>Conseguir esse mérito exigiu muita dedicação em diversas áreas da minha vida.</p>
            <p>Por ter conseguido a premiação neste ano, o evento ainda não ocorreu, então infelizmente esse card não tem certificado/foto.</p>
        `
    },
    'led': {
        titulo: "RGBlib",
        tags: "Hardware | Arduino | C++",
        texto: `
            <p>Dos LEDs RGB surgiu minha paixão pela computação. Durante o ensino médio eu adorava usar esses LEDs, então criei uma biblioteca em C++ para utilizá-los com maior facilidade.</p>
            <p>Meu maior desafio para este projeto foi aprender a linguagem C++. Neste momento eu mal sabia compilar código utilizando o terminal e me aventurei na construção de uma biblioteca para Arduino.</p>
            <p>O link apresenta um rework mais recente da biblioteca pois haviam diversos bugs no projeto inicial.</p>
        `,
        link: "https://github.com/Marcos-Emanoel-dos-Santos/RGBLibRework"
    },
    'portfolio': {
        titulo: "Portfólio (Você está aqui!)",
        tags: "Front-end | HTML, CSS, JS Puro | UX/UI",
        texto: `
            <p>Opa, é aqui que você está!</p>
            <p>Você já deve ter reparado o quão colorido é tudo por aqui. Essas cores são a minha história a ser contada!</p>
            <p>Meu interesse pela computação surgiu quando tive contato com LEDs RGB pela primeira vez nas aulas de robótica: eu sempre amei ver luzes coloridas piscando, e refleti essa paixão por todo o site.</p>
            <p>Nada aqui é por acaso: esse site não é só meu portfólio, é minha alma traduzida em binário!</p>
        `,
        link: "https://github.com/Marcos-Emanoel-dos-Santos/portfolio-colecao"
    },
    'maratona': {
        titulo: "Maratona SBC",
        tags: "Algoritmos | Estruturas de dados | Competição",
        texto: `
            <p>Participei durante 4 meses de um treinamento para a maratona de programação promovida pela Sociedade Brasileira de Computação (SBC).</p>
            <p>Durante esses 4 meses, desenvolvi ampla capacidade de lidar com algoritmos e estruturas de dados aplicados à resolução de problemas.</p>
        `,
        link: "https://github.com/Marcos-Emanoel-dos-Santos/BloonsSBC2026"
    },
    'robotica': {
        titulo: "OBMEP e Robótica",
        tags: "Hardware | Arduino | Matemática",
        texto: `
            <p>A matemática sempre teve um papel importante na minha vida desde muito jovem. Participei diversas vezes da OBMEP e já fui medalhista nacional.</p>
            <p>A robótica me introduziu para a computação e revelou meu gosto por criar e por expressar a criatividade por meio do código.</p>
        `
    },


    // PROJETOS COLECAO
    'construct': {
        titulo: "Primeira Experiência no Construct",
        tags: "Game Design | Visual Scripting | Lógica Orientada a Eventos",
        texto: `
            <p>Primeiro projeto criativo desenvolvido durante a graduação, ao lado dos estudantes Guilherme, Ricardo e Letícia. O projeto se trata de um jogo idle onde o jogador avança comprando novos carros e pistas de corrida.</p>
            <p>Apesar de ter sido meu primeiro contato com a ferramenta, foi aqui que construí a base da minha Lógica Orientada a Eventos e compreendi o ciclo de vida de um projeto em equipe.</p>
        `
    },
    'estudante-solidario': {
        titulo: "Estudante Solidário",
        tags: "Desenvolvimento Web | Impacto Social | Extensão Universitária",
        texto: `
            <p>O projeto foi desenvolvido em equipe com os estudantes Alisson, Rhyan e Augusto e se trata de um site onde o estudante pode contribuir em trabalho voluntário com a comunidade.</p>
        `,
        link: "https://github.com/Marcos-Emanoel-dos-Santos/EstudanteSolidario"
    },
    'naves': {
        titulo: "Guerra de Naves",
        tags: "Desenvolvimento de Jogos | Lua | Multiplayer Local",
        texto: `
            <p>Guerra de Naves é um jogo multiplayer local desenvolvido em Lua onde um jogador deve derrotar o inimigo utilizando as armas da própria nave ou power-ups que surgirão no decorrer do jogo.</p>
        `,
        link: "https://github.com/Marcos-Emanoel-dos-Santos/LuaNaves"
    },
    'pong': {
        titulo: "Pong",
        tags: "Lógica de Programação",
        texto: `
            <p>Pong (que apelidei carinhosamente de Pong 2) foi meu primeiro projeto feito durante o ensino médio. Se trata do clássico jogo Pong adaptado com opçções Single Player/Multiplayer, trilha sonora e estilização dos elementos.</p>
        `,
        link: "https://editor.p5js.org/marcosssantos1997/full/5PIdbQrAU"
    },
    'ca': {
        titulo: "Centro Acadêmico",
        tags: "Liderança | Engajamento Estudantil | Soft Skills",
        texto: `
            <p>Sou membro estatutário do Centro Acadêmico de Ciência da Computação, atuando como vice-secretário na chapa eleita. Como vice-secretário contribui na organização de eventos e redigi a redação completa do Estatuto Social atual do Centro Acadêmico.</p>
            <p>Esta é, sem dúvidas, uma das minhas contribuições mais gratificantes para o bem-estar de cada estudante do curso.</p>
        `
    },
    'acolhida': {
        titulo: "Acolhida Cultural",
        tags: "Organização de Eventos | Comunicação | Extensão Universitária",
        texto: `
            <p>Fui um  dos membros organizadores do estande do Centro Acadêmico de Ciência da Computação na Acolhida Cultural do dia 12/08/2026 na PUCPR.</p>
        `
    }
};


// Funções de controle do Modal
const modalOverlay = document.getElementById('modal-overlay');
const modalConteudo = document.getElementById('modal-conteudo');

function abrirModal(idProjeto) {
    const projeto = dadosProjetos[idProjeto];

    if (projeto) {
        let htmlDoConteudo = `
            <h2>${projeto.titulo}</h2>
            <span class="tags-modal">${projeto.tags}</span>
            <div class="texto-modal">${projeto.texto}</div>
        `;

        // Se tiver link, adiciona o botão
        if (projeto.link) {
            htmlDoConteudo += `<br><a href="${projeto.link}" target="_blank" rel="noopener noreferrer" class="btn-link">Acessar Projeto / Repositório</a>`;
        }

        modalConteudo.innerHTML = htmlDoConteudo;
        modalOverlay.classList.add('ativo');
    } else {
        console.error("Projeto não encontrado no banco de dados:", idProjeto);
    }
}

function fecharModal() {
    modalOverlay.classList.remove('ativo');
}

modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
        fecharModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modalOverlay.classList.contains('ativo')) {
        fecharModal();
    }
});