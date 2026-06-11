const getBtn = document.querySelector("#getBtn") as HTMLButtonElement;
const postBtn = document.querySelector("#postBtn") as HTMLButtonElement;
const resultDiv = document.querySelector("#result") as HTMLDivElement;

getBtn.addEventListener("click", () => {
	handleGet();
});

postBtn.addEventListener("click", () => {
	handlePost();
});

async function handleGet() {
	try {
		const response = await fetch("http://127.0.0.1:3000/api/data");
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		resultDiv.innerHTML = `${JSON.stringify(data)}`;
	} catch (e) {
		resultDiv.innerHTML = `未知错误${e}`;
	}
}

async function handlePost() {
	try {
		const postData = { name: "charlie", age: 28 };
		const response = await fetch("http://127.0.0.1:3000/api/data", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(postData),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		resultDiv.innerHTML = `${JSON.stringify(data)}`;
	} catch (e) {
		resultDiv.innerHTML = `未知错误${e}`;
	}
}
