import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "20130914",
	database: "library_db",
	waitForConnections: true,
	connectionLimit: 10,
});

//创建一个用户
export async function addAccount(username: string, password: string) {
	await pool.query(`
			INSERT INTO library_db.user (username, passworld)
			VALUE ('${username}','${password}');
		`);
}

//获取一个用户信息
export async function getUser(username: string) {
	return await pool.query(
		`
					SELECT id, password, email
					FROM account
					WHERE username = ${username}
				`,
	);
}
