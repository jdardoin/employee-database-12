const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());





// Connect to the database 
const db = mysql.createConnection(
    {

        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'
    },
    console.log(`employee_tracker_db connected`)
);
