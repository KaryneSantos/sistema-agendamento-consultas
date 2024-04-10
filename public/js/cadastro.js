
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