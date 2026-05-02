function toggleMenu(id) {
    document.getElementById(id).classList.toggle('hidden');
}
function gerarCarteirinha(nome, curso, cpf, foto, nascimento, matricula) {
    const container = document.getElementById('modal-container');

    const htmlCarteirinha = `
        <div class="overlay-carteirinha" id="overlay-fechar" onclick="fecharCarteirinha()">
            <div class="card-estacio-novo" onclick="event.stopPropagation()">
                
                <div class="card-header-novo">
                    <div class="foto-perfil-wrapper">
                        <img src="${foto}" alt="Foto" onerror="this.src='https://via.placeholder.com/80?text=👤'">
                    </div>
                    <div class="nome-status">
                        <h2>${nome}</h2>
                        <span class="badge-formado">Em Andamento</span>
                    </div>
                </div>

                <hr class="divisor">

                <div class="info-row">
                    <div class="info-group">
                        <label>CPF</label>
                        <p>${cpf}</p>
                    </div>
                    <div class="info-group">
                        <label>Nascimento</label>
                        <p>${nascimento}</p>
                    </div>
                </div>

                <div class="info-full">
                    <label>Curso</label>
                    <p>${curso}</p>
                </div>

                <div class="info-row">
                    <div class="info-group">
                        <label>Tipo de curso</label>
                        <p>Graduação</p>
                    </div>
                    <div class="info-group">
                        <label>Modelo de ensino</label>
                        <p>Presencial</p>
                    </div>
                </div>

                <div class="info-full">
                    <label>Campus</label>
                    <p>Polo camargos - belo horizonte - mg</p>
                </div>

                <hr class="divisor">

                <div class="card-footer-novo">
                    <div class="info-group">
                        <label class="gold-label">Validade</label>
                        <p class="gold-text">Dez 2028</p>
                    </div>
                    <div class="info-group">
                        <label>Matrícula</label>
                        <p>${matricula} <span class="copy-icon">📋</span></p>
                    </div>
                </div>

                <button type="button" class="btn-fechar-azul" onclick="fecharCarteirinha()">FECHAR CARTEIRINHA</button>
            </div>
        </div>
    `;

    container.innerHTML = htmlCarteirinha;
}

function fecharCarteirinha() {
    const container = document.getElementById('modal-container');
    if (container) {
        container.innerHTML = ''; // Esvazia o container para fechar
    }
}

// Seleciona os elementos
const menuBtn = document.querySelector('.menu-hamb');
const sidebar = document.querySelector('.sidebar');

// Ouve o clique no menu hambúrguer
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    toggleMenuIcons();
});

// Função para alternar ícones do menu
function toggleMenuIcons() {
    const bars = menuBtn.querySelector('.fa-bars');
    const times = menuBtn.querySelector('.fa-times');

    if (sidebar.classList.contains('active')) {
        bars.style.display = 'none';
        times.style.display = 'block';
    } else {
        bars.style.display = 'block';
        times.style.display = 'none';
    }
}

// Fechar o menu ao clicar em um link
const navLinks = document.querySelectorAll('.side-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
        toggleMenuIcons();
    });
});

// Fechar o menu ao clicar no overlay (para mobile)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('active') && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
        sidebar.classList.remove('active');
        toggleMenuIcons();
    }
});




// js/index.js aplicação nova tirando o js do htmkl
// document.addEventListener("DOMContentLoaded", () => {
//     initMenus();
//     initCarteirinhas();
// });

// function initMenus() {
//     document.querySelectorAll(".folder-trigger").forEach(trigger => {
//         trigger.addEventListener("click", () => {
//             const menuId = trigger.dataset.menu;
//             const menu = document.getElementById(menuId);

//             if (!menu) return;

//             const isOpen = !menu.classList.contains("hidden");

//             menu.classList.toggle("hidden");
//             trigger.setAttribute("aria-expanded", String(!isOpen));
//             menu.setAttribute("aria-hidden", String(isOpen));
//         });
//     });
// }

// function initCarteirinhas() {
//     document.querySelectorAll(".btn-estudante").forEach(button => {
//         button.addEventListener("click", () => {
//             const {
//                 nome,
//                 curso,
//                 cpf,
//                 foto,
//                 nascimento,
//                 matricula
//             } = button.dataset;

//             gerarCarteirinha(
//                 nome,
//                 curso,
//                 cpf,
//                 foto,
//                 nascimento,
//                 matricula
//             );
//         });
//     });
// }

const LOGIN_CREDENTIALS = {
    matricula: 'Marcella',
    senha: '0823'
};

function formatLoginDate(date) {
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('login-password');
    const toggleButton = document.getElementById('toggle-password');
    const icon = toggleButton.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

function initLogin() {
    const loginScreen = document.getElementById('login-screen');
    const app = document.getElementById('app');
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('login-error');
    const loginDate = document.getElementById('login-date');

    if (loginDate) {
        loginDate.textContent = formatLoginDate(new Date());
    }

    const toggleButton = document.getElementById('toggle-password');
    if (toggleButton) {
        toggleButton.addEventListener('click', togglePasswordVisibility);
    }

    // Adicionar funcionalidade ao captcha
    const captchaLabel = document.querySelector('.captcha-card');
    const captchaCheckbox = document.getElementById('login-captcha-checkbox');
    if (captchaLabel && captchaCheckbox) {
        captchaLabel.addEventListener('click', (e) => {
            // Prevenir comportamento padrão apenas se não clicou no input
            if (e.target !== captchaCheckbox) {
                e.preventDefault();
                captchaCheckbox.checked = !captchaCheckbox.checked;
            }
        });
    }

    loginForm.addEventListener('submit', event => {
        event.preventDefault();

        // Pequeno delay para garantir que o DOM seja atualizado
        setTimeout(() => {
            const matricula = document.getElementById('login-matricula').value.trim();
            const senha = document.getElementById('login-password').value.trim();
            const captchaChecked = document.getElementById('login-captcha-checkbox').checked;

            if (!captchaChecked) {
                errorMessage.textContent = 'Por favor, confirme que você não é um robô.';
                return;
            }

            if (matricula === LOGIN_CREDENTIALS.matricula && senha === LOGIN_CREDENTIALS.senha) {
                loginScreen.style.display = 'none';
                app.style.display = '';
                errorMessage.textContent = '';
                // Rolar para o topo após login bem-sucedido
                window.scrollTo(0, 0);
            } else {
                errorMessage.textContent = 'Matrícula ou senha incorretas. Tente novamente.';
            }
        }, 50);
    });
}

window.addEventListener('DOMContentLoaded', initLogin);
