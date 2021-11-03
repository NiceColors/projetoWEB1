let cpfElement = document.querySelector('#cpf')
let telElement = document.querySelector('#tel')

let nascimento = document.querySelector('#nascimento')
data = new Date()
let ano = data.getFullYear()
let mes = data.getMonth() + 1
let dia = data.getDate()

if (mes < 10) mes = '0' + mes
nascimento.setAttribute("max", `${ano}-${mes}-${dia}`)
nascimento.setAttribute("min", `${ano - 111}-${mes}-${dia + 1}`)


var temp = false // Temporizador
// 
const calc_digitos_posicoes = (digitos, posicoes = 10, soma_digitos = 0) => {

  // Garante que o valor é uma string
  digitos = digitos.toString();

  // Faz a soma dos dígitos com a posição
  // Ex. para 10 posições:
  //   0    2    5    4    6    2    8    8   4
  // x10   x9   x8   x7   x6   x5   x4   x3  x2  x1
  //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
  for (var i = 0; i < digitos.length; i++) {
    // Preenche a soma com o dígito vezes a posição
    soma_digitos = soma_digitos + (digitos[i] * posicoes);

    // Subtrai 1 da posição
    posicoes--;

  }

  // Captura o resto da divisão entre soma_digitos dividido por 11
  // Ex.: 196 % 11 = 9
  soma_digitos = soma_digitos % 11;

  // Verifica se soma_digitos é menor que 2
  if (soma_digitos < 2) {
    // soma_digitos agora será zero
    soma_digitos = 0;
  } else {
    // Se for maior que 2, o resultado é 11 menos soma_digitos
    // Ex.: 11 - 9 = 2
    // Nosso dígito procurado é 2
    soma_digitos = 11 - soma_digitos;
  }

  // Concatena mais um dígito aos primeiro nove dígitos
  // Ex.: 025462884 + 2 = 0254628842
  var cpf = digitos + soma_digitos;

  // Retorna
  return cpf;

} // calc_digitos_posicoes

const validaCPF = (valor) => {

  // Garante que o valor é uma string
  valor = valor.toString();

  // Remove caracteres inválidos do valor
  valor = valor.replace(/[^0-9]/g, '');
  if ([
    '00000000000',
    '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666',
    '77777777777', '88888888888', '99999999999'
  ].includes(valor)
  ) return false;

  // Captura os 9 primeiros dígitos do CPF
  // Ex.: 02546288423 = 025462884
  var digitos = valor.substr(0, 9);

  // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
  var novo_cpf = calc_digitos_posicoes(digitos);


  // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
  var novo_cpf = calc_digitos_posicoes(novo_cpf, 11);

  // Verifica se o novo CPF gerado é idêntico ao CPF enviado
  if (novo_cpf === valor) {
    // CPF válido
    return true;
  } else {
    // CPF inválido
    return false;
  }

}

const idadeUser = (data) => {

  let anoNasc = parseInt(nascimento.value.split('-')[0])
  let mesNasc = parseInt(nascimento.value.split('-')[1])
  let diaNasc = parseInt(nascimento.value.split('-')[2])

  var idade = ano - anoNasc;

  if (mes < mesNasc || (mes == mesNasc && dia < diaNasc)) {
    idade--;
  }
  console.log(idade);
  return idade


}



cpfElement.addEventListener('keypress', (e) => {

  for (const i in indexFormat = { 3: ".", 7: ".", 11: "-" }) {
    if (cpfElement.value.length == i) {
      cpfElement.value += indexFormat[i]
    }
  }

})
cpfElement.addEventListener('keydown', (e) => {
  // Limpa o temporizador
  if (temp) {
    clearTimeout(temp)
  }

  // Cria um timeout de meio segundo 
  temp = setTimeout(() => {

    cpfElement.classList.remove('valid')
    cpfElement.classList.remove('invalid')

    let cpfValidando = cpfElement.value

    // Validando
    let valida = validaCPF(cpfValidando)

    // Verificando se o CPF tá valid

    if (valida) {
      cpfElement.classList.add('valid')

    } else {
      cpfElement.classList.add('invalid')
    }






  }, 50);
})


// 
telElement.addEventListener('keypress', () => {

  let telElement = document.querySelector('#tel')
  let telValue = telElement.value
  if (telValue.length == 0) {
    telElement.value = '(' + telElement.value
  }
  if (telValue.length == 3) {
    telElement.value = telElement.value + ')' + " "
  }

  if (telValue.length == 9) {
    telElement.value = telElement.value + '-'
  }


})



