const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.listen(port, (error) => {
  if(error) throw new Error(error);

  console.log(`Servidor corriendo en el puerto ${port}`);
})
