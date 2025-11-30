const params = new URLSearchParams(window.location.search);
const cpf = params.get("cpf");

console.log("CPF recebido:", cpf);

document.getElementById("finalForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    cpf,
    rg: document.getElementById("rg").value,
    cnh: document.getElementById("cnh").value,
    bairro: document.getElementById("bairro").value,
    rua: document.getElementById("rua").value,
  };

  const response = await fetch("http://localhost:3000/user/finalizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    window.location.href = "options.html"; // vai para a terceira tela
  } else {
    alert("Erro ao finalizar cadastro");
  }
});
