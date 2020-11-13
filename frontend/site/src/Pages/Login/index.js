import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from 'js-cookie';

import { ToastContainer, toast } from "react-toastify";

import { ContainerLogin } from './style.js'
import {LoginCaixa} from "../../components/LoginCaixa/LoginCaixa"
import nextGenBookAPI from "../../Service/NextGenBookApi";
import Master from "../Master";

const api = new nextGenBookAPI();

export default function Logar(e) {
      // final do login

      const navegacao = useHistory()
      const [ user, setUser ] = useState("");
      const [ senha, setSenha ] = useState("");

      const Logar = async () => {
        try {
          const request = {
            user,
            senha
          }

          const a = await api.login(request);
          gerarCookies(a.data)
          navegacao.push("/", a.data);
        } catch(e) {
          toast.error("Usuario ou Senha incorretos");
        }
      }

      function gerarCookies(response) {
        Cookies.remove('id');
        Cookies.remove('token');
        Cookies.remove('usuario');
        Cookies.remove('perfil');  
        
        Cookies.set('token', response.token, {
          expires : 1,
          path : '/'
        });
        Cookies.set('id', response.id, {
          expires : 1,
          path : '/'
        });
        Cookies.set('usuario', response.nome, {
          expires : 1,
          path : '/'
        });
        Cookies.set('perfil', response.perfil, {
          expires : 1,
          path : '/'
        });
      }

      function mostrar() {	
        var tipo = document.getElementById("formGroupExampleInput2");	
        var botao = document.querySelector(".btn.btn-sm"); 	

        if (tipo.type === "password") {	
          tipo.type = "text";
          botao.classList.remove("fa-eye"); 	
          botao.classList.add("fa-eye-slash"); 	
        } else {	
          tipo.type = "password";	
          botao.classList.remove("fa-eye-slash"); 	
          botao.classList.add("fa-eye"); 	
        }
      }

      return (
        <div id="login">
          <Master children={
            <ContainerLogin>
              <LoginCaixa>
                  <div className="centro">
                      <div className="titulo">
                          <label style={{margin: "15px 5px"}}>ENTRAR</label>
                      </div>
                        <div className="form-group">
                          <label>Usuário:</label>
                          <input type="text" className="form-control" id="formGroupExampleInput" placeholder="" onChange = {(e) => setUser(e.target.value)}/>
                        </div>
                        <div className="form-group">
                          <label>Senha:</label>
                          <div className="input-icone">
                            <input type="password" className="form-control" id="formGroupExampleInput2" placeholder="" onChange = {(e) => setSenha(e.target.value)}/>
                                <i className="icone btn btn-sm fas fa-eye" style={{margin:"auto"}}
                                                  onClick={mostrar}
                                      ></i>
                          </div>
                        </div>
                        <div className = "Links" style={{margin: "10px 5px"}}>
                              <div className="link">
                                <Link as = "a" to={{pathname:"/EsqueciSenha"}}>
                                    Esqueci a Senha &#160;|
                                </Link>
                              </div>
                                  
                              <div className="link">
                                <Link as = "a" to={{pathname:"Cadastro"}}>
                                &#160;  Cadastre-se
                                </Link>
                              </div>
                        </div>
                            <div className="botao">
                                <button
                                  className="btn"
                                    onClick={Logar}
                                >
                                    Logar
                                </button>
                          </div>
                  </div>
            </LoginCaixa>
          </ContainerLogin>
        }/>
        <ToastContainer />
    </div>
  );
}
                            
                                
                                
