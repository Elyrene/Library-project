import { login, sigup } from "./api";

interface LoginData {
	username: string;
	password: string;
}

// const loginForm = document.getElementById("loginForm") as HTMLFormElement;
const usernameInput = document.querySelector("#username") as HTMLInputElement;
const passwordInput = document.querySelector("#password") as HTMLInputElement;
const loginBtn = document.querySelector("#loginBtn") as HTMLButtonElement;
const registerBtn = document.querySelector("#registerBtn") as HTMLButtonElement;

registerBtn.addEventListener("click", async () => {
	const userdata: LoginData = {
		username: usernameInput.value,
		password: passwordInput.value,
	};

	sigup(userdata.username, userdata.password);
	// window.location.href = "/Apitester";
});

loginBtn.addEventListener("click", async () => {
	const userdata: LoginData = {
		username: usernameInput.value,
		password: passwordInput.value,
	};

	login(userdata.username, userdata.password);
});
