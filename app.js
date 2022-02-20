
const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors())
const port = process.env.PORT || 3000;

const sequelize = require('./database/db');

//Routes
app.use(require('./routes/genre'));
app.use(require('./routes/movies'));
app.use(require('./routes/characters'));

app.use(require('./routes/auth'))

app.listen(port, () => {
  console.log(`corriento en el puerto: ${port}`)

  // Conectarse
    sequelize.sync( {force: false }).then(() => {
        console.log("conecto correctamente");
    }).catch(error => {
        console.log("se ha proudcito un error", error);
    })
})