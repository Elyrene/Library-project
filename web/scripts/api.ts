const outPutdiv = document.querySelector(".result") as HTMLDivElement;

export async function sigup(username: string, password: string) {
	try {
		const response = await fetch("http://127.0.0.1:3000/api/addUser", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});

		const data = await response.json();
		if (response.ok) {
			outPutdiv.innerHTML = `注册成功：${JSON.stringify(data)}`;
		} else {
			outPutdiv.innerHTML = `注册失败：${data.error || data.message || JSON.stringify(data)}`;
		}
	} catch (e) {
		outPutdiv.innerHTML = `网络或系统错误:${e}`;
	}
}

export async function login(username: string, password: string) {
	try {
		const response = await fetch("http://127.0.0.1:3000/api/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});
		const data = await response.json();
		if (response.ok) {
			outPutdiv.innerHTML = `登录成功：${JSON.stringify(data)}`;
		} else {
			outPutdiv.innerHTML = `登录失败：${data.error || data.message || JSON.stringify(data)}`;
		}
	} catch (e) {
		outPutdiv.innerHTML = `未知错误:${e}`;
	}
}
