import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

@customElement("login-component")
export class LoginComponent extends LitElement {
	// 表单状态
	@state()
	private resultData = "";

	@state()
	private username = "";

	@state()
	private password = "";

	@state()
	private isLoading = false;

	@state()
	private error = "";

	static styles = css`
    .container {
      font-family: Arial, sans-serif;
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      text-align: center;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.5rem;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .error {
      color: red;
      margin-top: 1rem;
    }
    .result {
      white-space: pre-wrap;
      background-color: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
      min-height: 100px;
    }
  `;

	// 提交表单（适配后端接口）
	private async handleSubmit(e: Event) {
		e.preventDefault();
		this.isLoading = true;
		this.error = "";

		try {
			// 后端接口 URL（根据实际情况调整，如 FastAPI 的 /token 或 Node.js 的 /api/token）
			const response = await fetch("http://127.0.0.1:3000/api/addUser", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: this.username,
					password: this.password,
				}),
			});

			const data = await response.json();
			this.resultData = data;
			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.detail || data.error || "操作失败");
			}

			// const { access_token } = await response.json();
			// // 存储 Token（生产环境建议用 HttpOnly Cookie，避免 XSS 攻击）
			// localStorage.setItem("authToken", access_token);

			// // 通知应用登录成功（可选：触发自定义事件）
			// this.dispatchEvent(new CustomEvent("login-success"));

			// // 跳转页面（需配合路由库，如 lit-route）
			// window.location.href = "/Apitester";
		} catch (e) {
			this.error = e instanceof Error ? e.message : "未知错误";
		} finally {
			this.isLoading = false;
		}
	}

	render() {
		return html`
      <div class="container">
        <h2>数据库测试</h2>
        <form @submit=${this.handleSubmit}>
          <div class="form-group">
            <label for="username">用户名</label>
            <input
              id="username"
              type="text"
              .value=${this.username}
              @input=${(e: Event) => (this.username = (e.target as HTMLInputElement).value)}
              required
            />
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input
              id="password"
              type="password"
              .value=${this.password}
              @input=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
              required
            />
          </div>
          <button type="submit" ?disabled=${this.isLoading}>
            ${this.isLoading ? "登录中..." : "登录"}
          </button>
          ${this.error ? html`<div class="error">${this.error}</div>` : ""}
        </form>
                <div class="result">
          ${
						this.resultData
							? html`<pre>${JSON.stringify(this.resultData, null, 2)}</pre>`
							: "暂无数据"
					}
        </div>
      </div>
    `;
	}
}
