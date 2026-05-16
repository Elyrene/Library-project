// 引入 Node.js 内置的 http 模块，测试 @types/node 是否生效
import http from "node:http";

// 测试 TS 类型推断
const port: number = 3000;

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello, Full-Stack TypeScript!");
});

server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
