import {
	createServer,
	type IncomingMessage,
	type ServerResponse,
} from "node:http";

// 测试 TS 类型推断

const CONFIG = {
	PORT: 3000,
	HOST: "127.0.0.1",
	indexFile: "index.html",
};

function handleGetData(req: IncomingMessage, res: ServerResponse) {
	const urlObj = new URL(`http://${process.env.HOST ?? "localhost"}${req.url}`);
	const name = urlObj.searchParams.get("name") || "world";

	res.writeHead(200, { "Content-type": "application/json" });
	res.end(JSON.stringify({ message: `Hello${name}`, method: "GET" }));
}

function handlePostData(req: IncomingMessage, res: ServerResponse) {
	let buffer = Buffer.alloc(0);
	req.on("data", (chunk) => {
		buffer = Buffer.concat([buffer, chunk]);
	});
	req.on("end", () => {
		try {
			const body = buffer.toString();
			const data = JSON.parse(body);
			res.writeHead(200, { "content-type": "application/json" });
			res.end(
				JSON.stringify({
					message: "data recived",
					recived: data,
					method: "POST",
				}),
			);
		} catch (e) {
			res.writeHead(400, { "content-type": "application/json" });
			res.end(JSON.stringify({ error: `Invalid JSON :${e}` }));
		}
	});
}

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
