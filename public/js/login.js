document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        const formData = new FormData(this);
        
        // Envia os dados para o servidor
        fetch('/login', {
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
                // Redireciona para a página inicial ou executa outras ações
                window.location.href = data.redirect;
            }
        })
        .catch(error => console.error('Erro:', error));
    });
});
