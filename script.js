function cadastro(){
    const nome = document.querySelector('.nome').value
    const email = document.querySelector('.email').value

    if(nome.value.length == 0){
        nome.focus()
    } else if(email.value.length == 0){
        nome.focus()
    }
}

function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    document.getElementById('cidade').value = "";
    document.getElementById('uf').value = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        // Atualiza os campos com os valores.
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } else {
        // CEP não encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep != "") {
        // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {
            // Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            // Cria um elemento javascript.
            var script = document.createElement('script');

            // Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            // Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } else {
            // cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } else {
        // cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}
