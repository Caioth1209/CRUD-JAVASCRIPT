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
                        "<button type='button' onclick='pegarId("+i+")' class='btn btn-primary'>Editar</button>" +
                        "<button type='button' id='btExcluir' class='btn btn-danger'>Excluir</button>" +
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

    //funcao de cadastro
    $("#formularioCadastro").submit((event)=>{

        if (localStorage.getItem("cadastros") != null) {
            cadastros = JSON.parse(localStorage.getItem("cadastros"));
        }

        let nome = $("#nome").val().trim();

        let cpf = $("#cpf").val().trim();

        let email = $("#email").val().trim();        

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

            window.location.reload();

        } else {

            $("#msgExito").css({"display": "none"});
            $("#msgErro").css({"display": "block"});

            setTimeout(() => {

                $("#msgErro").css({"display": "none"});
                
            }, 5000);
        }

        $("#nome").val("");

        $("#cpf").val("");

        $("#email").val("");

        $("#emailConfirm").val("");

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

        let index = $("#id").val();
    
        let nome = $("#nome").val();
    
        let cpf = $("#cpf").val();
    
        let email = $("#email").val();
        
        if(localStorage.getItem("cadastros") != null){
            cadastros = JSON.parse(localStorage.getItem("cadastros"));
        }
        
        let isValid = true;
    
        for (i = 0; i < cadastros.length; i++){
    
            if (i != index) {
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
            $("#msgExito").css("display", "block");
    
            setTimeout(() => {
    
                $("#msgExito").css("display", "none");
                    
            }, 5000);
    
        } else {
    
            $("#msgExito").css("display", "none");
            $("#msgErro").css("display", "block");
    
            setTimeout(() => {
    
                $("#msgErro").css("display", "none");
                
            }, 5000);
            
        }

        event.preventDefault();
    })
    ////////////////////////////
    
    //exclui um usuario
    $("#btExcluir").click(()=>{

        let index = $("#id").val();
    
        if(localStorage.getItem("cadastros") != null){
            cadastros = JSON.parse(localStorage.getItem("cadastros"));
        }
        
        cadastros.splice(index, 1);
    
        localStorage.setItem("cadastros", JSON.stringify(cadastros));
    
        localStorage.setItem("apagado", "1");

        window.location.replace("index.html");

    })
    ////////////////////////////
})

function pegarId(id) {
    if (localStorage.getItem("cadastros") != null) {
        cadastros = JSON.parse(localStorage.getItem("cadastros"));
    }

    $("#formularioEditar").find(".mb-3 > #id").val(id);
    $("#formularioEditar").find(".mb-3 > #nome").val(cadastros[id].nome);
    $("#formularioEditar").find(".mb-3 > #cpf").val(cadastros[id].cpf);
    $("#formularioEditar").find(".mb-3 > .col-md-6 > #email").val(cadastros[id].email);

    $("#abrirModalEditar").click();
}

function mensagem() {
    if (localStorage.getItem("apagado") != null) {
        alert("oi")
        $("#msgExito").css({"display": "block"});

        setTimeout(() => {
            $("#msgExito").css({"display": "none"});
            localStorage.removeItem("apagado");
        }, 5000);
    }
}