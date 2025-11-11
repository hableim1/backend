const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const router = express.Router();

const swaggerYamlPath = './swagger.yaml';

try {
  const file = fs.readFileSync(swaggerYamlPath, 'utf8');
  const swaggerDocument = YAML.parse(file);

  router.use('/', swaggerUI.serve);

  router.get('/', swaggerUI.setup(swaggerDocument));

} catch (error) {
  console.error("Erro ao carregar ou parsear o arquivo swagger.yaml:", error);
  router.use('/', (req, res) => {
    res.status(500).json({ error: "Falha ao carregar a documentação da API." });
  });
}


module.exports = router;