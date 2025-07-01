// Sistema de correção para exercícios dos porquês
class ExerciciosPorques {
    constructor() {
        // Respostas corretas para cada exercício
        this.respostasCorretas = [
            'porque',     // 1. Ele fez isso PORQUE queria atenção
            'por-que',    // 2. POR QUE fizeste isso?
            'por-que',    // 3. Juro que não sei POR QUE fez aquilo
            'por-queA',   // 4. Houve nova desvalorização da moeda POR QUÊ (final da frase)
            'porqueA',    // 5. Explique-nos o PORQUÊ dessa atitude (substantivo)
            'por-que',    // 6. Sempre ansiamos POR QUE você explicasse
            'porque',     // 7. Só fiz isso PORQUE conseguisse me dar bem
            'por-que',    // 8. São justos os ideais POR QUE lutamos
            'porqueA',    // 9. Só vou dar este PORQUÊ a vocês (substantivo)
            'porque',     // 10. Os servidores fizeram cursos PORQUE a chefia os obrigou
            'por-queA',   // 11. Sem seu esclarecimento, nunca entenderia POR QUÊ (final)
            'por-queA'    // 12. Não sabia POR QUÊ, mas estava confiante (final)
        ];

        // Explicações para cada resposta
        this.explicacoes = [
            'Use "porque" para explicar uma causa ou razão.',
            'Use "por que" em perguntas diretas.',
            'Use "por que" quando equivale a "por qual razão".',
            'Use "por quê" no final de frases interrogativas.',
            'Use "porquê" como substantivo (precedido de artigo).',
            'Use "por que" quando equivale a "por qual razão".',
            'Use "porque" para explicar uma finalidade.',
            'Use "por que" quando equivale a "pelos quais".',
            'Use "porquê" como substantivo (precedido de artigo).',
            'Use "porque" para explicar uma causa.',
            'Use "por quê" no final de frases interrogativas.',
            'Use "por quê" no final de frases ou antes de pausa.'
        ];

        this.init();
    }

    init() {
        this.adicionarEventListeners();
        this.criarBotaoVerificar();
        this.criarAreaResultados();
    }

    adicionarEventListeners() {
        const selects = document.querySelectorAll('select[name="porques"]');
        selects.forEach((select, index) => {
            select.addEventListener('change', () => this.verificarResposta(select, index));
        });
    }

    criarBotaoVerificar() {
        const botao = document.createElement('button');
        botao.textContent = 'Verificar Todas as Respostas';
        botao.className = 'btn-verificar';
        botao.addEventListener('click', () => this.verificarTodas());

        // Inserir o botão após os exercícios
        const exercicios = document.querySelector('ol');
        exercicios.insertAdjacentElement('afterend', botao);
    }

    criarAreaResultados() {
        const areaResultados = document.createElement('div');
        areaResultados.id = 'resultados';
        areaResultados.className = 'area-resultados';

        const botao = document.querySelector('.btn-verificar');
        botao.insertAdjacentElement('afterend', areaResultados);
    }

    verificarResposta(select, index) {
        const respostaUsuario = select.value;
        const respostaCorreta = this.respostasCorretas[index];
        
        // Remove classes anteriores
        select.classList.remove('correto', 'incorreto');
        
        if (respostaUsuario === '') {
            return; // Não faz nada se não selecionou
        }

        if (respostaUsuario === respostaCorreta) {
            select.classList.add('correto');
            this.mostrarFeedback(select, true, index);
        } else {
            select.classList.add('incorreto');
            this.mostrarFeedback(select, false, index);
        }
    }

    mostrarFeedback(select, correto, index) {
        // Remove feedback anterior
        const feedbackAnterior = select.parentNode.querySelector('.feedback');
        if (feedbackAnterior) {
            feedbackAnterior.remove();
        }

        const feedback = document.createElement('div');
        feedback.className = `feedback ${correto ? 'feedback-correto' : 'feedback-incorreto'}`;
        
        if (correto) {
            feedback.innerHTML = `
                <span class="icone">✓</span>
                <span class="texto">Correto!</span>
            `;
        } else {
            const respostaCorreta = this.obterTextoResposta(this.respostasCorretas[index]);
            feedback.innerHTML = `
                <span class="icone">✗</span>
                <span class="texto">Incorreto. A resposta correta é: <strong>${respostaCorreta}</strong></span>
                <div class="explicacao">${this.explicacoes[index]}</div>
            `;
        }

        select.parentNode.appendChild(feedback);
    }

    obterTextoResposta(valor) {
        const mapeamento = {
            'por-que': 'por que',
            'por-queA': 'por quê',
            'porque': 'porque',
            'porqueA': 'porquê'
        };
        return mapeamento[valor];
    }

    verificarTodas() {
        const selects = document.querySelectorAll('select[name="porques"]');
        let acertos = 0;
        let tentativas = 0;

        selects.forEach((select, index) => {
            if (select.value !== '') {
                tentativas++;
                this.verificarResposta(select, index);
                if (select.value === this.respostasCorretas[index]) {
                    acertos++;
                }
            }
        });

        this.mostrarResultadoFinal(acertos, tentativas, selects.length);
    }

    mostrarResultadoFinal(acertos, tentativas, total) {
        const areaResultados = document.getElementById('resultados');
        const porcentagem = tentativas > 0 ? Math.round((acertos / tentativas) * 100) : 0;
        
        let mensagem = '';
        let classe = '';
        
        if (tentativas === 0) {
            mensagem = 'Complete pelo menos um exercício para ver os resultados.';
            classe = 'resultado-neutro';
        } else if (porcentagem >= 80) {
            mensagem = 'Excelente! Você domina o uso dos porquês.';
            classe = 'resultado-excelente';
        } else if (porcentagem >= 60) {
            mensagem = 'Bom trabalho! Continue praticando.';
            classe = 'resultado-bom';
        } else {
            mensagem = 'Continue estudando. A prática leva à perfeição!';
            classe = 'resultado-melhorar';
        }

        areaResultados.innerHTML = `
            <div class="resultado-final ${classe}">
                <h3>Resultado dos Exercícios</h3>
                <div class="pontuacao">
                    <span class="acertos">${acertos}</span> de 
                    <span class="tentativas">${tentativas}</span> corretas
                    ${tentativas < total ? ` (${total - tentativas} não respondidas)` : ''}
                </div>
                <div class="porcentagem">${porcentagem}% de aproveitamento</div>
                <div class="mensagem">${mensagem}</div>
                <button onclick="exercicios.reiniciar()" class="btn-reiniciar">Tentar Novamente</button>
            </div>
        `;

        areaResultados.scrollIntoView({ behavior: 'smooth' });
    }

    reiniciar() {
        const selects = document.querySelectorAll('select[name="porques"]');
        selects.forEach(select => {
            select.value = '';
            select.classList.remove('correto', 'incorreto');
            
            const feedback = select.parentNode.querySelector('.feedback');
            if (feedback) {
                feedback.remove();
            }
        });

        document.getElementById('resultados').innerHTML = '';
    }
}

// Inicializar quando a página carregar
let exercicios;
document.addEventListener('DOMContentLoaded', function() {
    exercicios = new ExerciciosPorques();
});