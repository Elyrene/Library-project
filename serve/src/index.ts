import {
	createServer,
	type IncomingMessage,
	type ServerResponse,
} from "node:http";
import { addUser, handleGetData, handlePostData, logInPost } from "./api";

// 测试 TS 类型推断
const CONFIG = {
	PORT: 3000,
	HOST: "127.0.0.1",
	indexFile: "index.html",
};

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
	const urlObj = new URL(`http://${process.env.HOST ?? "localhost"}${req.url}`);
	const urlPath = urlObj.pathname;
	const method = req.method;

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	if (method === "OPTIONS") {
		res.statusCode = 204;
		res.end();
	} else if (urlPath === "/api/data" && method === "GET") {
		handleGetData(req, res);
	} else if (urlPath === "/api/data" && method === "POST") {
		handlePostData(req, res);
	} else if (urlPath === "/api/token" && method === "POST") {
		logInPost(req, res);
	} else if (urlPath === "/api/addUser" && method === "POST") {
		addUser(req, res);
	} else if (urlPath === "/api/login" && method === "POST") {
		logInPost(req, res);
	} else {
		res.writeHead(400, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				error: "Bad Request",
				message:
					"The requested API endpoint does not exist or is not supported.",
				requestedPath: urlPath,
				requestedMethod: method,
			}),
		);
	}
});

server.listen(CONFIG.PORT, CONFIG.HOST, () => {
	console.log(`Server is running on http://${CONFIG.HOST}:${CONFIG.PORT}`);
});
