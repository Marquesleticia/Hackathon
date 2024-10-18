const perguntasRespostas = {
    "o que é câncer de mama?": "O câncer de mama é o crescimento descontrolado de células nas mamas.",
    "como posso fazer o autoexame?": "Você pode fazer o autoexame tocando suas mamas com movimentos circulares, cobrindo toda a área e observando mudanças.",
    "quais são os sintomas do câncer de mama?": "Os sintomas podem incluir nódulos palpáveis, mudanças na forma da mama, alterações na pele e secreção no mamilo.",
    "quando devo procurar um médico?": "Você deve procurar um médico se perceber algum nódulo ou mudança incomum nas suas mamas.",
    "Encontrei um nódulo. isso significa que tenho câncer?": "Nem todos os nódulos são cancerosos. Muitas vezes, podem ser benignos. É importante procurar um médico para uma avaliação mais detalhada.",
    "o que devo fazer se sentir dor durante o autoexame?": "A dor nas mamas pode ser causada por diferentes fatores, incluindo alterações hormonais. Se a dor persistir ou for acompanhada de outros sintomas, consulte um médico.",
    "Detectei uma secreção no mamilo. isso é normal?": "Secreções no mamilo podem ocorrer por várias razões, mas secreções sanguinolentas ou claras devem ser avaliadas por um médico.",
    "minhas mamas parecem assimétricas. isso é um problema?": "É normal que uma mama seja ligeiramente maior que a outra. No entanto, se você notar uma nova assimetria ou mudanças significativas, consulte seu médico.",
    "senti mudanças na textura da pele da mama. o que isso significa?": "Mudanças na textura da pele, como pele enrugada ou com aspecto de casca de laranja, podem ser sinais de alerta. Procure um médico para uma avaliação."
};

document.addEventListener('DOMContentLoaded', function() {
    // Função para alternar a visibilidade do chatbox
    function toggleChat() {
        const chatbox = document.getElementById('chatbox');
        chatbox.classList.toggle('hidden');
    }

    // Garantir que o chat comece oculto
    const chatbox = document.getElementById('chatbox');
    chatbox.classList.add('hidden'); 

    document.getElementById('chatbot-toggle').addEventListener('click', toggleChat);

    setTimeout(function() {
        toggleChat(); // Abre o chatbox após o tempo definido
    }, 5000); 

    // Função para limpar completamente o chat e mostrar perguntas sugeridas
    function showSuggestedQuestions() {
        const history = document.getElementById('history');
        history.innerHTML = ''; // Limpa todo o histórico do chat antes de mostrar as sugestões

        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.classList.add('suggestions-container');
        
        const question1 = document.createElement('button');
        question1.textContent = 'O que é câncer de mama?';
        question1.onclick = () => handleSuggestedQuestion('o que é câncer de mama?', suggestionsContainer);
        
        const question2 = document.createElement('button');
        question2.textContent = 'Como posso fazer o autoexame?';
        question2.onclick = () => handleSuggestedQuestion('como posso fazer o autoexame?', suggestionsContainer);
        
        const question3 = document.createElement('button');
        question3.textContent = 'Detectei uma secreção no mamilo. isso é normal?';
        question3.onclick = () => handleSuggestedQuestion('Detectei uma secreção no mamilo. isso é normal?', suggestionsContainer);
        
        const question4 = document.createElement('button');
        question4.textContent = 'Encontrei um nódulo. isso significa que tenho câncer?';
        question4.onclick = () => handleSuggestedQuestion('Encontrei um nódulo. isso significa que tenho câncer?', suggestionsContainer);
        
        suggestionsContainer.appendChild(question1);
        suggestionsContainer.appendChild(question2);
        suggestionsContainer.appendChild(question3);
        suggestionsContainer.appendChild(question4);
        
        history.appendChild(suggestionsContainer);
    }

    // Função para lidar com perguntas sugeridas e remover as outras perguntas
    function handleSuggestedQuestion(question, suggestionsContainer) {
        const history = document.getElementById('history');
        
        // Remover as sugestões após uma seleção
        suggestionsContainer.remove();
        
        // Adiciona a pergunta do usuário (simulada a partir da sugestão)
        const userMessage = document.createElement('div');
        userMessage.textContent = question;
        userMessage.classList.add('user-message');
        history.appendChild(userMessage);
        
        // Adicionar uma mensagem temporária de "carregando"
        const botResponse = document.createElement('div');
        botResponse.classList.add('bot-response');
        botResponse.textContent = '...';  // Mensagem de carregando
        history.appendChild(botResponse);

        // Rolar o histórico para mostrar a última mensagem
        history.scrollTop = history.scrollHeight;

        // Simular um tempo de carregamento antes de exibir a resposta
        setTimeout(function() {
            // Buscar a resposta no banco de dados
            const resposta = perguntasRespostas[question];
            if (resposta) {
                botResponse.textContent = resposta;  // Substituir pela resposta correta
            } else {
                botResponse.textContent = 'Desculpe, não entendi sua pergunta. Tente outra vez.';
            }

            // Verificar se a pergunta é uma das três últimas para adicionar resposta automática
            const perguntasAdicionais = [
                "Encontrei um nódulo. isso significa que tenho câncer?",
                "Detectei uma secreção no mamilo. isso é normal?",
                "senti mudanças na textura da pele da mama. o que isso significa?"
            ];
            
            if (perguntasAdicionais.includes(question)) {
                setTimeout(function() {
                    const extraMessage = document.createElement('div');
                    extraMessage.classList.add('bot-response');
                    extraMessage.textContent = 'Sou um assistente virtual e, embora eu busque fornecer informações úteis, posso não estar sempre correto. Recomendo que você procure uma clínica ou seu médico para realizar um exame com um especialista.';
                    history.appendChild(extraMessage);

                    // Rolar o histórico para mostrar a última mensagem
                    history.scrollTop = history.scrollHeight;
                }, 1000); 
            }

            // Rolar o histórico para mostrar a última mensagem
            history.scrollTop = history.scrollHeight;
        }, 3000); // 3 segundos de atraso
    }

    // Evento do botão de "Limpar" para limpar o chat e voltar às perguntas sugeridas
    document.getElementById('btn-clear').addEventListener('click', function() {
        
        const history = document.getElementById('history');
        history.innerHTML = ''; 

        showSuggestedQuestions(); 
    });

    showSuggestedQuestions();

    // Enviar mensagem manualmente (fora das sugestões)
    document.getElementById('btn-submit').addEventListener('click', function() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();
        if (message !== '') {
            handleSuggestedQuestion(message, document.querySelector('.suggestions-container'));
            messageInput.value = ''; 
        }
    });
});

let currentSlide = 1;
const totalSlides = 3;

function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide > totalSlides) {
        currentSlide = 1;
    } else if (currentSlide < 1) {
        currentSlide = totalSlides;
    }
    document.getElementById('slide' + currentSlide).checked = true;
}

function autoScroll() {
    moveSlide(1);
}

// Start auto-scrolling
let scrollInterval = setInterval(autoScroll, 3000);

// Pause auto-scrolling when hovering over the carousel
document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
    clearInterval(scrollInterval);
});

// Resume auto-scrolling when mouse leaves the carousel
document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
    scrollInterval = setInterval(autoScroll, 3000);
});
