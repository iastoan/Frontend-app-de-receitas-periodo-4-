import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <aside className="sidebar">
        <h2 className="logo">ReceitasJA</h2>

        <nav>
          <button
            type="button"
            className="active"
            onClick={() => navigate("/home")}
          >
            Início
          </button>

          <button
            type="button"
            onClick={() => navigate("/receitas")}
          >
            Receitas
          </button>

          <button
            type="button"
            onClick={() => navigate("/categorias")}
          >
            Categorias
          </button>

          <button
            type="button"
            onClick={() => navigate("/planos")}
          >
            Meus Planos
          </button>

          <button
            type="button"
            onClick={() => navigate("/perfil")}
          >
            Meu Perfil
          </button>

          <button
            type="button"
            onClick={() => navigate("/configuracoes")}
          >
            Configurações
          </button>
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
            <h2>Painel Inicial</h2>
            <p>Organize sua alimentação de forma simples.</p>
          </div>

          <div className="user-profile">
            <span>Olá, usuário!</span>
          </div>
        </header>

        <section className="welcome-section">
          <h1>Bem-vindo ao ReceitasJA!</h1>

          <p>
            Descubra receitas, organize ingredientes e planeje
            suas refeições.
          </p>
        </section>

        <section className="dashboard-cards">

          <button
            type="button"
            className="dashboard-card"
            onClick={() => navigate("/receitas")}
          >
            <h3>Minhas Receitas</h3>
            <p>Organize suas receitas favoritas.</p>
          </button>

          <button
            type="button"
            className="dashboard-card"
            onClick={() => navigate("/categorias")}
          >
            <h3>Categorias</h3>
            <p>Explore receitas separadas por categorias.</p>
          </button>

          <button
            type="button"
            className="dashboard-card"
            onClick={() => navigate("/planos")}
          >
            <h3>Meus Planos</h3>
            <p>Organize suas refeições durante a semana.</p>
          </button>

        </section>

      </main>
    </div>
  );
}

export default Home;



