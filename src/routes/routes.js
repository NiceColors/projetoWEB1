const express = require('express')
const bcrypt = require('bcryptjs')
const Cadastro = require('../models/Cadastro')
const userAuth = require('../middlewares/userAuth')
const { Op } = require('sequelize')

const validaDados = (nome, nascimento, cpf, tel, email, senha) => {
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

    const idadeIsValid = (nascimento) => {
        data = new Date()
        let ano = data.getFullYear()
        let mes = data.getMonth() + 1
        let dia = data.getDate()
        let anoNasc = parseInt(nascimento.split('-')[0])
        let mesNasc = parseInt(nascimento.split('-')[1])
        let diaNasc = parseInt(nascimento.split('-')[2])

        var idade = ano - anoNasc;

        if (mes < mesNasc || (mes == mesNasc && dia < diaNasc)) {
            idade--;
        }

        if (idade > 110 || idade < 0) return false

        return true


    }

    const nomeIsValid = (nome) => {
        if (nome.length < 3 || !isNaN(nome) || nome == undefined || nome == null) return false


        return true

    }

    const telefoneIsValid = (telefone) => {

        
        if (tel.length < 14 || tel.length>16 || !isNaN(tel) || tel == undefined || tel == null) {
            return false
        }

        
        return true
    }

    const senhaIsValid = (senha) => {
        if (senha.length < 5 || senha == null || senha == undefined) return false

        return true
    }

    const emailIsValid = (email) => {
        const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        if (re.test(email)) return true
        return false
    }

    if (
        nomeIsValid(nome) &&
        validaCPF(cpf) &&
        idadeIsValid(nascimento) &&
        telefoneIsValid(tel) &&
        senhaIsValid(senha) && emailIsValid(email)) {
        return true
    } else {
        return false
    }

}

const routes = express.Router()
let erros = false
let errosMsg = {
}


routes.get('/', (req, res) => {
    return res.redirect('/login') //renderizando a página de login

})

routes.get('/cadastro', (req, res) => {

    res.render('cadastro', {
        erros,
        errosMsg
    }) //renderizando a página de cadastro
    erros = false
})

routes.post('/cadastro', (req, res) => {
    const { nome, nascimento, cpf, tel, email, senha } = req.body; //Pega o body da página

    if (!validaDados(nome, nascimento, cpf, tel, email, senha)) return res.redirect('/cadastro');

    Cadastro.findOne({ where: { email: email } }).then(user => {


        if (user == undefined) {

            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(senha, salt);

            Cadastro.create({ nome, nascimento, cpf, tel, email, senha: hash }).then(() => {
                return res.redirect('/')
            }).catch((err) => {
                console.log(err);
            })
        } else {
            erros = true
            errosMsg.email = 'Email já cadastrado no sistema'
            return res.redirect('/cadastro')
        }



    })


});

routes.get('/login', (req, res) => {
    res.render('login', {
        erros,
        errosMsg
    })

    erros = false
})

routes.post('/authenticate', (req, res) => {
    const { id, email, senha } = req.body


    Cadastro.findOne({ where: { email: email } }).then(user => {
        if (user != undefined) { // se existe um user com tal email
            // valida senha
            const senhaCorreta = bcrypt.compareSync(senha, user.senha)

            if (senhaCorreta) {

                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                erros = false
                res.redirect(`/home/search?nomeDaPessoa=`);

            } else {
                erros = true
                errosMsg.emailLogin = ''
                errosMsg.senhaLogin = 'Senha incorreta'
                res.redirect('/login');
            }

        } else {
            erros = true
            errosMsg.senhaLogin = ''
            errosMsg.emailLogin = 'Email não existe no sistema'
            res.redirect('/login');
        }
    })
})

routes.get('/perfil/:id/', userAuth, async (req, res) => {
    const userId = req.session.user.id
    const dadosUsuario = await Cadastro.findOne({ where: { id: userId } });
    const dados = {
        nome: dadosUsuario.dataValues.nome,
        email: dadosUsuario.dataValues.email,
        cpf: dadosUsuario.dataValues.cpf,
        tel: dadosUsuario.dataValues.tel,
        nascimento: dadosUsuario.dataValues.nascimento,
    }
    res.render('perfil', {
        dados, userId, erros,
        errosMsg
    })

    erros = false



})

routes.get('/del-perfil/:id/', userAuth, (req, res) => {
    Cadastro.destroy({
        where: { id: req.session.user.id }
    }).then(function () {
        res.redirect('/')
    }).catch(function (err) {
        res.send("Não foi possível deletar a conta")
    })
});

routes.get('/home/', userAuth, (req, res) => {
    const dados = []
    const userId = req.session.user.id
    res.render('home', {
        dados, userId
    })
})

routes.get('/home/search', userAuth, async (req, res) => {
    const nome = req.query.nomeDaPessoa
    const userId = req.session.user.id
    const Cadastros = await Cadastro.findAll({
        attributes: ['nome', 'email', 'nascimento'],
        where: {
            nome: {
                [Op.like]: `${nome}%`
            }
        },
    });

    const dados = []

    Cadastros.forEach(element => {
        dados.push(element.dataValues)
    });
    if (dados.length > 0) {
        return res.render('home', {
            dados, userId
        });
    } else {
        return res.render('home', {
            dados: false,
            userId
        });
    }



})

routes.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/')
})

routes.put('/atualizarDados/:id', userAuth, async (req, res) => {
    const dado = req.body // {campo: valor} // dado[0] = valor

    let pessoa = await Cadastro.findOne({ where: { id: req.session.user.id } })
    for (const key in dado) {

        if (key == 'senha') {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(dado[key], salt);
            pessoa[key] = hash
        } if (key == 'email') {
            user = await Cadastro.findOne({ where: { email: dado.email } })
            if (user != null || user != undefined) {
                erros = true
                errosMsg.email = 'Email já cadastrado no sistema'
                pessoa[key] = req.session.user.email
            } else {
                erros = false
                pessoa[key] = dado[key]
            }
        } else {
            pessoa[key] = dado[key]
        }
    }

    await pessoa.save()
    return res.status(200).json({ message: "Tudo certo, você será redirecionado...! ╰(*°▽°*)╯", redirect: `/perfil/${req.session.user.id}/` });

})



module.exports = routes // Exportando as rotas para que o index possa acessa-las