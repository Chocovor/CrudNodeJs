const express = require ("express"); // création de const express qui permet d'acceder à express
const app =  express(); //permet d'utiliser les méthodes de l'objet express dans la variable "app"

const cors = require ("cors"); // permet au différents serveurs d'échanger des données entre eux.
const mysql = require("mysql"); //permet de se connecter à un serveur MySQL

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://localhost:8081",
    ],
    optionSuccessStatus: 200, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    headers: "Content-Type,Authorization",
    credentials: true,
}
app.use(express.json()); //permet aux applications de recevoir du contenu en format JSON
app.use(cors(corsOptions));  //ajoute la gestion des cross-origin resource sharing à notre application

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crudnode",
})

app.get("/", (req, res) => { // crée un endpoint à l'adresse "/" et ensuite il attend une requête et une réponse
    //res.json("Salut à toi depuis le backend") // en réponse on renvoie le message
    const sql = 'SELECT * FROM student'; // crée la requête SQL pour récupérer toutes les informations du tableau
    database.query(sql,(err,data) => { //fonction de rappel qui prend deux argument err pour les error ete data
        if (err) return res.json("error"); // la condition est vraie, on execute ce qu'il y a après le "if", sinon
        return res.json(data);
    })
})

app.post("/create", (req, res) => {
    const sql = "INSERT INTO student(`name`,`email`) VALUES (?)"; // crée la requête SQL pour insérer les données du formulaire
    const values = [
        req.body.name,
        req.body.email
    ]
    database.query(sql,[values], (err,data) => { 
        if (err) return res.json("error");
        return res.json(data);
    })
})

app.put(`/update/:id`, (req, res) => {
    const sql = "UPDATE student SET `name`=?,`email`= ? WHERE id =?";
    const values = [
        req.body.name,
        req.body.email
    ]
    const id = req.params.id;
    database.query(sql, [...values, id], (err,data) => { 
        if (err) return res.json("error");
        return res.json(data);
    })
})

app.delete(`/student/:id`, (req, res) => {
    const sql = "DELETE FROM student WHERE id = ?"
    const id = req.params.id;
    database.query(sql, [id], (err,data) => { 
        if (err) {
            res.status(500).json({ message: 'Error deleting student' });
          } else {
            res.json({ message: 'Student deleted successfully' });
          }
    })
})


app.listen(8081, () => { //attribue le port 8081 au serveur et éxeute une fonction anonyme listen
    console.log('server is running on port 8081')
})