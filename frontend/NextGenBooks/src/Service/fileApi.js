import axios from 'axios'

const api = axios.create(
 { baseURL : 'http://151.106.109.133:5000/Arquivo' }
);

export const ListPostFile = async (inicio, fim, nome) => {
    const response = await axios.get(`http://151.106.109.133:5000/Arquivo/listar/postes-livros/v2?inicio=${inicio}&fim=${fim}&nome=${nome}`)
    return response;
}

export const BuscarFoto = (nome) => {
    const local = api.defaults.baseURL + ("?nome=" + nome);
    return local;
}