cadastroSection = document.getElementById('cadastro-forms');
listaSection = document.getElementById('lista');
listaLink = document.querySelector('a[href="#lista"]');
cadastroLink = document.querySelector('a[href="#cadastro-forms"]');
cadLink = document.getElementById('cadastro-link')
listLink = document.getElementById('lista-link')

//Vai pra lista de usuários
listaLink.addEventListener('click', () => {
 
  cadastroSection.className = 'section';
  listaSection.className = 'section active';
  listLink.className = 'nav-link active';
  cadLink.className = 'nav-link';

});

//Volta pro cadastro
cadastroLink.addEventListener('click', () => {
 
  cadastroSection.className = 'section active';
  listaSection.className = 'section';
  listLink.className = 'nav-link';
  cadLink.className = 'nav-link active';
});
