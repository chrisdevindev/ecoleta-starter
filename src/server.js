const express = require("express")
const server = express()
const db = require("./database/db")

//CONFIGURANDO PASTA PUBLICA----------------------------------------------------------------------------

server.use(express.static("public"))

// ----------------------------------------------------------------------------------------------------

//HABILITAR O USO DO req.body NA APLICAÇÃO---------------------------------------
server.use(express.urlencoded({extended:true}))
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



server.post("/savepoint", (req, res) => {

//inserindo dados na tabela
    const query =`
    INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    )VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.send("DEU BOM")
    }

    db.run(query, values, afterInsertData)  

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