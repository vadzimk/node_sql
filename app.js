const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser'); //to parse body of post request to extract data from post request
app.use(bodyParser.urlencoded({extended: true}));


const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'join_us'
});

app.get('/', (req, res) => {
    //find count of users in the db
    //respond with count
    const q = 'select count(*) as count from users';
    connection.query(q, (err, results)=>{
        if(err) throw err;
        const count = results[0].count;
        res.render('home', {data: count});
    });
});

app.get('/joke', (req, res) => {
    const joke = 'dog';
    res.send(joke);
    console.log('requested joke route');
});

app.get('/random_num', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.send(''+ num);
});

app.post('/register', (req, res)=>{
    const email=req.body.email;
    const q = 'insert into users set email = ?';
    connection.query(q, email, (err, results, fields)=>{
        if(err) throw err;
        console.log(results);
        res.redirect('/');
    })
});

app.listen(port, () => console.log(`Server running on port ${port}`));
