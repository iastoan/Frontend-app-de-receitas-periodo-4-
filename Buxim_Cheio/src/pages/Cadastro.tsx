
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  function handleCadastro(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      nome.trim() !== "" &&
      email.trim() !== "" &&
      senha.trim() !== ""
    ) {
      alert("Cadastro provisório realizado com sucesso!");
      navigate("/");
    }
  }

  return (
    <main className="cadastro-container">
      <section className="cadastro-card">
        <div className="cadastro-header">
          <h1>Criar conta</h1>
          <p>Faça seu cadastro no ReceitasJA</p>
        </div>

        <form onSubmit={handleCadastro}>
          <div className="form-group">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-email">E-mail</label>
            <input
              type="email"
              id="cadastro-email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cadastro-senha">Senha</label>
            <input
              type="password"
              id="cadastro-senha"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="cadastro-button">
            Criar conta
          </button>
        </form>

        <p className="cadastro-login">
          Já possui uma conta? <Link to="/">Entrar</Link>
        </p>
      </section>
    </main>
  );
}

export default Cadastro;
