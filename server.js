const express = require("express"); //  é um framework para aplicações web para Node.js
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./model");
const fs = require('fs');
const pathRoutes = './routes';

const app = express(); // recebendo a funcao express. Cria uma cópia. 
var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

fs
    .readdirSync(pathRoutes).forEach(fileUrlRoutes => {
        require(`${pathRoutes}/${fileUrlRoutes}`)(app);
    });

// 404: Not found
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
//Error handling middleware
app.use((error, req, res, next) => {
    res.status(422).send({ message: error.message })
});

// Rodando o servido e informando a porta
const PORT = process.env.PORT || 8083;

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}.`);
    });

})

