import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Cookies from 'js-cookie';

import { ToastContainer, toast } from "react-toastify";

import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

import { ContainerLogin, FundoCarregamento } from './style.js'
import { LoginCaixa } from "../../components/LoginCaixa/LoginCaixa"
import nextGenBookAPI from "../../Service/NextGenBookApi";
import Master from "../Master/index";

const api = new nextGenBookAPI();

const override = css`
  display: block;
  margin: 0 auto;
  margin: auto 5px;
`;


export default function Logar(e) {
  // final do login
  const navegacao = useHistory()
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");

  const Logar = async () => {
    try {
      openCarregamento();
      const request = {
        user,
        senha
      }
      const a = await api.login(request);
      gerarCookies(a.data)
    }
    catch (e) {
      toast.error(e.response.data.erro);
    }
    finally {
      closeCarregamento();
      navegacao.push("/");
    }
  }

  function gerarCookies(response) {
    Cookies.remove('id');
    Cookies.remove('token');
    Cookies.remove('usuario');
    Cookies.remove('perfil');

    Cookies.set('token', response.token, {
      expires: 1,
      path: '/'
    });
    Cookies.set('id', response.id, {
      expires: 1,
      path: '/'
    });
    Cookies.set('usuario', response.nome, {
      expires: 1,
      path: '/'
    });
    Cookies.set('perfil', response.perfil, {
      expires: 1,
      path: '/'
    });
  }



  /*document.getElementById("loginsenha").onkeypress = (evt) => {
    if (evt.key === "Enter")
      Logar();
  };*/
  //evt = evt || window.event;
  //console.log(evt);
  //if (evt.key === "Enter")
  //await Logar();

  function openCarregamento() {
    setCarregado(true);
    document.getElementById('fundocarregamento').style.display = "flex";
  }
  function closeCarregamento() {
    setCarregado(false);
    document.getElementById('fundocarregamento').style.display = "none";
  }

  function AlterarTitulo(nome) {
    document.getElementsByTagName('title')[0].innerText = nome
  }

  function mostrar() {
    var tipo = document.getElementById("loginsenha");
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

  useEffect (
    () => {
      AlterarTitulo('Acesso')
    }, []
  );


  const [carregado, setCarregado] = useState(false);

  return (
    <Master>
      <ContainerLogin>
        <FundoCarregamento id="fundocarregamento">
          <ClipLoader
            css={override}
            size={100}
            color={"#438719"}
            loading={carregado}
          />
        </FundoCarregamento>
        <LoginCaixa>
          <div className="centro">
            <div className="titulo">
              <label style={{ margin: "15px 5px" }}>ENTRAR</label>
            </div>
            <div className="form-group">
              <label>Usuario:</label>
              <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Digite o nome de usuario ou e-mail cadastrado:" onChange={(e) => setUser(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Senha:</label>
              <div className="input-icone" style={{ position: "relative" }}>
                <input type="password" className="form-control" id="loginsenha" placeholder="Digite sua senha:" onChange={(e) => setSenha(e.target.value)} />
                <i className="icone btn btn-sm fas fa-eye" onClick={mostrar} style={{ margin: "auto", position: "absolute", right: "0px", top: "50%", fontSize: "15px", transform: "translateY(-50%)" }}></i>
              </div>
            </div>
            <div className="Links" style={{ margin: "10px 5px" }}>
              <div className="link">
                <Link as="a" to={{ pathname: "/EsqueciSenha" }}>
                  Esqueci a Senha &#160;|
                </Link>
              </div>

              <div className="link">
                <Link as="a" to={{ pathname: "Cadastro" }}>
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
      <ToastContainer />
    </Master>
  );
}