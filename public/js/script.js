function toggleAnswer(id) {
  var resposta = document.getElementById('resposta' + id);
  if (resposta.style.display === 'none') {
      resposta.style.display = 'block';
  } else {
      resposta.style.display = 'none';
  }
}
