const express = require('express');

const app = express();

app.use(express.json());


class Usuario {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.postagens = [];
    }

    adicionarPostagem(postagem) {
        this.postagens.push(postagem);
    }
}

class Postagem {
    constructor(id, autorId, mensagem){
        this.id = id;
        this.autorId = autorId;
        this.mensagem = mensagem;
    }
    
}

let usuarios = [new Usuario(1,'Joao','joao@gmail.com')];
let postagens = [new Postagem(1, 1,'Olá, mundo!')];

usuarios.push(new Usuario(2, 'Maria', 'maria@gmail.com'));
usuarios.push(new Usuario(3, 'Carlos', 'carlos@gmail.com'));

postagens.push(new Postagem(2, 2, 'Bom dia!'));
postagens.push(new Postagem(3, 3, 'Boa tarde!'));


// Associa a postagem ao usuário pelo ID do autor
for (let usuario of usuarios) {
    for (let postagem of postagens) {
        if (postagem.autorId === usuario.id) {
            usuario.adicionarPostagem(postagem);
        }
    }
}


// Retorna todos os usuários
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Cria um novo usuário
app.post('/usuarios', (req, res) => {
    let usuario = new Usuario(usuarios.length + 1, req.body.nome, req.body.email);
    usuarios.push(usuario);
    res.status(201).json(usuario);
});

// Atualiza um usuário existente
app.put('/usuarios/:id', (req, res) => {
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (usuario) {
        usuario.nome = req.body.nome;
        usuario.email = req.body.email;
        res.json(usuario);
    } else {
        res.status(404).json({erro: "Usuário não encontrado!"});
    }
});

// Exclui um usuário existente
app.delete('/usuarios/:id', (req, res) => {
    let index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    if (index !== -1) {
        usuarios.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({erro: "Usuário não encontrado!"});
    }
});

// Retorna todas as postagens
app.get('/postagens', (req, res) => {
    res.json(postagens);
});

// Cria uma nova postagem
app.post('/postagens', (req, res) => {
    let postagem = new Postagem(postagens.length + 1, req.body.autorId, req.body.mensagem);
    postagens.push(postagem);
    res.status(201).json(postagem);
});

// Atualiza uma postagem existente
app.put('/postagens/:id', (req, res) => {
    let postagem = postagens.find(p => p.id === parseInt(req.params.id));
    if (postagem) {
        postagem.mensagem = req.body.mensagem;
        res.json(postagem);
    } else {
        res.status(404).json({erro: "Postagem não encontrada!"});
    }
});

// Exclui uma postagem existente
app.delete('/postagens/:id', (req, res) => {
    let index = postagens.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        postagens.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({erro: "Postagem não encontrada!"});
    }
});


// Retorna todas as postagens de um usuário específico
app.get('/usuarios/:id/postagens', (req, res) => {
    let usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (usuario) {
        res.json(usuario.postagens);
    } else {
        res.status(404).json({erro: "Usuário não encontrado!"});
    }
});



// Iniciando o servidor na porta 8000
app.listen(8000, () => {
    console.log('Servidor rodando na porta 8000');
});
