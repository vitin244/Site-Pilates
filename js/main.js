// Smooth Scrolling
$("#navbar a, .btn").on("click", function (event) {
    if (this.hash !== "") {
        event.preventDefault();

        const hash = this.hash;

        $("html, body").animate(
            {
                scrollTop: $(hash).offset().top - 100
            },
            800
        );
    }
});

// Sticky menu background
window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
        document.querySelector("#navbar").style.opacity = 0.9;
    } else {
        document.querySelector("#navbar").style.opacity = 1;
    }
});

// Adicione este script ao final do documento HTML

// Definir um evento de envio para o formulário
document.querySelector("form").addEventListener("submit", function(event) {
    // Cancelar o comportamento padrão do formulário
    event.preventDefault();
  
    // Obter os dados do formulário
    const nome = document.querySelector("input[name='nome']").value;
    const email = document.querySelector("input[name='email']").value;
    const assunto = document.querySelector("input[name='assunto']").value;
    const mensagem = document.querySelector("textarea[name='mensagem']").value;
  
    // Enviar os dados do formulário para o servidor
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/enviar");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({
      nome,
      email,
      assunto,
      mensagem
    }));
  
    // Enviar uma mensagem de e-mail para o destinatário
    const emailDestinatario = "victorksantosaraujo@gmail.com";
    const assuntoEmail = "Nova mensagem do formulário";
    const mensagemEmail = `
      Nome: ${nome}
      E-mail: ${email}
      Assunto: ${assunto}
      Mensagem:
  
      ${mensagem}
    `;
  
    mail(emailDestinatario, assuntoEmail, mensagemEmail);
  
    // Exibir uma mensagem de sucesso
    const mensagemSucesso = document.querySelector(".mensagem-sucesso");
    mensagemSucesso.classList.remove("hidden");
  });
  
  // Função para enviar um e-mail
  function mail(destinatario, assunto, mensagem) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.mailtrap.io/v1/messages");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer YOUR_MAILTRAP_API_KEY");
    xhr.send(JSON.stringify({
      from: "contato@seusite.com.br",
      to: destinatario,
      subject: assunto,
      text: mensagem
    }));
  }
  