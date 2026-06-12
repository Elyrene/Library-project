import type { IncomingMessage, ServerResponse } from "node:http";
import { accountExists, addAccount, verifyUserPassword } from "./db";

// function generateToken(username: string) {
// 	return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
// }

export async function logInPost(req: IncomingMessage, res: ServerResponse) {
	try {
		const data = (await received(req)) as {
			username: string;
			password: string;
		};
		const { username, password } = data;
		if (!username || !password) {
			res.writeHead(400, { "content-type": "application/json" });
			res.end(JSON.stringify({ error: "用户名与密码不能为空" }));
		}
		if (!(await verifyUserPassword(username, password)))
			throw new Error("密码不正确");
		else {
			res.writeHead(200, { "content-type": "application/json" });
			res.end(JSON.stringify({ message: "密码正确，登录成功" }));
		}
	} catch (e) {
		res.writeHead(400, { "content-type": "application/json" });
		res.end(JSON.stringify({ error: `${e}` }));
	}
}

export function handleGetData(req: IncomingMessage, res: ServerResponse) {
	const urlObj = new URL(`http://${process.env.HOST ?? "localhost"}${req.url}`);
	const name = urlObj.searchParams.get("name") || "world";

	res.writeHead(200, { "Content-type": "application/json" });
	res.end(JSON.stringify({ message: `Hello${name}`, method: "GET" }));
}

export async function handlePostData(
	req: IncomingMessage,
	res: ServerResponse,
) {
	try {
		const data = await received(req);
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
}

export async function addUser(req: IncomingMessage, res: ServerResponse) {
	try {
		const data = (await received(req)) as {
			username: string;
			password: string;
		};
		const { username, password } = data;
		if (await accountExists(username)) {
			throw new Error("用户已经存在");
		}
		addAccount(username, password);
		res.writeHead(200, { "content-type": "application/json" });
		res.end(JSON.stringify({ message: "注册成功" }));
	} catch (e) {
		res.writeHead(400, { "content-type": "application/json" });
		res.end(JSON.stringify({ error: `${e}` }));
	}
}

function received(req: IncomingMessage) {
	return new Promise((resolve, reject) => {
		let buffer = Buffer.alloc(0);
		req.on("data", (chunk) => {
			buffer = Buffer.concat([buffer, chunk]);
		});
		req.on("end", () => {
			try {
				const body = buffer.toString();
				resolve(JSON.parse(body));
			} catch (e) {
				reject(e);
			}
		});
		req.on("error", reject);
	});
}
