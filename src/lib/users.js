import bcrypt from 'bcrypt';
import { db } from './database';

const saltRounds = 12;

export const saltPassword = (plainTextPassword) => bcrypt.hashSync(plainTextPassword, saltRounds);
export const comparePasswords = (plainTextPassword, hashedPassword) => bcrypt.compareSync(plainTextPassword, hashedPassword);

export const getCredentialMap = async () => {
    const results = await db.from('users');
    const map = {};

    results.forEach((res) => {
        map[res.username] = res.password
    });

    return map;
};
