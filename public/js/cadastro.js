document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registroForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        const formData = new FormData(this);
        
        // Envia os dados para o servidor
        fetch('/registrar', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                // Exibe mensagens de erro
                const errorDiv = document.getElementById('alerta');
                errorDiv.innerHTML = data.error;
            } else {
                // Redireciona para a página de login ou executa outras ações
                window.location.href = data.redirect;
            }
        })
        .catch(error => console.error('Erro:', error));
    });
});



// Validação das senhas 
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('signUp').addEventListener('submit', async function(event) {
        event.preventDefault(); 
        const password = document.getElementById('password').value;
        const confirm_password = document.getElementById('confirm_password').value;
    
        if (password !== confirm_password) {
            document.getElementById('alerta').innerText = "As senhas não coincidem.";
            return false; 
        }
    
        this.submit();
    });
});


// Validação de termo e condições
document.addEventListener("DOMContentLoaded", function() {
    const checkbox = document.getElementById("termos_condicoes");
    const btnCadastrar = document.querySelector("button[type='button']");

    checkbox.addEventListener("change", function() {
      btnCadastrar.disabled = !this.checked;
    });
  }); 