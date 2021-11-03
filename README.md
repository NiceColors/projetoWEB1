# Consiste em um pequeno sistema de cadastro de usuários com um CRUD simples e funcionalidades que seguem. 

## -Página Principal:
 consiste de um formulário para pesquisa na base de usuários usando o nome do usuário como filtro. Todos os nomes que tiverem os dados apresentados devem ser retornados. Por exemplo, se digitar “tiago”, todo “tiago” deve ser retornado independente do sobrenome. Se digitar “tiago frança”, devem aparecer apenas os “tiago frança”. Nesse caso, apresente: nome, e-mail e idade do usuário. Se não retornar ninguém, apresente uma mensagem: “nenhum usuário encontrado com esse nome”. Nessa mesma página deve existir uma opção para sair e outra para “Editar Perfil”.

------
## - Login:  
Uma página de tela de login onde deve ser possível se autenticar fornecendo usuário e senha. Nessa tela também deve ser possível ser dirigido para uma tela de cadastro (use um link para isso). Ainda sobre a página de login, considere que o usuário deve usar seu e-mail e senha para se autenticar (a senha não pode aparecer na URL do navegador em nenhum momento). Se o usuário fornecer dados inválidos (login ou senha), apresente uma mensagem de erro.

------
## - Cadastro: 
na página de cadastro, será necessário exigir alguns campos obrigatórios: nome, e-mail(que será usado no login), CPF, telefone e senha (com no mínimo 5 dígitos). Também seránecessário validar estes campos: CPF (se válido), e-mail (se fornecido corretamente), senha e confirmação de senha, defina um tamanho mínimo para o nome do usuário, peça a data de nascimento (não pode nascer antes da data atual e usuário mais velho possível de ser criado tem que ter 110 anos), e cobre um número de telefone com DDD e valide se ele é um número válido (quantidade de caracteres). Também deve ser possível limpar toda página clicando apenas em um botão. Ao salvar os dados de cadastro: (1) verifique se os campos estão corretamente preenchidos e se os campos obrigatórios foram preenchidos; e (2) verifique se o e-mail não foi salvo previamente no sistema. Se ocorrer algum erro, apresente uma mensagem adequada:

Preenchimento incompleto, campo obrigatório, campo preenchido de forma errada, e-mail já cadastrado no sistema, etc. Após a validação, se o cadastro ocorrer, direcione o usuário para a tela de login.

------


## - Editar Perfil:
nesta página devem ser apresentados os dados do usuário logado. Ele deve ser capaz de atualizar seus dados (ou seja, tudo deve ser editável). Ele deve ser capaz de salvar as alterações, contudo, todos os campos devem ser validados da mesma forma que foram validados durante o cadastro. Após validar tudo, as alterações devem ser salvas e o usuário deve ser direcionada para a “Página Principal”. Ainda na página Editar Perfil, deve existir um link para sair do sistema. Também deve existir a opção “excluir conta”. Ao excluir conta os dados do usuário devem ser apagados do banco, ele deve ser direcionado a página principal e, assim como quando clica em sair, a sessão deve ser encerrada.

------
## - Ao clicar em sair
O usuário deve ser direcionado para página principal e sua sessão deve ser encerrada.

------
## -As páginas “Página Principal” e “Editar Perfil”

só podem ser acessadas por usuários com uma sessão ativa no servidor. Essa sessão só pode estar ativa se ele previamente tiver feito login.
Caso um usuário tente acessar tais páginas sem uma sessão ativa, ele deve ser direcionado para página de login.

------
### Requisitos não funcionais:
- MySQL (ou MariaDB).
- Crie um banco chamado “web1” e uma tabela chamada “usuário”.
- Valide os dados com javascript.
- Mesmo validando com javascript, valide também no servidor com o Node.js.


# Links

Figma - https://www.figma.com/file/9FzGEMdfizoCjEK3a83o1L/Github-Explorer-Copy?node-id=0%3A1

Whimscal - https://whimsical.com/my-boards-FfbmRk2bPV9aDfo3gy4yo7