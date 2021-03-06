import React, { useState, useEffect } from "react";
import Master from "../../Master"
import { CaixaFinalizarCompra } from "./style.js";
import nextGenBookAPI from "../../../Service/NextGenBookApi";
import { ToastContainer, toast } from "react-toastify";
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

import InputMask from "react-input-mask";
import MaterialInput from '@material-ui/core/Input';

import {calcularFrete} from '../../../Service/ApiCorreio';

const api = new nextGenBookAPI();
export default function FinalizarCompra(props) {

    const [nCdServico,setnCdServico] = useState("04014");
    const [sCepOrigem,setsCepOrigem] = useState("04458110");
    const [nCdFormato,setnCdFormato] = useState("1");
  
    const [nVlDiametro,setnVlDiametro] = useState("0");

    const navegacao = useHistory();

    const [registros, setRegistros] = useState([...props.location.state]);
    const idCliente = Number(Cookies.get('id'));
    const [enderecoId, setEnderecoId] = useState();
    const [enderecoEscolhido, setEnderecoEscolhido] = useState("");
    const [listaDeEndereco, setListaDeEndereco] = useState([]);
    const [tipoDePagamento, setTipoPagamento] = useState("Dinheiro");
    const [numeroParcela, setNumeroParcela] = useState(0);
    const [valorPorParcela, setValorPorParcela] = useState(1);
    const [valorfrete, setValorFrete] = useState(0);
    const [valorlivros, setValorLivros] = useState(0);
    const [totalcompra, setTotalCompra] = useState(0);

    //Pagar varialvel antes de adicionar no useState
    const listarEndereco = async () => {
        try {
            const resp = await api.listarEndereco(idCliente);
            if(resp.data == null || resp.data === undefined) {
                toast.erro("Endereço não encontrados.");
                navegacao.push('/Perfil');
            }
            else {
                setListaDeEndereco([...resp.data]);
                const itemfirst = resp.data.find(x => x.id > 0)

                setEnderecoId(itemfirst.id);
            }
        }
        catch (ex) {
            toast.error(ex.response.data.erro);
        }
    }

    const CalcularFrete = async () => {
        try {
            const enderecocep = listaDeEndereco.filter(x => x.id === enderecoId)[0];
            let cep = enderecocep.cep;
            let peso = 0;
            let comprimento = 200;
            let altura = 0;
            let largura = 0;
            let total = 0;
            registros.map(x => {
                comprimento = 1;
                altura = x.informacoes.medida.altura;
                largura = x.informacoes.medida.largura;
                peso = x.informacoes.medida.peso;
                

                
            });

            let resp = await calcularFrete(nCdServico, sCepOrigem, cep,"0."+peso, nCdFormato,16,16,16, nVlDiametro);
            console.log(resp);
            setValorFrete(resp[0].Valor);
  
        }
        catch (ex) {

        } 
        
    }


    const calcular = () => {
        let result = 0;
        let valor = [];
        for (var x of registros) {
            
            valor.push(x.qtd * x.informacoes.venda);
        }

        for (var y of valor) {
            result += y;
        }
        setValorLivros(result);
        setTotalCompra(result + registros.length);
    }

    const realizarCompra = async () => {
        let livros = [];
        registros.map(x => {
            livros.push({
                IdLivro: x.informacoes.id,
                NumeroLivro: x.qtd,
                VendaLivro: x.informacoes.venda,
            })
        })

        try 
        {
            if (numeroParcela > 10)
                toast.error("Não é possivel realizar está operação.")
            else {
                let request = {
                    idCliente: idCliente,
                    idendereco: enderecoId,
                    tipoDePagamento,
                    numeroParcela,
                    valorfrete,
                    livros
                }
    
                const resp = await api.realizarVenda(request);
                navegacao.push('/MinhasCompras');
                toast.success("Compra realizada com sucesso.");
            }
        } 
        catch (ex) {
            toast.error(ex.response.data.erro);
        }
    }




    useEffect(() => {
        listarEndereco(idCliente);
        calcular();
    }, []);

    useEffect(() => {
        CalcularFrete();
    }, [enderecoId]);

    return (
        <div>
            <Master children={
                <div style={{ justifyContent: "center", alignItems: "center", paddingTop: "4%", display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "60%", display: "flex", justifyContent: "flex-start" }}>
                        <span style={{ fontSize: "25px", fontWeight: "bold", color : "white"}}>Finalizar Compra</span>
                    </div>
                    <CaixaFinalizarCompra>
                        <div >
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Livro</th>
                                        <th scope="col">Preço Unitário</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registros.map((item) =>
                                        <tr className="table-success" key={item.id}>
                                            <th scope="row">{item.informacoes.nome}</th>
                                            <td>R$ {item.informacoes.venda}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                        <div className="decisoes">
                            <div className="form-group">
                                <label>Selecione um endereço:</label>
                                <select id="tipos" className="form-control" onChange={(x) => setEnderecoId(x.target.value)}>
                                    {listaDeEndereco.map((item) => (
                                        <option value={item.id}>{item.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Metodo De Pagamento:</label>
                                <select id="tipos" className="form-control" onChange={(x) => setTipoPagamento(x.target.value)}>
                                    <option value="Dinheiro">Boleto</option>
                                    <option value="Credito" >Crédito</option>
                                    <option value="Débito">Débito</option>
                                </select>
                            </div>
                            {tipoDePagamento === "Débito" &&
                                <div className="form-group row" >
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="endereco" placeholder="Informe o numero do seu cartão" />
                                    </div>
                                </div>
                            }
                            {tipoDePagamento === "Credito" &&
                                <div className="form-row">
                                    <InputMask
                                        className="form-control col-4"
                                        mask="9999 9999 9999 9999"
                                        placeholder="Digite o número de seu cartão"
                                        maxLength="20"
                                    >
                                    </InputMask>
                                    <span className="col">Número de Parcelas</span>
                                    <input type="number" className="form-control col-1" onChange={(x) => setNumeroParcela(x.target.value)} min="0" max="10"/>
                                    <span className="col">Valor das Parcelas :
                                {numeroParcela} x R$ {(totalcompra / numeroParcela).toFixed(2)}
                                    </span>
                                </div>
                            }
                            <div className="form-row">
                                <div className="col-4">
                                    <span>Valor Total dos Livros:</span>
                                    {valorlivros.toFixed(2)}
                                </div>
                                <div className="col-4">
                                    <span>Valor Total do Frete:</span>
                                    {valorfrete}
                                </div>
                                <div className="col-4">
                                    <span>Valor Total da Compra:</span>
                                    {totalcompra.toFixed(2)}
                                </div>
                            </div>
                            <div className="botao">
                                <button className="btn" onClick={realizarCompra}>Comprar</button>
                            </div>
                        </div>
                    </CaixaFinalizarCompra>
                    <ToastContainer />
                </div>
            } />
        </div>
    )
}