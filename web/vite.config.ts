import { defineConfig } from "vite";
import pugVite from "vite-plugin-pug";

const HOST = "127.0.0.1";
const PORT = 5600;

export default defineConfig({
	plugins: [pugVite()],
	// server:{
	//   proxy:{
	//     "^/api/.*":"http://localhost:3000",
	//   }
	// },
	server: {
		port: PORT,
		strictPort: true,
		host: HOST,
		hmr: {
			protocol: "ws",
			// host: HOST,
			port: PORT + 1,
		},
	},
	build: {
		// 打包输出到 dist 目录，server.js 会将此目录作为静态根目录
		outDir: "dist",
		emptyOutDir: true,
		// 入口文件
		rollupOptions: {
			input: "index.html", // 将根目录的 index.html 作为入口
		},
	},
});
