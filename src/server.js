const express = require("express")
const server = express()
const db = require("./database/db")

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
     console.log(req.query) 

   return res.render("create-point.html")
})






server.get("/search", (req, res) =>{

   //pegar os dados do banco de dados

       db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})

    })

 })
 
//ligar o servidor
server.listen(3000)