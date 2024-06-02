function detectLanguage() {
    var userLanguage = navigator.language || navigator.userLanguage;
  
    if (userLanguage.startsWith('pt')) {
        document.getElementById('languageParagraph').textContent = 'Olá, meu nome é Vipnunes!';
    } else if (userLanguage.startsWith('es')) {
        document.getElementById('languageParagraph').textContent = '¡Hola soy Vipnunes!';
    } else {
        document.getElementById('languageParagraph').textContent = "Hello, I'm Vipnunes!";
    }
}

// Chama a função de detecção de linguagem quando a página é carregada
detectLanguage();

// Função para detectar a língua do navegador
function detectLanguage() {
    // Obtém o código da língua do navegador
    var userLanguage = navigator.language || navigator.userLanguage;
    
    // Verifica a língua e atualiza o texto do parágrafo
    if (userLanguage.startsWith('pt')) {
        document.getElementById('languageParagraph2').textContent = 'Meu Github e Meus Projetos';
    } else if (userLanguage.startsWith('es')) {
        document.getElementById('languageParagraph2').textContent = 'Mi Github y Mis Proyectos';
    } else {
        document.getElementById('languageParagraph2').textContent = "My Github and My Projects";
    }
}

// Chama a função de detecção de linguagem quando a página é carregada
detectLanguage();

// Chama a função de tradução quando a página é carregada
translateContent();
