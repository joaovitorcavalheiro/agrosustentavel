// animação de contagem quando os números aparecem na tela
const counters = [
    { id: 'count1', target: 38, suffix: 'M' },    // milhões CO2
    { id: 'count2', target: 12, suffix: 'M' },     // hectares
    { id: 'count3', target: 284, suffix: 'k' },    // familias, 284k
    { id: 'count4', target: 32, suffix: '%' }
];
let animated = false;

function startCounters() {
    if(animated) return;
    animated = true;
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if(!element) return;
        let current = 0;
        const target = counter.target;
        const step = Math.ceil(target / 40);
        const interval = setInterval(() => {
            current += step;
            if(current >= target) {
                current = target;
                element.innerText = current + (counter.suffix ? counter.suffix : '');
                clearInterval(interval);
            } else {
                element.innerText = current + (counter.suffix ? counter.suffix : '');
            }
        }, 25);
    });
}

// scroll trigger para contadores
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight - 100;
}

function checkCounterVisibility() {
    const impactDiv = document.querySelector('.impact-counter');
    if(impactDiv && isElementInViewport(impactDiv)) {
        startCounters();
        window.removeEventListener('scroll', checkCounterVisibility);
        window.removeEventListener('resize', checkCounterVisibility);
    }
}

window.addEventListener('scroll', checkCounterVisibility);
window.addEventListener('resize', checkCounterVisibility);
checkCounterVisibility(); // verifica inicial

// Newsletter simples com feedback
const subscribeBtn = document.getElementById('subscribeBtn');
const emailInput = document.getElementById('emailInput');
const formFeedback = document.getElementById('formFeedback');

if(subscribeBtn) {
    subscribeBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if(!email) {
            formFeedback.innerHTML = '✉️ Por favor, insira um e-mail válido.';
            formFeedback.style.color = '#c24a2a';
            setTimeout(() => { formFeedback.innerHTML = ''; }, 2500);
            return;
        }
        if(!email.includes('@') || !email.includes('.')) {
            formFeedback.innerHTML = '⚠️ E-mail parece inválido. Tente novamente.';
            formFeedback.style.color = '#c24a2a';
            setTimeout(() => { formFeedback.innerHTML = ''; }, 2500);
            return;
        }
        formFeedback.innerHTML = '🌱 Obrigado! Você receberá conteúdos sobre agro forte e sustentável.';
        formFeedback.style.color = '#2b7a3e';
        emailInput.value = '';
        setTimeout(() => { formFeedback.innerHTML = ''; }, 4000);
    });
}

// Smooth scroll para links internos (âncoras)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if(targetId === "#" || targetId === "") return;
        const targetElem = document.querySelector(targetId);
        if(targetElem) {
            e.preventDefault();
            targetElem.scrollIntoView({ behavior: 'smooth' });
        }
    });
});