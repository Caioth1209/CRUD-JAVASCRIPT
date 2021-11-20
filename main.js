class Pessoa{
    nome;
    cpf;
    email;

    constructor(nome, cpf, email){
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
    }
}

let cadastros = [];

$(document).ready(() => {

    //funcao de cadastro
    $("#formularioCadastro").submit((event)=>{

        if (localStorage.getItem("cadastros") != null) {
            cadastros = JSON.parse(localStorage.getItem("cadastros"));
        }

        let nome = $("#formularioCadastro").find(".mb-3 > #nome").val();
    
        let cpf = $("#formularioCadastro").find(".mb-3 > #cpf").val();
    
        let email = $("#formularioCadastro").find(".mb-3 > .col-md-6 > #email").val();      

        let isValid = true;

        for(i = 0; i < cadastros.length; i++){

            if (cpf === cadastros[i].cpf || email === cadastros[i].email) {
                isValid = false;
                break;
            }
        }

        if (isValid) {
            
            let pessoa = new Pessoa(nome, cpf, email);

            cadastros.push(pessoa);

            localStorage.setItem("cadastros", JSON.stringify(cadastros));

            $(".btn-close").click();

            localStorage.setItem("cadastrado", "1");

            imprimeDados();

        } else {

            $("#msgErro").css({"display": "block"});

            setTimeout(() => {

                $("#msgErro").css({"display": "none"});
                
            }, 5000);
        }

        $("#formularioCadastro").find(".mb-3 > #nome").val("");
    
        $("#formularioCadastro").find(".mb-3 > #cpf").val("");
    
        $("#formularioCadastro").find(".mb-3 > .col-md-6 > #email").val("");   

        $("#formularioCadastro").find(".mb-3 > .col-md-6 > #emailConfirm").val("");   

        event.preventDefault();
    })

    // tratando nome
    $("#nome").change(()=>{

        let nome = $("#nome");

        if (nome.val().trim().length < 4) {
            $("#erroNome").css({
                "display": "block"
            })

            nome.val("");

        } else {

            // nao pode conter letras
            let regex = /[^A-Za-z ]/;
            
            if (regex.test(nome.val().trim())) {

                $("#erroNome").css({
                    "display": "block"
                })
    
                nome.val("");

            } else {

                $("#erroNome").css({
                    "display": "none"
                })

            }
        }
    })
    ////////////////////////////

    // tratando cpf
    $("#cpf").change(()=>{

        let cpf = $("#cpf");

        let regex = /\d{3}\.\d{3}\.\d{3}\-\d{2}$/;

        if (!regex.test(cpf.val().trim())) {

            $("#erroCpf").css({
                "display": "block"
            })

            cpf.val("");

        } else {

            $("#erroCpf").css({
                "display": "none"
            })

        }
    })
    ////////////////////////////

    // tratando email
    $("#email").change(() =>{

        let email = $("#email");

        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regex.test(email.val().trim())) {

            $("#erroEmail").css({
                "display": "block"
            })

            email.val("");

        } else {

            $("#erroEmail").css({
                "display": "none"
            })

        }
    })
    ////////////////////////////

    // tratando confirmação de email
    $("#emailConfirm").change(() =>{

        let email = $("#email");
        let emailConfirm = $("#emailConfirm");

        if (emailConfirm.val().trim() !== email.val().trim()) {

            $("#erroEmailConfirm").css({
                "display": "block"
            })

            emailConfirm.val("");

        } else {

            $("#erroEmailConfirm").css({
                "display": "none"
            })

        }

    })
    ////////////////////////////

    //edita o usuario
    $("#formularioEditar").submit((event)=>{

        let index = $("#formularioEditar").find("#id").val();
    
        let nome = $("#formularioEditar").find(".mb-3 > #nome").val();
    
        let cpf = $("#formularioEditar").find(".mb-3 > #cpf").val();
    
        let email = $("#formularioEditar").find(".mb-3 > .col-md-6 > #email").val();      
        
        if(localStorage.getItem("cadastros") != null){
            cadastros = JSON.parse(localStorage.getItem("cadastros"));
        }
        
        let isValid = true;
    
        for (i = 0; i < cadastros.length; i++){
    
            if(i != index){
                if ((cpf == cadastros[i].cpf || email == cadastros[i].email)) {
                    isValid = false;
                }
            }
        }
    
        if(isValid){
    
            let pessoa = new Pessoa(nome,cpf,email);

            cadastros[index] = pessoa;

            localStorage.setItem("cadastros", JSON.stringify(cadastros));
        
            $("#msgErro").css("display", "none");
            $("#msgEditado").css("display", "block");
    
            setTimeout(() => {
    
                $("#msgEditado").css("display", "none");
                    
            }, 5000);
    
        } else {
    
            $("#msgEditado").css("display", "none");
            $("#msgErro").css("display", "block");
    
            setTimeout(() => {
    
                $("#msgErro").css("display", "none");
                
            }, 5000);
            
        }

        event.preventDefault();
    })
    ////////////////////////////


    //botao close do modal
    $(".btn-close").click(()=>{
        imprimeDados();
    })
    ////////////////////////////

    //exclui uma pessoa
    $("#excluirPessoa").click(() => {
        if(localStorage.getItem("cadastros") != null){
            cadastros = JSON.parse(localStorage.getItem("cadastros"));
        }        

        let id = $("#formularioExcluir").find("#id").val();

        cadastros.splice(id, 1);

        localStorage.setItem("cadastros", JSON.stringify(cadastros));

        localStorage.setItem("apagado", "1");

        $(".btn-close").click();
    })
    ////////////////////////////
})

