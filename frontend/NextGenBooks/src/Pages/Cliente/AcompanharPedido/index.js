import React, { useRef, useState } from "react";
import { Container, CaixaPadrao } from "./style.js";
import { rastrearPedido } from "../../../Service/ApiCorreio.js";
import Master from "../../Master";

import LoadingBar from 'react-top-loading-bar';

export default function AcompanharPedido() {
    const [registros, setRegistros] = useState([]);
    const [valor, setValor] = useState("");
    const ref = useRef(null);

    const acompanharPedido = async () => {
        try {
            ref.current.continuousStart();
            let resp = await rastrearPedido(valor);
            setRegistros([...resp]);
        } catch (e) {
            console.error(e);
        }
        finally {
            ref.current.complete();
        }
    }
    return (
        <Master>
            <LoadingBar
                color='#f11946'
                ref = {ref}
            />
            <Container>

                <CaixaPadrao>
                    <div style={{ textAlign: "center" }}>
                        <h3 style={{ color: "green" }}>Status do envio</h3>
                    </div>
                    <div className="form-group row" style={{ width: "80%", display: "flex" }} >
                        <div className="col-sm-10" style={{ display: "flex", flexDirection: "row", width: "80%" }}>
                            <input type="text" style={{ width: "50%", marginRight: "5px" }} className="form-control" id="codigo" placeholder="Digite o codigo" onChange={(e) => setValor(e.target.value)} />
                            <div className="button1">
                                <button className="btn btn-success" onClick={acompanharPedido}>Buscar</button>
                            </div>
                        </div>
                    </div>
                    <div >
                        {registros.map((x) =>
                            x.map((item) =>

                                <div className="card" key={item.status} >
                                    <div className="titulo" style={{ color: "#999" }}>

                                        Status:{item.status}

                                    </div>
                                    <div className="corpo">
                                        <div>
                                            Data: {item.data}
                                        </div>
                                        <div>
                                            Hora:{item.hora}
                                        </div>
                                        <div>
                                            Local:{item.local}
                                        </div>


                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </CaixaPadrao>
            </Container>
        </Master>
    )
}