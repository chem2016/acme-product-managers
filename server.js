const express = require('express');
const app = express();
const path = require('path');

const { User, Product, syncAndSeed } = require('./db')

syncAndSeed()
    .then(()=>console.log('sync data for user and products'))

const port = process.env.PORT || 3000;
app.use(express.json())
app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=>{
    User.findAll()
        .then(users=>res.send(users))
        .catch(next)
})

app.get('/api/products', (req, res, next)=>{
    Product.findAll()
        .then(products=>res.send(products))
        .catch(next)
})

app.put('/api/products/:id', (req, res, next)=>{
    console.log('in server.js: ', req.params.id)
    Product.findByPk(req.params.id)
        .then(product=>product.update(req.body))
        .then(product=>res.send(product))
        .catch(next)
})

app.use((err, req, res, next)=> {
    let errors = [err];
    if(err.name === 'SequelizeValidationError'){
      errors = err.errors;
    }
    else {
      errors = [ { message: err.message } ];
    }
    res.status(err.status || 500).send({errors});
});

app.listen(port, ()=> console.log(`listening on port ${port}`))
