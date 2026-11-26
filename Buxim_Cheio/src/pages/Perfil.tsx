import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Perfil.css";

const MENU = [
  { label: "Início", path: "/home" },
  { label: "Receitas", path: "/receitas" },
  { label: "Categorias", path: "/categorias" },
  { label: "Meus Planos", path: "/planos" },
  { label: "Meu Perfil", path: "/perfil" },
  { label: "Configurações", path: "/configuracoes" },
];

function getIniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

function Perfil() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("Usuário");
  const [email, setEmail] = useState("usuario@email.com");
  const [bio, setBio] = useState("");
  const [editando, setEditando] = useState(false);
  const [rascunho, setRascunho] = useState({ nome, email, bio });
  const [mensagem, setMensagem] = useState("");

  function handleEditar() {
    setRascunho({ nome, email, bio });
    setMensagem("");
    setEditando(true);
  }

  function handleCancelar() {
    setEditando(false);
  }

  function handleSalvar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (rascunho.nome.trim() === "" || rascunho.email.trim() === "") {
      return;
    }

    setNome(rascunho.nome.trim());
    setEmail(rascunho.email.trim());
    setBio(rascunho.bio.trim());
    setEditando(false);
    setMensagem("Perfil atualizado com sucesso!");
  }

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2 className="logo">ReceitasJA</h2>

        <nav>
          {MENU.map((item) => (
            <button
              key={item.path}
              type="button"
              className={item.path === "/perfil" ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="logout-button"
          onClick={() => navigate("/")}
        >
          Sair da conta
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>Meu Perfil</h2>
            <p>Veja e atualize os dados da sua conta.</p>
          </div>

          <div className="user-profile">
            <span>Olá, {nome.split(" ")[0]}!</span>
          </div>
        </header>

        <section className="welcome-section perfil-resumo">
          <div className="perfil-avatar" aria-hidden="true">
            {getIniciais(nome)}
          </div>

          <div className="perfil-resumo-texto">
            <h1>{nome}</h1>
            <p>{email}</p>
          </div>
        </section>

        <section className="perfil-stats">
          <div className="dashboard-card perfil-stat">
            <h3>0</h3>
            <p>Receitas salvas</p>
          </div>

          <div className="dashboard-card perfil-stat">
            <h3>0</h3>
            <p>Favoritas</p>
          </div>

          <div className="dashboard-card perfil-stat">
            <h3>0</h3>
            <p>Planos da semana</p>
          </div>
        </section>

        <section className="perfil-card" aria-labelledby="perfil-dados-titulo">
          <div className="perfil-card-header">
            <h3 id="perfil-dados-titulo">Dados pessoais</h3>

            {!editando && (
              <button
                type="button"
                className="perfil-button perfil-button--secundario"
                onClick={handleEditar}
              >
                Editar perfil
              </button>
            )}
          </div>

          {mensagem && !editando && (
            <p className="perfil-mensagem" role="status">
              {mensagem}
            </p>
          )}

          {editando ? (
            <form onSubmit={handleSalvar}>
              <div className="perfil-campo">
                <label htmlFor="perfil-nome">Nome completo</label>
                <input
                  type="text"
                  id="perfil-nome"
                  placeholder="Digite seu nome"
                  value={rascunho.nome}
                  onChange={(e) =>
                    setRascunho({ ...rascunho, nome: e.target.value })
                  }
                  required
                />
              </div>

              <div className="perfil-campo">
                <label htmlFor="perfil-email">E-mail</label>
                <input
                  type="email"
                  id="perfil-email"
                  placeholder="Digite seu e-mail"
                  value={rascunho.email}
                  onChange={(e) =>
                    setRascunho({ ...rascunho, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="perfil-campo">
                <label htmlFor="perfil-bio">Sobre você</label>
                <textarea
                  id="perfil-bio"
                  rows={4}
                  placeholder="Conte um pouco sobre seu gosto na cozinha"
                  value={rascunho.bio}
                  onChange={(e) =>
                    setRascunho({ ...rascunho, bio: e.target.value })
                  }
                />
              </div>

              <div className="perfil-acoes">
                <button type="submit" className="perfil-button">
                  Salvar alterações
                </button>

                <button
                  type="button"
                  className="perfil-button perfil-button--secundario"
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <dl className="perfil-dados">
              <div>
                <dt>Nome completo</dt>
                <dd>{nome}</dd>
              </div>

              <div>
                <dt>E-mail</dt>
                <dd>{email}</dd>
              </div>

              <div>
                <dt>Sobre você</dt>
                <dd>{bio || "Nenhuma descrição adicionada."}</dd>
              </div>
            </dl>
          )}
        </section>
      </main>
    </div>
  );
}

export default Perfil;
