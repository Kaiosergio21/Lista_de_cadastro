const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 6004;

// Configuração do banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'sua_base_de_dados'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Serve o arquivo HTML estático
app.use(express.static(path.join(__dirname, 'public')));

// Rota para criar um novo registro
app.post('/create', (req, res) => {
  console.log('Recebido uma requisição POST para /create'); // Para debugging
  const { nome, email } = req.body;
  console.log('Dados recebidos:', req.body); // Para debugging
  const sql = 'INSERT INTO users (nome, email) VALUES (?, ?)';
  db.query(sql, [nome, email], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados:', err); // Para debugging
      res.status(500).send('Erro ao inserir dados'); // Envie um status 500 em caso de erro
    } else {
      res.send('Usuário criado com sucesso!');
    }
  });
});

// Rota para ler todos os registros
app.get('/read', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota para atualizar um registro
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;
  const sql = 'UPDATE users SET nome = ?, email = ? WHERE id = ?';
  db.query(sql, [nome, email, id], (err, result) => {
    if (err) throw err;
    res.send('Usuário atualizado com sucesso!');
  });
});

// Rota para deletar um registro
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM users WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Usuário deletado com sucesso!');
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
