import express from 'express';
import routes from './routes';
import cors from 'cors';

// Todas as rotas e requisições irão partir do app
const app = express();

// Por padrão o express não entende JSON, então tenho que definir que no corpo da minha
// request eu irei enviar informação do tipo JSON, utilizando o código abaixo que converte
// para um objeto do Javascript
app.use(express.json());

app.use(routes);

// Permite que aplicações de diferentes endereços tenham acesso a esse api
app.use(cors());

// Rota é o endereço que eu quero acessar. A rota seguida pelo método get() abaixo
// é passada como primeiro parâmetro, e o que será executado é passado como segundo
// parâmetro. Quando a rota é acessada, é feito um request (geralmente feito pelo 
// frontend) e é devolvido uma response (geralmente é devolvido para o front um json)
// app.get('/', (request, response) => {
//     return response.json({ message: 'Hello World!' });
// });

// Método listen() faz a aplicação ouvir requisições http
// O parâmetro passado dentro de listen() é a porta. Todo site tem uma porta por onde
// as requisições irão "passar". A porta padrão é 80. A porta 3333 foi escolhida
// arbitráriamente.
app.listen(3333);