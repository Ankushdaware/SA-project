const { query } = require('../utils/database');
const express = require('express');
const app = express();


const classdata = async function (req, res) {

    try {
        const sql = 'SELECT * FROM tbl_class';
        const result = await query(sql);

        if (result.length === 0) {
            return res.status(404).send({ status: false, message: "No Class found" });
        }

        res.json(result);
        } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Error retrieving Classes" });
        }
}

const sectiondata = async function (req, res) {

    try {
        const sql = 'SELECT * FROM tbl_section';
        const result = await query(sql);

        if (result.length === 0) {
            return res.status(404).send({ status: false, message: "No sections found" });
        }

        res.json(result);
        } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Error retrieving sections" });
        }
}

const subjectdata = async function (req, res) {

    try {
        const sql = 'SELECT * FROM tbl_subject';
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

const teacherdata = async function (req, res) {

    try {
        const sql = 'SELECT * FROM tbl_teacher';
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

const studentdata = async function (req, res) {

    try {
        const sql = 'SELECT * FROM tbl_student';
        const result = await query(sql);

        if (result.length === 0) {
            return res.status(404).send({ status: false, message: "No student found" });
        }

        res.json(result);
        } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Error retrieving student" });
        }
}

module.exports = {classdata, sectiondata, subjectdata, teacherdata, studentdata};
