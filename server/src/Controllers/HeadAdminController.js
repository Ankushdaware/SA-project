const { query } = require('../utils/database');
const express = require('express');
const app = express();

// app.get('/', async(req, resp) => {
//     let data = await query();
//     data = await data.find().toArray();
//     resp.send(data)
// });

// app.listen(5000)

// const schooldata = async function (req, res) {
//     try {
//             return res.json(query);
//     } catch (error) {
//         console.error(err);
//         return res.status(500).send({ status: false, message: err.message });
//     }
// }

// const schooldata = async function (req, res) {
//     const query = 'SELECT * FROM tbl_school';
//     connection.query(query, (err, results) => {
//         if (err) throw err;
//         console.log('Data fetched:', results);
//         });    
//     }


const schooldata = async function (req, res) {

    try {
        const sql = 'SELECT * FROM tbl_school';
        const result = await query(sql);

        if (result.length === 0) {
            return res.status(404).send({ status: false, message: "No schools found" });
        }

        res.json(result);
        } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Error retrieving schools" });
        }
}

const admindata = async function (req, res) {

    try {
        const sql = 'SELECT * FROM tbl_admin';
        const result = await query(sql);

        if (result.length === 0) {
            return res.status(404).send({ status: false, message: "No admins found" });
        }

        res.json(result);
        } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Error retrieving admins" });
        }
}

module.exports = {schooldata, admindata};
