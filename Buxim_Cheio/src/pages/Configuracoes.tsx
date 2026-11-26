import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Configuracoes.css";

const MENU = [
  { label: "Início", path: "/home" },
  { label: "Receitas", path: "/receitas" },
  { label: "Categorias", path: "/categorias" },
  { label: "Meus Planos", path: "/planos" },
  { label: "Meu Perfil", path: "/perfil" },
  { label: "Configurações", path: "/configuracoes" },
];

type Tema = "claro" | "escuro";

const CHAVE_TEMA = "receitasja-tema";
const CHAVE_NOTIFICACOES = "receitasja-notificacoes";

function lerStorage(chave: string): string | null {
  try {
    return localStorage.getItem(chave);
  } catch {
    return null;
  }
}

function salvarStorage(chave: string, valor: string) {
  try {
    localStorage.setItem(chave, valor);
  } catch {
  }
}

function aplicarTema(tema: Tema) {
  document.documentElement.setAttribute("data-theme", tema);
}

function temaSalvo(): Tema {
  return lerStorage(CHAVE_TEMA) === "escuro" ? "escuro" : "claro";
}


aplicarTema(temaSalvo());

interface SwitchProps {
  id: string;
  label: string;
  descricao: string;
  ativo: boolean;
  onChange: (valor: boolean) => void;
}

function Switch({ id, label, descricao, ativo, onChange }: SwitchProps) {
  return (
    <div className="config-linha">
      <div className="config-linha-texto">
        <label htmlFor={id}>{label}</label>
        <p>{descricao}</p>
      </div>

      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={ativo}
        className={`config-switch${ativo ? " config-switch--ativo" : ""}`}
        onClick={() => onChange(!ativo)}
      >
        <span className="config-switch-bolinha" />
      </button>
    </div>
  );
}

function Configuracoes() {
  const navigate = useNavigate();

  const [tema, setTema] = useState<Tema>(temaSalvo);
  const [notificacoes, setNotificacoes] = useState(
    () => lerStorage(CHAVE_NOTIFICACOES) !== "desligado"
  );

  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [msgSenha, setMsgSenha] = useState("");

  function handleModoEscuro(ativo: boolean) {
    const novo: Tema = ativo ? "escuro" : "claro";
    setTema(novo);
    aplicarTema(novo);
    salvarStorage(CHAVE_TEMA, novo);
  }

  function handleNotificacoes(ativo: boolean) {
    setNotificacoes(ativo);
    salvarStorage(CHAVE_NOTIFICACOES, ativo ? "ligado" : "desligado");
  }

  function handleSenha(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMsgSenha("");

    if (novaSenha.length < 6) {
      setErroSenha("A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmaSenha) {
      setErroSenha("A confirmação não é igual à nova senha.");
      return;
    }

    setErroSenha("");
    setMsgSenha("Senha alterada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmaSenha("");
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
              className={item.path === "/configuracoes" ? "active" : ""}
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
            <h2>Configurações</h2>
            <p>Personalize o ReceitasJA do seu jeito.</p>
          </div>

          <div className="user-profile">
            <span>Olá, usuário!</span>
          </div>
        </header>

        <section className="config-card" aria-labelledby="config-aparencia">
          <h3 id="config-aparencia">Aparência</h3>

          <Switch
            id="config-modo-escuro"
            label="Modo escuro"
            descricao="Usa cores escuras em todas as telas, mais confortáveis à noite."
            ativo={tema === "escuro"}
            onChange={handleModoEscuro}
          />
        </section>

        <section className="config-card" aria-labelledby="config-notificacoes">
          <h3 id="config-notificacoes">Notificações</h3>

          <Switch
            id="config-notificacoes-switch"
            label="Lembretes de refeições"
            descricao="Receba avisos sobre as refeições do seu plano semanal."
            ativo={notificacoes}
            onChange={handleNotificacoes}
          />
        </section>

        <section className="config-card" aria-labelledby="config-seguranca">
          <h3 id="config-seguranca">Segurança</h3>

          {msgSenha && (
            <p className="config-mensagem" role="status">
              {msgSenha}
            </p>
          )}

          {erroSenha && (
            <p className="config-erro" role="alert">
              {erroSenha}
            </p>
          )}

          <form onSubmit={handleSenha}>
            <div className="config-campo">
              <label htmlFor="config-senha-atual">Senha atual</label>
              <input
                type="password"
                id="config-senha-atual"
                placeholder="Digite sua senha atual"
                value={senhaAtual}
                onChange={(e) => setSenhaAtual(e.target.value)}
                required
              />
            </div>

            <div className="config-campo">
              <label htmlFor="config-nova-senha">Nova senha</label>
              <input
                type="password"
                id="config-nova-senha"
                placeholder="Crie uma nova senha"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                required
              />
            </div>

            <div className="config-campo">
              <label htmlFor="config-confirma-senha">Confirmar nova senha</label>
              <input
                type="password"
                id="config-confirma-senha"
                placeholder="Repita a nova senha"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="config-button">
              Alterar senha
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default Configuracoes;
