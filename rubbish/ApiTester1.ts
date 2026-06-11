// import { css, html, LitElement } from "lit";
// import { customElement, state } from "lit/decorators.js";

// @customElement("api-tester")
// export class ApiTester extends LitElement {
// 	// 使用 @state 装饰器声明状态属性
// 	@state()
// 	private resultData = "";

// 	@state()
// 	private isLoading = false;

// 	static styles = css`
// 	@import  './ApiTester.styl;
//   `;

// 	private readonly API_BASE = "http://127.0.0.1:3000/api/data";

// 	constructor() {
// 		super();
// 		// 绑定方法（可选，Lit 通常会自动绑定，但显式绑定更安全）
// 		this.handleGet = this.handleGet.bind(this);
// 		this.handlePost = this.handlePost.bind(this);
// 	}

// 	private async handlePost() {
// 		this.isLoading = true;
// 		try {
// 			const postData = { name: "charlie", age: 28 };
// 			const response = await fetch(this.API_BASE, {
// 				method: "POST",
// 				headers: { "Content-Type": "application/json" }, // 修正拼写错误
// 				body: JSON.stringify(postData),
// 			});
// 			if (!response.ok) {
// 				throw new Error(`HTTP error! status: ${response.status}`);
// 			}
// 			const data = await response.json();
// 			this.resultData = data;
// 		} catch (e) {
// 			const message = e instanceof Error ? e.message : String(e);
// 			this.resultData = `错误：${message}`;
// 		} finally {
// 			this.isLoading = false;
// 		}
// 	}

// 	private async handleGet() {
// 		this.isLoading = true;
// 		try {
// 			const response = await fetch(this.API_BASE);
// 			if (!response.ok) {
// 				throw new Error(`HTTP error! status: ${response.status}`);
// 			}
// 			const data = await response.json();
// 			this.resultData = data;
// 		} catch (e) {
// 			const message = e instanceof Error ? e.message : String(e);
// 			this.resultData = `错误：${message}`;
// 		} finally {
// 			this.isLoading = false;
// 		}
// 	}

// 	render() {
// 		return html`
//       <div class="container">
//         <h2>API 测试器</h2>
//         <div class="buttons">
//           <button @click=${this.handleGet} ?disabled=${this.isLoading}>获取数据 (GET)</button>
//           <button @click=${this.handlePost} ?disabled=${this.isLoading}>发送数据 (POST)</button>
//         </div>
//         <div class="result">
//           ${
// 						this.resultData
// 							? html`<pre>${JSON.stringify(this.resultData, null, 2)}</pre>`
// 							: "点击按钮获取数据"
// 					}
//         </div>
//       </div>
//     `;
// 	}
// }
