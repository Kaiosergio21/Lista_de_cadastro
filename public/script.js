document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('createNome').value;
    const email = document.getElementById('createEmail').value;
    console.log('Enviando:', { nome, email }); // Para debugging
    fetch('/create', { // Adicione a URL completa
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email })
    }).then(response => response.text())
      .then(data => {
        console.log('Resposta do servidor:', data); // Para debugging
        alert(data);
      });
  });
  
  function readUsers() {
    fetch('/read') // Adicione a URL completa
      .then(response => response.json())
      .then(data => {
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        data.forEach(user => {
          const li = document.createElement('li');
          const li2 = document.createElement('li2');
          li.textContent = `nome:${user.nome}`;
          li2.textContent = ` gmail: ${user.email}`;
          usersList.appendChild(li);
          usersList.appendChild(li2);
        });
      });
  }