import axios from 'axios'

const api = axios.create(
    { baseURL : 'http://151.106.109.133:5000/Favoritos'}  

);

export const listarApi = async (idcliente) => {
    const response = await api.get('/' + idcliente);
    return response.data;
}

export const inserirFavoritoApi = async (request) => {
    const response = await api.post('/', request);
    return response;
}

export const removerFav  = async (id) => {
    return await api.delete('?idfavorito=' + id);
}