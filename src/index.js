const express = require('express');
// documentation
const swaggerUi = require('swagger-ui-express');
const OpenApiValidator = require('express-openapi-validator');
const yml = require('yamljs');
const path = require('path');

// routes
const routes = require('./routes');

// implementation
const app = express();
const port = 3000;

//configs
app.use(express.json()); // for parsing  application/json
const swaggerDocument = yml.load(path.join(__dirname, '../openapi.yaml'));


// documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  OpenApiValidator.middleware({
    apiSpec: swaggerDocument,
    validateRequests: true, // (default)
    validateResponses: true, // false by default
    ignorePaths: /\/docs(\/.*)?/  // Exclude docs from validation
  })
)
// SWagger error handler (shows a JSON response with the error details)
// for  every validation error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors, 
  })
});


// Mount all routes
app.use('/', routes);

// execute the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`API docs available at http://localhost:${port}/docs`);
});