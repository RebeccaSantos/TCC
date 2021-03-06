import axios from 'axios'

const api = axios.create (
   { baseURL : 'http://151.106.109.133:5000/Livro' }

    
);

export const ConsultarPorIdLivro = async (idlivro, idcliente) => {
    const response = await api.get("/" + idlivro + "/" + idcliente);
    return response;
}

export const ListarLivrosApi = async (posicao) => {
    const response = await api.get('/listar/' + posicao);
    return response;
}