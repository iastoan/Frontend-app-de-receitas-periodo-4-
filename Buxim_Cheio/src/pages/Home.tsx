
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <aside className="sidebar">
        <h2 className="logo">ReceitasJA</h2>

        <nav>
          <a href="/home" className="active">Início</a>
          <a href="/receitas">Receitas</a>
          <a href="/ingredientes">Ingredientes</a>
          <a href="/planos">Meus Planos</a>
          <a href="/perfil">Meu Perfil</a>
          <a href="/configuracoes">Configurações</a>
        </nav>

        <button className="logout-button">
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
          <div className="dashboard-card">
            <h3>Minhas Receitas</h3>
            <p>Organize suas receitas favoritas.</p>
          </div>

          <div className="dashboard-card">
            <h3>Ingredientes</h3>
            <p>Gerencie os ingredientes das suas receitas.</p>
          </div>

          <div className="dashboard-card">
            <h3>Meus Planos</h3>
            <p>Organize suas refeições durante a semana.</p>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;
