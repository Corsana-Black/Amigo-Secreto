let amigos = [];
let sorteados = {};

function adicionarAmigo() {
  let nome = document.getElementById("nome").value.trim();

  if (!/^[a-zA-Záéíóúãõâêîôûç ]+$/.test(nome) || nome.length === 0) {
    alert("Dados incorretos, por favor insira um nome válido.");
    return;
  }

  if (amigos.length >= 10) {
    alert("Número máximo de amigos atingido!");
    return;
  }

  amigos.push(nome);
  atualizarLista();
  document.getElementById("nome").value = "";

  let fala = new SpeechSynthesisUtterance(nome);
  fala.lang = "pt-BR";

  let voices = speechSynthesis.getVoices();
  fala.voice =
    voices.find((v) => v.lang === "pt-BR" && v.name.includes("Female")) ||
    voices[0];

  speechSynthesis.speak(fala);

  document.getElementById("sortear").disabled = amigos.length < 3;
}

function atualizarLista() {
  let lista = document.getElementById("listaAmigos");
  lista.innerHTML = "";
  amigos.forEach((amigo, index) => {
    console.log(amigos);
    let li = document.createElement("li");
    li.textContent = `${index + 1}. ${amigo}`;
    lista.appendChild(li);
  });
}

function sortearAmigo() {
  if (amigos.length < 3) {
    alert("Você precisa adicionar pelo menos 3 amigos!");
    return;
  }

  document.getElementById("numero").disabled = false;
  document.getElementById("sortear").disabled = true;
  document.getElementById("novoSorteioBtn").disabled = false;

  sorteados = {}; // Limpa o histórico de sorteios para um novo jogo
}

function mostrarSorteado() {
  let numero = document.getElementById("numero").value;

  if (numero < 1 || numero > amigos.length) {
    alert(`Número inválido! Escolha um entre 1 e ${amigos.length}`);
    return;
  }

  if (!sorteados[numero]) {
    sorteados[numero] = amigos[Math.floor(Math.random() * amigos.length)];
  }

  document.getElementById(
    "resultado"
  ).innerText = `Você tirou: ${sorteados[numero]}`;

  document.getElementById("numero").value = "";
}

function limparSorteio() {
  document.getElementById("resultado").innerText = "";
  document.getElementById("listaAmigos").innerHTML = "";
  document.getElementById("numero").value = "";
  document.getElementById("numero").disabled = true;
  document.getElementById("sortear").disabled = true;
  document.getElementById("novoSorteioBtn").disabled = true;

  amigos = [];
  sorteados = {}; // Limpa o histórico de sorteios
}

// Evento para acionar "Enter" nos inputs
document.getElementById("nome").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    adicionarAmigo();
  }
});

document
  .getElementById("numero")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      mostrarSorteado();
    }
  });
