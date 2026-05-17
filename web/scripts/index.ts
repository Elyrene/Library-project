const resultDiv = document.querySelector("#result");
const getBtn = document.querySelector("#getBtn");
const postBtn = document.querySelector("#postBtn");

getBtn?.addEventListener("click", async () => {
	try {
		const response = await fetch("http://127.0.0.1:3000/api/data");
		const data = await response.json();
		resultDiv!.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
	} catch (e) {
		resultDiv!.innerHTML = `错误${e}`;
	}
});

postBtn?.addEventListener("click", async () => {
	try {
		const postData = { name: "Charlie", age: 28 };
		const response = await fetch("http://127.0.0.1:3000/api/data", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(postData),
		});
		const data = await response.json();
		resultDiv!.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
	} catch (e) {
		resultDiv!.innerHTML = `错误${e}`;
	}
});