const limpaForm = () => {
  fields.forEach(field => {
    const input = document.querySelector(`#${field}`);
    const errMsgs = document.querySelectorAll(".error-message");
    const inputs = document.querySelectorAll("input");
    const svgIcons = document.querySelectorAll(".icon");
    svgIcons.forEach((icon) => {
      icon.classList.add("hidden");
    });
    inputs.forEach((input) => {
      input.classList.remove('valid')
      input.classList.remove('input-error')
      input.value = "";
    });
    errMsgs.forEach((err) => {
      console.log(err.innerText = "");
    })

  })
}


class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }



  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;
    let invalidInputs = 7
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`);
        self.validateFields(input);
        if (input.classList.contains('valid')) {
          invalidInputs--
        }
      })
      if (invalidInputs == 0) {
        form.submit();
      }
      invalidInputs = 7
    })
  }



  validateOnEntry() {
    let self = this;
    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`);
      input.addEventListener('input', event => {
        self.validateFields(input);
      });
    });
  }


  validateFields(field) {

    if (field.value.trim() === "") {
      this.setStatus(field, `${field.previousElementSibling.innerText} não pode estar em branco`, "error");
      field.classList.remove('valid');
    } else {
      this.setStatus(field, null, "success");

    }
    if (field.value != "") {
      if (field.type === "email") {
        const re = /\S+@\S+\.\S+/;

        if (re.test(field.value)) {
          this.setStatus(field, null, "success");
          field.classList.add('valid');

        } else {
          this.setStatus(field, "Por favor digite um email valido", "error");
          field.classList.remove('valid');

        }
      }

      if (field.type === "tel") {
        const re = /[\(]\d{2}[\)][ ]\d{4}[\-]\d{4}/g;

        if (re.test(field.value.toString()) && field.value.length >= 11) {
          this.setStatus(field, null, "success");
          field.classList.add("valid");
        } else {
          this.setStatus(field, "Por favor digite um telefone valido: (21) 9999-99999", "error");
          field.classList.remove('valid');
        }
      }

      if (field.type === "date") {
        const re = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
        const idade = idadeUser()
        if (re.test(field.value) && idade <= 110 && idade >= 0) {
          this.setStatus(field, null, "success");
          field.classList.add("valid");
        } else {
          this.setStatus(field, "Por favor digite uma data valida", "error");
          field.classList.remove('valid');
        }
      }

      if (field.name === "cpf") {
        const re = /\d{3}\.\d{3}\.\d{3}-\d{2}/g;

        if (re.test(field.value.toString()) && validaCPF(field.value)) {
          field.classList.add('valid');
          this.setStatus(field, null, "success");
        } else {
          this.setStatus(field, "Por favor digite um CPF valido: (99) 9999-9999...", "error");
          field.classList.remove('valid');
        }
      }

      if (field.name == "nome") {
        const re = /[a-z\s]+$/g
        if (re.test(field.value) && field.value.length > 3) {
          this.setStatus(field, null, "success");
          field.classList.add('valid');
        } else {
          this.setStatus(field, "Por favor digite um nome valido", "error");
          field.classList.remove('valid');
        }
      }

      if (field.name == "senha") {
        if (field.value.length >= 5) {
          this.setStatus(field, null, "success");
          field.classList.add('valid');
        } else {
          this.setStatus(field, "Por favor digite uma senha com 5 ou mais caracteres", "error");
          field.classList.remove('valid');
        }
      }


      if (field.id === "senha2") {
        const passwordField = this.form.querySelector('#senha');

        if (field.value.trim() == "") {
          this.setStatus(field, "É necessário confirmar a senha", "error");
          passwordField.classList.remove('valid')
          field.classList.remove('valid');
          field.classList.add('valid');

        } else if (field.value != passwordField.value) {
          this.setStatus(field, "As senhas não batem", "error");
          passwordField.classList.remove('valid')
          field.classList.remove('valid');

        } else {
          this.setStatus(field, null, "success");
          passwordField.classList.add('valid')
          field.classList.add('valid');
        }
      }
    }


  }

  setStatus(field, message, status) {
    const successIcon = field.parentElement.querySelector('.icon-success');
    const errorIcon = field.parentElement.querySelector('.icon-error');
    const errorMessage = field.parentElement.querySelector('.error-message');

    if (status === "success") {
      if (errorIcon) {
        errorIcon.classList.add('hidden');
      }

      if (errorMessage) {
        errorMessage.innerText = "";
      }

      successIcon.classList.remove('hidden');
      field.classList.remove('input-error');
    }

    if (status === "error") {
      if (successIcon) {
        successIcon.classList.add('hidden');
      }

      field.parentElement.querySelector('.error-message').innerText = message;
      errorIcon.classList.remove('hidden');
      field.classList.add('input-error');
    }
  }

}

const form = document.querySelector('.form');
const fields = ["nome", "email", "nascimento", "cpf", "tel", "senha", "senha2"];
const validator = new FormValidator(form, fields);
submit = document.querySelector('.submit');
validator.initialize();
// form.submit()