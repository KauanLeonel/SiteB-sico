// PEGA CPF DA PRIMEIRA PÁGINA
    const cpfUser = localStorage.getItem("cpfUser");
    document.getElementById("cpf").value = cpfUser;

    document.getElementById("formFinalizar").addEventListener("submit", async (e) => {
      e.preventDefault();

      const body = {
        cpf: cpfUser,
        rg: document.getElementById("rg").value,
        cnh: document.getElementById("cnh").value,
        bairro: document.getElementById("bairro").value,
        rua: document.getElementById("rua").value
      };

      const res = await fetch("http://localhost:3000/user/user/finalizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      document.getElementById("msg").innerText = data.message;

      if (res.status === 201) {
        // REDIRECIONA PARA PÁGINA DE EXPORTAÇÃO
        window.location.href = "export.html";
      }
    });