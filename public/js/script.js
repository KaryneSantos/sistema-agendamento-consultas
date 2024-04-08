function toggleAnswer(id) {
    var answer = document.getElementById('resposta' + id);
    var button = document.querySelector('.btn-pergunta:nth-child(' + id + ')');
    if (answer.style.display === 'none') {
      answer.style.display = 'block';
      button.textContent = '-';
    } else {
      answer.style.display = 'none';
      button.textContent = '+';
    }
  }