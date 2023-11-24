"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.fetchOneMember = exports.updateMember = exports.registerMember = void 0;
const dbConfig_1 = require("../Configuration/dbConfig");
const registerMember = async (req, res) => {
    try {
        const { firstName, lastName, email, cohortNumber } = req.body;
        const emailRegex = /^[a-zA-Z0-9_.+-]+\.+[a-zA-Z0-9-]+@thejitu\.com$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }
        const result = await dbConfig_1.pool.request()
            .input('firstName', firstName)
            .input('lastName', lastName)
            .input('email', email)
            .input('cohortNumber', cohortNumber)
            .query('INSERT INTO members (firstName, lastName, email, cohortNumber) VALUES (@firstName, @lastName, @email, @cohortNumber)');
        res.status(201).json({ message: 'Member registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.registerMember = registerMember;
const updateMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        const { firstName, lastName, email, cohortNumber, } = req.body;
        const result = await dbConfig_1.pool.request()
            .input('id', memberId)
            .input('firstName', firstName)
            .input('lastName', lastName)
            .input('email', email)
            .input('cohortNumber', cohortNumber)
            .query('UPDATE members SET firstName = @firstName, lastName = @lastName, email = @email, cohortNumber = @cohortNumber WHERE id = @id');
        res.json({ message: 'Member updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateMember = updateMember;
const fetchOneMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        // Fetch member
        const result = await dbConfig_1.pool.request()
            .input('id', memberId)
            .query('SELECT * FROM members WHERE id = @id');
        const member = result.recordset[0];
        if (!member) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }
        res.json(member);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.fetchOneMember = fetchOneMember;
const deleteMember = async (req, res) => {
    try {
        const memberId = req.params.id;
        const result = await dbConfig_1.pool.request()
            .input('id', memberId)
            .query('DELETE FROM members WHERE id = @id');
        res.json({ message: 'Member deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteMember = deleteMember;
