// Importação de biblioteca

// essa é a biblioteca que CRIA uma API
const express = require('express');

// bibliotecas para usar o Firebase
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, child, get } = require('firebase/database');

// criando uma API
const app = express();

// fazendo a API aceitar JSON
// { a: 1, b: 2, c: 3 }
app.use(express.json())
// fazendo a API aceitar url enconded
// a=1&b=2&c=3
app.use(express.urlencoded({ extended: true}));

// criei uma variavel e coloquei o valor 3000
const port = 3000;

// credenciais do firebase em uma variável (objeto)
const firebaseConfig = {
  apiKey: "AIzaSyD9W-WXI1vbuDpjWEB4gH-JTs8wbgdlZVw",
  authDomain: "fir-express-ce580.firebaseapp.com",
  projectId: "fir-express-ce580",
  storageBucket: "fir-express-ce580.appspot.com",
  messagingSenderId: "699869854570",
  appId: "1:699869854570:web:6fe34e3715c6d14a948313",
  databaseURL: 'https://fir-express-ce580-default-rtdb.firebaseio.com/',
};

// iniciando o firebase no código
const firebase = initializeApp(firebaseConfig);

// definindo uma rota de POST para salvar usuários
app.post('/users/', (req, res) => {
    // pegando os parametros de entrada do rota
    const nome = req.body.nome;
    const email = req.body.email;
    const number = req.body.telefone;
    const password = req.body.pass;

    // pegando uma instancia do banco firebase
    const database = getDatabase(firebase);
    // gerando um id de 1 a 10000
    const id = Math.floor(Math.random() * 10000) + 1;

    // salvando no firebase na "tabela" /users"
    set(ref(database, 'users/' + id), {
        nome,
        email,
        number,
        password,
    });

    res.send(id)
});

// definindo uma rota de GET para pegar usuários
app.get('/users/:id', (req, res) => {
    // pegando uma instancia do banco firebase
    const dbRef = ref(getDatabase());

    // pegando o id que foi passado na rota
    const id = req.params.id;
    let user;
    // busca no firebase na "tabela" /users pelo id"
    get(child(dbRef, `users/${id}`))
        .then((snapshot) => {
            // depois que leu a "tabela"

            // se achou o usuário
            if (snapshot.exists()) {
                user = snapshot.val();
                // resposta da API devovendo o usuário
                res.send(user)
            } else {
                console.log("No data available");
                // resposta da API se deu erro
                res.send('error')
            }
        })
        .catch((error) => {
            // resposta da API se deu erro
            res.send('error')
        });
});

// rodando (subindo) a API
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})