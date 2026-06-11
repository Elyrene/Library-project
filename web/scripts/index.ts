interface LoginData {
	username: string;
	password: string;
}

const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const usernameInput = document.querySelector("#username") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;
// const submitBtn = document.querySelector("button") as HTMLButtonElement;
const outPutdiv = document.querySelector(".result") as HTMLDivElement;

loginForm.addEventListener("submit", async (e: Event): Promise<void> => {
	e.preventDefault();

	const userdata: LoginData = {
		username: usernameInput.value,
		password: passwordInput.value,
	};

	try {
		const response = await fetch("http://127.0.0.1:3000/api/addUser", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				username: userdata.username,
				password: userdata.password,
			}),
		});

		const data = await response.json();
		outPutdiv.innerHTML = `${JSON.stringify(data)}`;
	} catch (e) {
		outPutdiv.innerHTML = `未知错误:${e}`;
	}
	window.location.href = "/Apitester";
});
