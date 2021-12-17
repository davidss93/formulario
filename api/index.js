const express = require('express');
// const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, child, get } = require('firebase/database');


const app = express();
app.use(express.json())

const port = 3000;

const firebaseConfig = {
  apiKey: "AIzaSyD9W-WXI1vbuDpjWEB4gH-JTs8wbgdlZVw",
  authDomain: "fir-express-ce580.firebaseapp.com",
  projectId: "fir-express-ce580",
  storageBucket: "fir-express-ce580.appspot.com",
  messagingSenderId: "699869854570",
  appId: "1:699869854570:web:6fe34e3715c6d14a948313",
  databaseURL: 'https://fir-express-ce580-default-rtdb.firebaseio.com/',
};

const firebase = initializeApp(firebaseConfig);

app.post('/users/', (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const number = req.body.telefone;
    const password = req.body.pass;

    console.log('antes do banco');
    const database = getDatabase(firebase);
    const id = Math.floor(Math.random() * 1000) + 1;
    console.log(id);

    console.log('antes do salvar');
    console.log(req.body)
    set(ref(database, 'users/' + id), {
        nome,
        email,
        number,
        password,
    });
    console.log('depos de salvar');

    res.send(true)
});

app.get('/users/:id', (req, res) => {
    const database = getDatabase(firebase);
    console.log(req.params.id);

    const dbRef = ref(getDatabase());

    let user;
    get(child(dbRef, `users/${req.params.id}`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                user = snapshot.val();
                res.send(user)
            } else {
                console.log("No data available");
                res.send('error')
            }
        })
        .catch((error) => {
            console.error(error);
            res.send('error')
        });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})