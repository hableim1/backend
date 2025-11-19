require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const usuariosRouter = require("./routes/usuariosRouter");

const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

const app = express();

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_DATABASE } = process.env;

const MONGO_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Conexão com MongoDB Atlas estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar ao MongoDB Atlas:', err.message));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/usuarios", usuariosRouter);

const swaggerPath = './swagger.yaml';

try {
  const file = fs.readFileSync(swaggerPath, 'utf8');
  const swaggerDocument = YAML.parse(file);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (e) {
  console.error('Erro ao carregar swagger.yaml:', e.message);
}

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API Pratica 10 rodando!' });
});

app.use(function(req, res, next) {
  next(createError(404, 'Recurso não encontrado.'));
});

app.use(function(err, req, res, next) {
  const status = err.status || 500;

  res.status(status).json({
    status: status,
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});


module.exports = app;