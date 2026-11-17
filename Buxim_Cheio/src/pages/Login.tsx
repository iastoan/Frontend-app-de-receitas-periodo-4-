
import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log("Email:", email);
    console.log("Senha:", senha);
  }

  return (
    <main className="login-container">
      <section className="login-card">

        <div className="login-header">
          <h1>Site de Receita</h1>
          <p>Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <p className="register-text">
          Ainda não tem uma conta? <a href="#">Cadastre-se</a>
        </p>

      </section>
    </main>
  );
}

export default Login;