function imprimeDados() {

    if (localStorage.getItem("cadastros") != null) {
        cadastros = JSON.parse(localStorage.getItem("cadastros"));
    }

    let texto = "";

    for (i = 0; i < cadastros.length; i++) {

        texto += "<tr>" +
                    "<td>" + cadastros[i].nome + "</td>" +
                    "<td>" + cadastros[i].cpf + "</td>" +
                    "<td>" + cadastros[i].email + "</td>" +
                    "<td>" +
                        "<button type='button' onclick='pegarIdEditar("+i+")' class='btn btn-primary'>Editar</button>" +
                        "<button type='button' onclick='pegarIdExcluir("+i+")' class='btn btn-danger'>Excluir</button>" +
                    "</td>" +
                "</tr>";
    }

    if (texto == "") {
        $("#colunas").html(
            "<tr>" +
                "<td colspan='5' class='text-danger'> Nenhum usuário cadastrado até o momento </tr>" +
            "</tr>"
        );
    } else {
        $("#colunas").html(texto);
    }

    if (localStorage.getItem("apagado") != null) {

        $("#msgCadastrado").css("display", "none");
        $("#msgExcluido").css("display", "block");
    
        setTimeout(() => {
            $("#msgExcluido").css("display", "none"); 
            localStorage.removeItem("apagado");
        }, 5000);    

    } else {
        if (localStorage.getItem("cadastrado") != null) {

            $("#msgExcluido").css("display", "none");
            $("#msgCadastrado").css("display", "block");

            setTimeout(() => {
                $("#msgCadastrado").css("display", "none"); 
                localStorage.removeItem("cadastrado");
            }, 5000); 

        }
    }
}

// funcao usada para levar o id ate o formulario de edição
function pegarIdEditar(id) {

    if (localStorage.getItem("cadastros") != null) {
        cadastros = JSON.parse(localStorage.getItem("cadastros"));
    }

    $("#formularioEditar").find("#id").val(id);
    $("#formularioEditar").find(".mb-3 > #nome").val(cadastros[id].nome);
    $("#formularioEditar").find(".mb-3 > #cpf").val(cadastros[id].cpf);
    $("#formularioEditar").find(".mb-3 > .col-md-6 > #email").val(cadastros[id].email);

    $("#abrirModalEditar").click();

}
////////////////////////////

// funcao usada para levar o id ate o modal de exclusao
function pegarIdExcluir(id) {

    $("#formularioExcluir").find("#id").val(id);

    $("#abrirModalExcluir").click(); 

}
////////////////////////////  