import mysql from 'mysql2/promise';
// import env from '.env';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Budget_Database',
})

const test = async () => {
    const [rows] = await db.query("SELECT 1");
    console.log("DB Connected", rows);
};

export { test };
export default db;