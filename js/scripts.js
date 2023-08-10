//criar classe para mapear todas as validações existentes
class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-equal',
            'data-password-validate',
            'data-min-length', 
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-only-numbers'
        ]
    }
    
    //iniciar a validação de todos os campos
    validate(form){

        //resgatar todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0){
            this.cleanValidations(currentValidations);
        }
    
        //pegar os inputs
        let inputs = form.getElementsByTagName('input');
    
        //transforma o que foi recebido acima, que é um HTML Collection em Array
        let inputsArray = [...inputs];
    
        //loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i ; i++){
    
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null)
                {
                    //limpando a string para virar um método
                    let method = this.validations[i].replace('data-','').replace('-','');
    
                    //valor do input
                    let value = input.getAttribute(this.validations[i]);
    
                    //invocar o metódo
                    this[method] (input,value);
                };
            };
        },this);
        };
    
        //verificar se o input tem um número mínimo de caracters
        minlength(input, minValue){
            let inputLength = input.value.length;
            let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
  
            if(inputLength < minValue){
                this.printMessage(input, errorMessage);
            }
            
        };

        //verifica se um input passou do limite de caracteres
        maxlength(input, maxValue){
            let inputLength = input.value.length;
            let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres.`;

            if(inputLength > maxValue){
                this.printMessage(input, errorMessage);
            }
        };

        //validar emails
        emailvalidate(input){
            let re = /\S+@\S+\.\S+/;
            let email = input.value;
            let errorMessage = 'Insira um e-mail no padrão exemplo@gmail.com';

            if(!re.test(email)){
                this.printMessage(input, errorMessage);
            };
        };

        //validar se os campos tem apenas letras
        onlyletters(input){
            //usando rejex (re de regular expressions)
            let re = /^[A-Za-z]+$/;

            let inputValue = input.value;
            let errorMessage = `Este campo não aceita números nem caracteres especiais.`

            if(!re.test(inputValue)){
                this.printMessage(input, errorMessage);
            };
        };

        //validar se os campos tem apenas números
        onlynumbers(input){
            //usando rejex (re de regular expressions)
            let re = /^[0-9]+$/;

            let inputValue = input.value;
            let errorMessage = `Este campo só aceita números.`

            if(!re.test(inputValue)){
                this.printMessage(input, errorMessage);
            };
        };

        //verifica se dois conteúdos do campo senha são iguais
        equal(input, inputName){
            let inputToCompare = document.getElementsByName(inputName)[0];

            let  errorMessage = `Este campo precisa estar igual ao ${inputName}`;
            
            if(input.value != inputToCompare.value){
                this.printMessage(input, errorMessage);
            };
        };
        //valida o campo de senha
        passwordvalidate(input){
            let charArr = input.value.split("");
            let uppercases = 0;
            let numbers = 0;

            for (let i=0; charArr.length > i; i++){
                if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                    uppercases++;
                }else if(!isNaN(parseInt(charArr[i]))){
                    numbers++;
                };
            };
            if(uppercases === 0 || numbers === 0){
                let errorMessage = `A senha precisa de pelo menos um caractere maiúsculo e um número.`;
                this.printMessage(input, errorMessage)
            };
        };
        //metodo para imprimir mensagens de erro na tela
        printMessage(input, msg){

        //quantidade de erros
        let errorQtd = input.parentNode.querySelector('.error-validation');
        
        if(errorQtd === null){
            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg;
            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);

        };
    }; 

    //verificar se o input é requerido (exigido)
    required(input){
        let inputValue = input.value;

        if(inputValue === ''){
            let errorMessage = `Este campo é de preenchimento obrigatório.`;
            this.printMessage(input, errorMessage);
        };
    };

    cleanValidations(validations){
        validations.forEach(el => el.remove())
    };
};

//pegar os dados do formulário e do botão
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

//iniciando o objeto Validator
let validator = new Validator();

//evento que vai disparar as validações 
submit.addEventListener('click', function(e){
    e.preventDefault();
    validator.validate(form);
});