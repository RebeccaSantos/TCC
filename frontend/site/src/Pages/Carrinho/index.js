import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Style
import { Pesquisa, ConteinerItens } from './style.js';

//Components
import Master from '../Master/index.js'

//Api 
import { ListarCarrinho, Remover } from '../../Service/carrinhoApi.js';


export default function Carrinho(props){
    const [ registros, setRegistros ] = useState([]);

    const [ valorlivros, setValorLivros ] = useState(0);
    const [ valorfrete, setValorFrete ] = useState(0);    
    const [ totalcompra, setTotalCompra ] = useState(0);

    const RemoverItem = async (id) => {
        await Remover(id);
        await ConsultarCarrinho(1);
    }
    
    const ConsultarCarrinho = async (id) => {

        const result = await ListarCarrinho(id);
        setRegistros([...result]);
        
        result.map(x => {
            setValorLivros((x.qtd * x.informacoes.venda) + valorlivros);
            setTotalCompra(x.informacoes.totalcompra + x.informacoes.valorlivros);
        });

        setTotalCompra(valorlivros + valorfrete);
    };

    useEffect(() => {  
        ConsultarCarrinho(1);
    }, []);

    return(
        <Master>
            <ConteinerItens>
                {registros.map((x, i) => 
                    <div className="card" Key={x.id}>
                        <div className="card-header">
                            {x.informacoes.nome}
                        </div>
                        <div className="container">
                            <img src="..." alt="..." className="img-thumbnail" />
                            <div className="card-body">
                                <h6 className="card-title">Resumo</h6>
                                <p className="card-text">{x.informacoes.descricao}</p>
                                <h6 className="card-title">Autor</h6>
                                <p className="card-text">{x.autores.nome}</p>
                                <h6 className="card-title">Editora</h6>
                                <p className="card-text">{x.informacoes.editora.nome}</p>
                                <h6 className="card-title">Data de Lancamento</h6>
                                <p className="card-text">{x.informacoes.lancamento}</p>
                            </div>
                        </div>
                        <div className="card-header">
                            <button className="btn btn-danger" onClick={() => RemoverItem(x.id)}>Remover</button>
                        </div>
                    </div>
                )}        
            </ConteinerItens>
            <Pesquisa>
                <div className="container">
                    <div className="form-group">
                        <label>Valor total dos livros: </label>
                        <span> {valorlivros} </span>
                    </div>
                    <div className="form-group">
                        <label>Valor do frete: </label>
                        <span> {300.45} </span>
                    </div>
                    <div className="form-group">
                        <label>Total da compra: </label>
                        <span> {totalcompra} </span>
                    </div>
                </div>

                <button id="btcompra" type="button" className="btn btn-success">COMPRAR</button>
            </Pesquisa>
        </Master>
    );
}