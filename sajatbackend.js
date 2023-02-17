const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  var connection
  function dbconn(){
    var mysql = require('mysql')

    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 's52_db'
    })
    
    connection.connect()
    
  }
  
  
  app.get('/esemeny', (req, res) => {
    dbconn()
        
        
        connection.query('SELECT * from esemeny', function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
        
      })
    
      app.get('/emlek', (req, res) => {
    
    dbconn()
        
        connection.query('SELECT * from emlek', function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
      
      })
    
    
    app.get('/emlek_karacsony', (req, res) => {
    
        dbconn()
        
        connection.query('SELECT * from emlek where emlek_esemeny=1', function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
      
      })
    
    app.get('/emlek_ujev', (req, res) => {
    
        dbconn()
        
        connection.query('SELECT * from emlek where emlek_esemeny=2', function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
      
      })
    
    app.get('/emlek_husvet', (req, res) => {
    
        dbconn()
        
        connection.query('SELECT * from emlek where emlek_esemeny=3', function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
      
      })
    
    app.get('/emlek_nevnap', (req, res) => {
    
        dbconn()
        
        connection.query('SELECT * from emlek where emlek_esemeny=4', function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
      
      })
    
    app.get('/emlek_szuletesnap', (req, res) => {
    
        dbconn()
        
        connection.query('SELECT * from emlek where emlek_esemeny=5', function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
      
      })
    
    
      app.post('/keres', (req, res) => {
    
        dbconn()
        
        let parancs='SELECT * from emlek where emlek_alkalom like "%'+req.body.bevitel1+'%"'
        connection.query(parancs, function (err, rows, fields) {
          if (err) throw err
        
          console.log(rows)
          res.send(rows)
        })
        
        connection.end()
        
      })




};
