const express = require("express")
const server = express()

//CONFIGURANDO PASTA PUBLICA----------------------------------------------------------------------------

server.use(express.static("public"))

// ----------------------------------------------------------------------------------------------------


//UTILIZANDO TEMPLATE ENGINE---------------------------------------------------------------------------
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", { 
    express: server,
    noCache: true

})
//-----------------------------------------------------------------------------------------------------


server.get("/", (req, res) =>{
   return res.render("index.html")
})

server.get("/create-point", (req, res) =>{
   return res.render("create-point.html")
})

server.get("/search", (req, res) =>{
    return res.render("search-results.html")
 })
 
//ligar o servidor
server.listen(3000)