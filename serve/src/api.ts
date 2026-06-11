import type { IncomingMessage, ServerResponse } from "node:http";
import { addAccount } from "./db";

// function generateToken(username: string) {
// 	return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
// }

export function logInPost(req: IncomingMessage, res: ServerResponse) {
	let buffer = Buffer.alloc(0);
	req.on("data", (chunk) => {
		buffer = Buffer.concat([buffer, chunk]);
	});
	req.on("end", () => {
		try {
			const body = buffer.toString();
			const data = JSON.parse(body);
			// const username = data.username;
			// const password = data.password;
			// const user = users[username];
			// if (!user || user.password !== password) {
			// 	res.writeHead(401, { "content-type": "application/json" });
			// 	res.end(JSON.stringify({ error: "用户名或者密码错误" }));
			// }
			// const token = generateToken(username);
			// res.writeHead(200, { "content-type": "application/json" });
			// res.end(JSON.stringify({ access_token: token, token_type: "bearer" }));
			res.writeHead(200, { "content-type": "application/json" });
			res.end(
				JSON.stringify({
					message: "data recived",
					recived: data,
					methods: "POST",
				}),
			);
		} catch (e) {
			res.writeHead(404, { "content-type": "application/json" });
			res.end(JSON.stringify({ error: `无效请求体${e}` }));
		}
	});
}

export function handleGetData(req: IncomingMessage, res: ServerResponse) {
	const urlObj = new URL(`http://${process.env.HOST ?? "localhost"}${req.url}`);
	const name = urlObj.searchParams.get("name") || "world";

	res.writeHead(200, { "Content-type": "application/json" });
	res.end(JSON.stringify({ message: `Hello${name}`, method: "GET" }));
}

export function handlePostData(req: IncomingMessage, res: ServerResponse) {
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

export function addUser(req: IncomingMessage, res: ServerResponse) {
	let buffer = Buffer.alloc(0);
	req.on("data", (chunk) => {
		buffer = Buffer.concat([buffer, chunk]);
	});
	req.on("end", () => {
		try {
			const body = buffer.toString();
			const data = JSON.parse(body);
			const { username, password } = data;
			addAccount(username, password);
			res.writeHead(200, { "content-type": "application/json" });
			res.end(
				JSON.stringify({
					message: "Add succesfully",
				}),
			);
		} catch (e) {
			res.writeHead(400, { "content-type": "application/json" });
			res.end(JSON.stringify({ error: `Invalid JSON :${e}` }));
		}
	});
}

function parseBody(req: IncomingMessage): Promise<any> {
	return new Promise(() => {
		let buffer = Buffer.alloc(0);
		req.on("data", (chunk) => {
			buffer = Buffer.concat([buffer, chunk]);
		});
		req.on("end", () => {
			const body = buffer.toString();
			const data = JSON.stringify(body);
		});
	});
}
