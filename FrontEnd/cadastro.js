document.getElementById("formUser").addEventListener("submit", async (e) => {
      e.preventDefault();

      const body = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        cpf: document.getElementById("cpf").value,
        password: document.getElementById("password").value,
      };

      const res = await fetch("http://localhost:3000/user/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      document.getElementById("msg").innerText = data.message;

      if (res.status === 201) {
        // SALVA CPF PARA A PRÓXIMA PÁGINA
        localStorage.setItem("cpfUser", body.cpf);

        // REDIRECIONA PARA O CADASTRO 2
        window.location.href = "finalizar.html";
      }
    });