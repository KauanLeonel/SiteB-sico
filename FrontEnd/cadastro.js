const form = document.getElementById('signupForm');
    const msgArea = document.getElementById('messageArea');
    const toggleBtn = document.getElementById('togglePwd');
    const passwordInput = document.getElementById('password');

    // Toggle visibilidade da senha
    toggleBtn.addEventListener('click', () => {
      const t = passwordInput.type === 'password' ? 'text' : 'password';
      passwordInput.type = t;
      toggleBtn.textContent = t === 'password' ? 'mostrar' : 'ocultar';
    });

    // Função helper para mostrar mensagens
    function showMessage(text, type = 'error') {
      msgArea.innerHTML = '';
      const div = document.createElement('div');
      div.className = 'msg ' + (type === 'success' ? 'success' : 'error');
      div.textContent = text;
      msgArea.appendChild(div);
    }

    // Validação simples do CPF (apenas formato / todos dígitos não iguais)
    function isValidCpfRaw(cpf) {
      if (!cpf) return false;
      const cleaned = cpf.replace(/\D/g, '');
      if (cleaned.length !== 11) return false;
      // rejeita sequências iguais (11111111111 ...)
      if (/^(\d)\1+$/.test(cleaned)) return false;
      return true;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msgArea.innerHTML = '';

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const cpf = form.cpf.value.replace(/\D/g, '').trim();
      const password = form.password.value;
      const terms = document.getElementById('terms').checked;

      // validações cliente
      if (name.length < 3) return showMessage('Nome deve ter pelo menos 3 caracteres.');
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) return showMessage('Email inválido.');
      if (!isValidCpfRaw(cpf)) return showMessage('CPF inválido. Use apenas números (11 dígitos) e não sequências repetidas.');
      if (password.length < 8) return showMessage('Senha deve ter no mínimo 8 caracteres.');
      if (!terms) return showMessage('Você precisa aceitar os termos.');

      // construir payload
      const payload = { name, email, cpf, password };

      // endpoint: edite aqui se seu servidor estiver em outra porta/host
      const endpoint = 'http://localhost:3000/user';

      try {
        // desabilitar botão enquanto espera
        const btn = document.getElementById('submitBtn');
        btn.disabled = true;
        btn.textContent = 'Enviando...';

        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const body = await resp.json().catch(()=>null);

        if (resp.ok) {
                window.location.href = `cadastroII.html?cpf=${cpf}`;

        } else {
          // tenta extrair mensagens de erro comuns do Prisma/Zod
          if (body && body.errors) {
            // Zod flatten fieldErrors ou similar
            if (Array.isArray(body.errors)) {
              showMessage(body.errors.map(x => (x.message || JSON.stringify(x))).join(' — '));
            } else if (typeof body.errors === 'object') {
              // fieldErrors structure
              const msgs = [];
              for (const k in body.errors) {
                const val = body.errors[k];
                if (Array.isArray(val)) msgs.push(...val);
                else msgs.push(String(val));
              }
              showMessage(msgs.join(' — '));
            } else {
              showMessage(JSON.stringify(body.errors));
            }
          } else if (body && body.message) {
            showMessage(body.message);
          } else {
            showMessage('Erro ao criar usuário. Código: ' + resp.status);
          }
        }
      } catch (err) {
        showMessage('Erro de rede: ' + err.message);
      } finally {
        const btn = document.getElementById('submitBtn');
        btn.disabled = false;
        btn.textContent = 'Cadastrar';
      }
    });