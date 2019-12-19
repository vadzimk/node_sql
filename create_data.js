const faker = require('faker');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'join_us'
});


// const q = 'select count(*) as total from users';
// connection.query(q, (err, results, fields) => {
//     if (err) throw err;
//     console.log(results);
// });

// ------------- inserting data --------------

// const qs="insert into users (email) values ('wyatt@gmail.com')";
// connection.query(qs, (err, results, fields)=>{
//     if(err) throw  err;
//     console.log(results);
// });

// ------------- insert a single row -----------

// const person = {
//     email: faker.internet.email(),
//     created_at: faker.date.past()
// };
//
// const end_result = connection.query('insert into users set ?', person, (err, results, fields) => {
//     if (err) throw  err;
//     console.log(results);
// });


const data = [];

for (let i = 0; i < 500; i++) {
    data.push([faker.internet.email(), faker.date.past()]);
}

console.log(data);

const q = 'insert into users (email, created_at) values ?';

const end_result = connection.query(q, [data], (err, results, fields) => {
    if (err) throw  err;
    console.log(results);
});


console.log(end_result.sql);

connection.end();