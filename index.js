import express from 'express';
import { parse } from 'path';

const porta = 3000;
const host = '0.0.0.0';
const app = express();

var listaUsuario = [];

app.use(express.static(path.join(process.cwd(), 'publico')));

app.use('/cadastrarAlunos', (req,resp) => {
    const nome = req.query.nome;
    const instituicao = req.query.instituicao;
    const curso = req.query.curso;
    const email = req.query.email;
    const telefone = req.query.telefone;

    listaUsuario.push({     
        nome: nome,
        instituicao: instituicao,
        curso: curso,
        email: email,
        telefone: telefone
    });

    resp.write("<!DOCTYPE html>");
    resp.write("<html lang='en'>");
    resp.write("<head>");
    resp.write("    <meta charset='UTF-8'>");
    resp.write("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    resp.write("    <title></title>");
    resp.write("</head>");
    resp.write("<body>");
    resp.write(`<h1 style="font-family: sans-serif;">${nome} foi cadastrado com sucesso!<h1><br>`);
    resp.write('<a href="/listarUsuarios" style="font-family: sans-serif;">Listar alunos</a><br>');
    resp.write('<a href="cadastro.html" style="font-family: sans-serif;">Cadastrar mais alunos</a>');
    resp.write("</body>");
    resp.write('</html>');
    resp.end();
});

app.use('/listarUsuarios', (req,resp) => {
    resp.write("<!DOCTYPE html>");
    resp.write("<html lang='en'>");
    resp.write("<head>");
    resp.write("    <meta charset='UTF-8'>");
    resp.write('<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">');
    resp.write("    <meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    resp.write("    <title>Alunos cadastrados</title>");
    resp.write("</head>");
    resp.write("<body>");
    resp.write("<table class='table table-dark table-striped m-5 w-50'>");
    resp.write('<tr>');
    resp.write('<th>Nome</th>');
    resp.write('<th>Instituição</th>');
    resp.write('<th>Email</th>');
    resp.write('<th>Telefone</th>');
    resp.write('<th>Nome</th>');
    resp.write('<th><a href="/cadastro.html" style="color: green;text-decoration: none;">Cadastrar Aluno</a></th>');
    resp.write('</tr>');

    for(let i=0;i<listaUsuario.length;i++)
    {
        resp.write('<tr>');
        resp.write(`<td>${listaUsuario[i].nome}</td>`);
        resp.write(`<td>${listaUsuario[i].instituicao}</td>`);
        resp.write(`<td>${listaUsuario[i].curso}</td>`);
        resp.write(`<td>${listaUsuario[i].email}</td>`);
        resp.write(`<td>${listaUsuario[i].telefone}</td>`);
        resp.write('</tr>');
    }
    resp.write('</table>');
    resp.write("</body>");
    resp.write('<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>');
    resp.write("</html>");
    resp.end();
    
});

app.listen(porta, host, () => {
    console.log(`Servidor iniciado em http://${host}:${porta}`);
})