import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "20130914",
	database: "Libaray_Project",
	waitForConnections: true,
	connectionLimit: 10,
});
