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
			INSERT INTO library_db.user (username, password)
			VALUE ('${username}','${password}');
		`);
}

//获取一个用户信息
export async function accountExists(username: string): Promise<boolean> {
	// 1. 使用 ? 占位符防止 SQL 注入
	// 2. 只查询 1，不需要获取 id 和 password，提升性能
	// 3. 加上 LIMIT 1，找到一条记录后立刻停止扫描
	// 4. 使用反引号包裹 `user`，因为 user 是 MySQL 的保留字
	const sql = "SELECT 1 FROM `user` WHERE username = ? LIMIT 1";

	// 传入参数数组，数据库驱动会自动进行安全转义
	const [rows] = await pool.query(sql, [username]);

	// 判断结果集长度
	return (rows as any[]).length > 0;
}

export async function verifyUserPassword(
	username: string,
	plainTextPassword: string, // 用户输入的明文密码
): Promise<boolean> {
	const sql = "SELECT password FROM `user` WHERE username = ? LIMIT 1";
	const [rows] = await pool.query(sql, [username]);
	const users = rows as any[];
	if (users.length === 0) {
		return false;
	}

	const storedHash = users[0].password;

	if (storedHash !== plainTextPassword) {
		return false;
	} else return true;
}
