// Navegação entre seções
const cadastroSection = document.getElementById('cadastro-forms');
const listaSection = document.getElementById('lista');
const listaLink = document.querySelector('a[href="#lista"]');
const cadastroLink = document.querySelector('a[href="#cadastro-forms"]');
const cadLink = document.getElementById('cadastro-link');
const listLink = document.getElementById('lista-link');
const cadLinkMobile = document.getElementById('cadastro-link-mobile');
const listLinkMobile = document.getElementById('lista-link-mobile');

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navAndroid = document.querySelector('nav.nav-android');

// Elementos do formulário
const form = document.getElementById('formulario-usuario');
const tabela = document.getElementById('users-table');

// Modal
const modal = document.getElementById('modal');
let usuarioParaExcluir = null;

// Vai pra lista de usuários
function irParaLista() {
    cadastroSection.className = 'section';
    listaSection.className = 'section active';
    listLink.className = 'nav-link active';
    cadLink.className = 'nav-link';
    listLinkMobile.className = 'nav-link active';
    cadLinkMobile.className = 'nav-link';
    fecharMenuMobile();
}

// Volta pro cadastro
function irParaCadastro() {
    cadastroSection.className = 'section active';
    listaSection.className = 'section';
    listLink.className = 'nav-link';
    cadLink.className = 'nav-link active';
    listLinkMobile.className = 'nav-link';
    cadLinkMobile.className = 'nav-link active';
    fecharMenuMobile();
}

// Menu mobile
function toggleMenuMobile() {
    navAndroid.classList.toggle('active');
}

function fecharMenuMobile() {
    navAndroid.classList.remove('active');
}

// Event listeners de navegação
listaLink.addEventListener('click', (e) => {
    e.preventDefault();
    irParaLista();
});

cadastroLink.addEventListener('click', (e) => {
    e.preventDefault();
    irParaCadastro();
});

listLinkMobile.addEventListener('click', (e) => {
    e.preventDefault();
    irParaLista();
});

cadLinkMobile.addEventListener('click', (e) => {
    e.preventDefault();
    irParaCadastro();
});

hamburger.addEventListener('click', toggleMenuMobile);

// Validação personalizada
function mostrarErro(campoId, mensagem) {
    const erroElement = document.getElementById(campoId + '-error');
    const campo = document.getElementById(campoId);
    
    erroElement.textContent = mensagem;
    erroElement.style.display = 'block';
    campo.style.borderColor = 'var(--erro)';
}

function limparErro(campoId) {
    const erroElement = document.getElementById(campoId + '-error');
    const campo = document.getElementById(campoId);
    
    erroElement.style.display = 'none';
    campo.style.borderColor = 'var(--border)';
}

// Validações específicas
function validarNome() {
    const nome = document.getElementById('nome').value.trim();
    if (nome.length < 2) {
        mostrarErro('nome', 'Nome deve ter pelo menos 2 caracteres');
        return false;
    }
    limparErro('nome');
    return true;
}

function validarEmail() {
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        mostrarErro('email', 'Por favor, insira um e-mail válido');
        return false;
    }
    limparErro('email');
    return true;
}

function validarTelefone() {
    const telefone = document.getElementById('tell').value.trim();
    const telefoneRegex = /^\(\d{2}\)\d{4,5}-\d{4}$/;
    
    if (!telefoneRegex.test(telefone)) {
        mostrarErro('tell', 'Formato: (99)99999-9999');
        return false;
    }
    limparErro('tell');
    return true;
}

function validarIdade() {
    const idade = document.getElementById('idade').value;
    if (idade < 18 || idade > 120) {
        mostrarErro('idade', 'Idade deve ser entre 18 e 120 anos');
        return false;
    }
    limparErro('idade');
    return true;
}

function validarEndereco() {
    const endereco = document.getElementById('endereco').value.trim();
    if (endereco.length < 5) {
        mostrarErro('endereco', 'Endereço deve ter pelo menos 5 caracteres');
        return false;
    }
    limparErro('endereco');
    return true;
}

