


//importando modulos

//----------------------------------------------------------------------//
// const cors = require('cors') //Segurança da aplicação/criptografia 
const express = require("express") // Importando o express para fazer o tratamento das requisições
const routes = require('./routes/routes') //importando as Rotas da aplicação
const session = require("express-session")

require('./database/') //importando a base de dados da aplicação


//----------------------------------------------------------------------//

const app = express()


const port = 3000
const hostname = `127.0.0.1`

//----------------------------------------------------------------------//

// app.use(cors()) //Limitando o acesso ao código da aplicação
app.set('view engine', 'ejs');
app.set('views', __dirname+ '/views')



//Sessions
// Redis (DB para salvamento de sessões)
app.use(session({
  secret: "TrabalhoDeWeb1",
  cookie: {
    maxAge: 3000000
  },
  
}))


app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(routes)



//----------------------------------------------------------------------//

app.listen(port, hostname, () => {
  console.log(`(●'◡'●) Ta ligado na porta ${port} do localhost (☞ﾟヮﾟ)☞ : 127.0.0.1:${port}`)
})

//----------------------------------------------------------------------//

