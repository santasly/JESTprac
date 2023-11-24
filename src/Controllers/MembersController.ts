
import { Request, Response } from 'express';
import { pool } from '../Configuration/dbConfig'; 
import { Member } from '../interfaces/member';

export const registerMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, cohortNumber } = req.body as Member;

        const emailRegex = /^[a-zA-Z0-9_.+-]+\.+[a-zA-Z0-9-]+@thejitu\.com$/;
        if (!emailRegex.test(email)) {
            res.status(400).json({ error: 'Invalid email format' });
            return;
        }

        const result = await pool.request()
            .input('firstName', firstName)
            .input('lastName',  lastName)
            .input('email', email)
            .input('cohortNumber',  cohortNumber)
            .query('INSERT INTO members (firstName, lastName, email, cohortNumber) VALUES (@firstName, @lastName, @email, @cohortNumber)');

        res.status(201).json({ message: 'Member registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const memberId = req.params.id;
        const { firstName, lastName, email, cohortNumber,  } = req.body as Member;

        const result = await pool.request()
            .input('id', memberId)
            .input('firstName', firstName)
            .input('lastName', lastName)
            .input('email', email)
            .input('cohortNumber', cohortNumber)
            .query('UPDATE members SET firstName = @firstName, lastName = @lastName, email = @email, cohortNumber = @cohortNumber WHERE id = @id');

        res.json({ message: 'Member updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const fetchOneMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const memberId = req.params.id;

        // Fetch member
        const result = await pool.request()
            .input('id', memberId)
            .query('SELECT * FROM members WHERE id = @id');

        const member = result.recordset[0];
        if (!member) {
            res.status(404).json({ error: 'Member not found' });
            return;
        }

        res.json(member);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteMember = async (req: Request, res: Response): Promise<void> => {
    try {
        const memberId = req.params.id;

 
        const result = await pool.request()
            .input('id', memberId)
            .query('DELETE FROM members WHERE id = @id');

        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