// Event listeners para validação em tempo real
document.getElementById('nome').addEventListener('blur', validarNome);
document.getElementById('email').addEventListener('blur', validarEmail);
document.getElementById('tell').addEventListener('blur', validarTelefone);
document.getElementById('idade').addEventListener('blur', validarIdade);
document.getElementById('endereco').addEventListener('blur', validarEndereco);

// Sistema de cadastro
document.addEventListener('DOMContentLoaded', carregarUsuarios);

function carregarUsuarios() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    tabela.innerHTML = "";
    usuarios.forEach((user, index) => {
        adicionarNaTabela(user, index);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validar todos os campos
    const nomeValido = validarNome();
    const emailValido = validarEmail();
    const telefoneValido = validarTelefone();
    const idadeValida = validarIdade();
    const enderecoValido = validarEndereco();

    if (nomeValido && emailValido && telefoneValido && idadeValida && enderecoValido) {
        const usuario = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            tell: document.getElementById('tell').value.trim(),
            idade: document.getElementById('idade').value,
            endereco: document.getElementById('endereco').value.trim()
        };

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        adicionarNaTabela(usuario, usuarios.length - 1);
        form.reset();
        
        // Limpar todos os erros após envio bem-sucedido
        ['nome', 'email', 'tell', 'idade', 'endereco'].forEach(limparErro);
    }
});

function adicionarNaTabela(usuario, index) {
    let row = document.createElement('tr');

    row.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.tell}</td>
        <td>${usuario.idade}</td>
        <td>${usuario.endereco}</td>
        <td class="coluna-acao">
            <button class="botao-acao edit" onclick="editarUsuario(${index})">
                <i class="fa fa-edit"></i> Editar
            </button>
            <button class="botao-acao delete" onclick="abrirModalExclusao(${index})">
                <i class="fa fa-trash"></i> Excluir
            </button>
        </td>
    `;
    tabela.appendChild(row);
}

// Sistema de busca
const inputBusca = document.querySelector('.procura input');
const botaoBusca = document.querySelector('.procura button');

function buscarUsuarios() {
    const termo = inputBusca.value.toLowerCase();
    const linhas = tabela.getElementsByTagName('tr');
    
    for (let linha of linhas) {
        const textoLinha = linha.textContent.toLowerCase();
        if (textoLinha.includes(termo)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    }
}

botaoBusca.addEventListener('click', buscarUsuarios);
inputBusca.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        buscarUsuarios();
    }
});

// Modal de exclusão
function abrirModalExclusao(index) {
    usuarioParaExcluir = index;
    modal.style.display = 'flex';
}

function closeDeleteModal() {
    modal.style.display = 'none';
    usuarioParaExcluir = null;
}

function confirmDelete() {
    if (usuarioParaExcluir !== null) {
        removerUsuario(usuarioParaExcluir);
        closeDeleteModal();
    }
}

// Fechar modal ao clicar no X ou fora
document.querySelector('.fechar').addEventListener('click', closeDeleteModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeDeleteModal();
    }
});

function removerUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
}

// Função de edição (básica)
function editarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];
    
    // Preencher formulário com dados do usuário
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('tell').value = usuario.tell;
    document.getElementById('idade').value = usuario.idade;
    document.getElementById('endereco').value = usuario.endereco;
    
    // Remover usuário da lista (para substituir pelo editado)
    usuarios.splice(index, 1);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarUsuarios();
    
    // Ir para seção de cadastro
    irParaCadastro();
}

    // Formatar o cadastro do número automaticamente
const inputTelefone = document.getElementById('tell');
inputTelefone.addEventListener('input', function(e) {
    let valor = e.target.value.replace(/\D/g, ""); // tira tudo que não for número
    if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos
    
    if (valor.length > 6) {
        e.target.value = `(${valor.slice(0, 2)})${valor.slice(2, 7)}-${valor.slice(7)}`;
    } else if (valor.length > 2) {
        e.target.value = `(${valor.slice(0, 2)})${valor.slice(2)}`;
    } else {
        e.target.value = valor;
    }
});