const express = require('express');
const mysql= require('mysql2');
var app = express();

var bodyParser= require('body-parser');

var con= mysql.createConnection({

    host: 'containers-us-west-70.railway.app',
    user: 'root',
    password: 'lNuvBTQTpdaOefwdYQ2K',
    database: 'railway',
    port: '7126'
});

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.post('/agregarPersonaje', (req, res)=>{

    let nombre= req.body.nombre
    let estatus= req.body.estatus
    let especie= req.body.especie

    con.query('insert into personajes values("'+nombre+'","'+estatus+'","'+especie+'")' , (err, respuesta, fields)=>{

        if(err) return console.log("error");

        return res.send('Registro exitoso');


    }
    
    );
});
const PORT = process.env.PORT || 7126;
app.listen(PORT, ()=>{

    console.log("Servicio en el puerto 7126");
}

)
app.post('/eliminarPersonaje',(req,res)=>{
    let nombrePer=req.body.usuario;
    let estatusPer= req.body.estatus
    let especiePer= req.body.especie

    con.query('DELETE FROM personajes where nombre=("'+nombrePer+'")',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Personaje ${nombrePer} eliminado</h1>`)
    })
});


app.get('/obtenerPersonaje', (req, res)=>{

    con.query('SELECT *FROM personajes',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        var userHTML=``
        var i=0
        console.log(respuesta)
        userHTML+=`
        <a href="index.html">Inicio</a>
        `
        respuesta.forEach(per=>{
            i++
            userHTML+=`
            <tr><td>${i}</td><td>${per.nombre}</td>
            <td>${per.estatus}</td><td>${per.especie}</td></tr>
            
            `
        })

        return res.send(`<table>
            <tr>
                <th>ID: </th>
                <th>Nombre: </th>
                <th>Estatus: </th>
                <th>Especie: </th>
            </tr>
            ${userHTML}
            </table>`)
    })
    }

    );

    app.post('/actualizarPersonaje',(req,res)=>{
        let nombrePer=req.body.oriName;
        let newName=req.body.nomUpdate
    
    
        con.query('UPDATE personajes SET nombre=("'+newName+'") WHERE nombre=("'+nombrePer+'")',(err,respuesta,field)=>{
            if(err) return console.log('ERROR:',err)
    
            return res.send(`
            <a href="index.html">Inicio</a>
            <h1>Personaje ${nombrePer} cambiado a: <h3>${newName}</h3></h1>
            `)
        })
    });
    
;
