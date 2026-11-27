import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Planos.css";
import {
  planoService,
  type Plano,
  type PlanoDetalhe,
  type ReceitaResumo,
  type TipoRefeicao,
} from "../services/planoService";
import { receitaService } from "../services/receitaService";

const MENU = [
  { label: "Início", path: "/home" },
  { label: "Receitas", path: "/receitas" },
  { label: "Categorias", path: "/categorias" },
  { label: "Meus Planos", path: "/planos" },
  { label: "Meu Perfil", path: "/perfil" },
  { label: "Configurações", path: "/configuracoes" },
];

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const TIPOS: TipoRefeicao[] = ["CAFE_DA_MANHA", "LANCHE", "ALMOCO", "JANTAR"];

const ROTULO_TIPO: Record<TipoRefeicao, string> = {
  CAFE_DA_MANHA: "Café da manhã",
  LANCHE: "Lanche",
  ALMOCO: "Almoço",
  JANTAR: "Jantar",
};

// "2026-12-06" vira uma data local, sem o deslocamento de fuso do new Date(string).
function parseData(iso: string): Date {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatarIso(data: Date): string {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function diasDoPeriodo(inicio: string, fim: string): Date[] {
  const dias: Date[] = [];
  const atual = parseData(inicio);
  const ultimo = parseData(fim);
  while (atual <= ultimo) {
    dias.push(new Date(atual));
    atual.setDate(atual.getDate() + 1);
  }
  return dias;
}

// Agrupa os dias em semanas que começam no domingo.
// Cada semana tem 7 posições; posições fora do plano ficam vazias (null).
function semanasDoPeriodo(dias: Date[]): (Date | null)[][] {
  const semanas: (Date | null)[][] = [];
  dias.forEach((dia) => {
    if (dia.getDay() === 0 || semanas.length === 0) {
      semanas.push(Array(7).fill(null));
    }
    semanas[semanas.length - 1][dia.getDay()] = dia;
  });
  return semanas;
}

function Planos() {
  const navigate = useNavigate();

  const [planos, setPlanos] = useState<Plano[]>([]);
  const [planoAtivo, setPlanoAtivo] = useState<PlanoDetalhe | null>(null);
  const [receitas, setReceitas] = useState<ReceitaResumo[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  const [novoPlano, setNovoPlano] = useState({ nome: "", dataInicio: "", dataFim: "" });
  const [novaRefeicao, setNovaRefeicao] = useState({
    data: "",
    tipoRefeicao: "ALMOCO" as TipoRefeicao,
    receitaId: "",
  });

  useEffect(() => {
    planoService.listar().then(setPlanos).catch((e: Error) => setErro(e.message));
    receitaService.listarSalvas().then(setReceitas).catch(() => setReceitas([]));
  }, []);

  function abrirPlano(id: number) {
    setErro(null);
    planoService
      .buscar(id)
      .then((detalhe) => {
        setPlanoAtivo(detalhe);
        setNovaRefeicao((atual) => ({ ...atual, data: detalhe.dataInicio }));
      })
      .catch((e: Error) => setErro(e.message));
  }

  function criarPlano(evento: FormEvent) {
    evento.preventDefault();
    setErro(null);
    planoService
      .criar(novoPlano)
      .then((plano) => {
        setPlanos((atuais) => [...atuais, plano]);
        setNovoPlano({ nome: "", dataInicio: "", dataFim: "" });
        abrirPlano(plano.id);
      })
      .catch((e: Error) => setErro(e.message));
  }

  function adicionarRefeicao(evento: FormEvent) {
    evento.preventDefault();
    if (!planoAtivo || !novaRefeicao.receitaId) return;
    setErro(null);
    planoService
      .adicionarRefeicao(planoAtivo.id, {
        receitaId: Number(novaRefeicao.receitaId),
        data: novaRefeicao.data,
        tipoRefeicao: novaRefeicao.tipoRefeicao,
      })
      .then(() => {
        setNovaRefeicao((atual) => ({ ...atual, receitaId: "" }));
        abrirPlano(planoAtivo.id);
      })
      .catch((e: Error) => setErro(e.message));
  }

  function excluirPlano() {
    if (!planoAtivo) return;
    const id = planoAtivo.id;
    setErro(null);
    planoService
      .excluir(id)
      .then(() => {
        setPlanos((atuais) => atuais.filter((p) => p.id !== id));
        setPlanoAtivo(null);
        setConfirmarExclusao(false);
      })
      .catch((e: Error) => {
        setErro(e.message);
        setConfirmarExclusao(false);
      });
  }

  function removerRefeicao(refeicaoId: number) {
    if (!planoAtivo) return;
    setErro(null);
    planoService
      .removerRefeicao(planoAtivo.id, refeicaoId)
      .then(() => abrirPlano(planoAtivo.id))
      .catch((e: Error) => setErro(e.message));
  }

  const dias = planoAtivo ? diasDoPeriodo(planoAtivo.dataInicio, planoAtivo.dataFim) : [];
  const semanas = semanasDoPeriodo(dias);

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2 className="logo">ReceitasJA</h2>

        <nav>
          {MENU.map((item) => (
            <button
              key={item.path}
              type="button"
              className={item.path === "/planos" ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="logout-button" onClick={() => navigate("/")}>
          Sair da conta
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <h2>Meus Planos</h2>
            <p>Organize suas refeições por semana!</p>
          </div>

          <div className="user-profile">
            <span>Olá, usuário!</span>
          </div>
        </header>

        {erro && (
          <p className="planos-erro" role="alert">
            {erro}
          </p>
        )}

        <section className="planos-card" aria-labelledby="planos-criar">
          <h3 id="planos-criar">Criar plano</h3>
          <form className="planos-form" onSubmit={criarPlano}>
            <div className="planos-campo">
              <label htmlFor="plano-nome">Nome</label>
              <input
                id="plano-nome"
                placeholder="Ex.: Semana leve"
                value={novoPlano.nome}
                onChange={(e) => setNovoPlano({ ...novoPlano, nome: e.target.value })}
                required
              />
            </div>
            <div className="planos-campo">
              <label htmlFor="plano-inicio">Início</label>
              <input
                id="plano-inicio"
                type="date"
                value={novoPlano.dataInicio}
                onChange={(e) => setNovoPlano({ ...novoPlano, dataInicio: e.target.value })}
                required
              />
            </div>
            <div className="planos-campo">
              <label htmlFor="plano-fim">Fim</label>
              <input
                id="plano-fim"
                type="date"
                value={novoPlano.dataFim}
                onChange={(e) => setNovoPlano({ ...novoPlano, dataFim: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="planos-botao">
              Criar plano
            </button>
          </form>
        </section>

        <section className="planos-card" aria-labelledby="planos-lista">
          <h3 id="planos-lista">Seus planos</h3>
          {planos.length === 0 && <p className="planos-vazio">Nenhum plano criado ainda.</p>}
          <ul className="planos-lista">
            {planos.map((plano) => (
              <li key={plano.id}>
                <button
                  type="button"
                  className={planoAtivo?.id === plano.id ? "planos-item ativo" : "planos-item"}
                  onClick={() => abrirPlano(plano.id)}
                >
                  <strong>{plano.nome}</strong>
                  <span>
                    {plano.dataInicio} até {plano.dataFim}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {planoAtivo && (
          <section className="planos-card" aria-labelledby="planos-grade">
            <div className="planos-cabecalho-plano">
              <h3 id="planos-grade">{planoAtivo.nome}</h3>
              <button
                type="button"
                className="planos-botao-perigo"
                onClick={() => setConfirmarExclusao(true)}
              >
                Excluir plano
              </button>
            </div>

            {semanas.map((semana, indice) => (
              <div className="semana" key={indice}>
                <div className="semana-grade">
                  <div className="celula cabecalho" />
                  {DIAS_SEMANA.map((nome, dia) => (
                    <div className="celula cabecalho" key={nome}>
                      {nome}
                      {semana[dia] && <small>{semana[dia]!.getDate()}</small>}
                    </div>
                  ))}

                  {TIPOS.map((tipo) => (
                    <div className="linha" key={tipo}>
                      <div className="celula rotulo">{ROTULO_TIPO[tipo]}</div>
                      {semana.map((dia, posicao) => {
                        const iso = dia ? formatarIso(dia) : null;
                        const refeicoes = planoAtivo.refeicoes.filter(
                          (r) => r.data === iso && r.tipoRefeicao === tipo,
                        );
                        return (
                          <div className={`celula ${dia ? "" : "fora"}`} key={posicao}>
                            {refeicoes.map((r) => (
                              <div className="refeicao" key={r.id}>
                                <span>{r.receita.nome}</span>
                                <button
                                  type="button"
                                  className="remover"
                                  onClick={() => removerRefeicao(r.id)}
                                  aria-label={`Remover ${r.receita.nome}`}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <h3 className="planos-subtitulo">Adicionar refeição</h3>
            <form className="planos-form" onSubmit={adicionarRefeicao}>
              <div className="planos-campo">
                <label htmlFor="refeicao-dia">Dia</label>
                <select
                  id="refeicao-dia"
                  value={novaRefeicao.data}
                  onChange={(e) => setNovaRefeicao({ ...novaRefeicao, data: e.target.value })}
                >
                  {dias.map((dia) => (
                    <option key={formatarIso(dia)} value={formatarIso(dia)}>
                      {formatarIso(dia)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="planos-campo">
                <label htmlFor="refeicao-tipo">Refeição</label>
                <select
                  id="refeicao-tipo"
                  value={novaRefeicao.tipoRefeicao}
                  onChange={(e) =>
                    setNovaRefeicao({
                      ...novaRefeicao,
                      tipoRefeicao: e.target.value as TipoRefeicao,
                    })
                  }
                >
                  {TIPOS.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {ROTULO_TIPO[tipo]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="planos-campo">
                <label htmlFor="refeicao-receita">Receita</label>
                <select
                  id="refeicao-receita"
                  value={novaRefeicao.receitaId}
                  onChange={(e) => setNovaRefeicao({ ...novaRefeicao, receitaId: e.target.value })}
                  required
                >
                  <option value="">Escolha uma receita</option>
                  {receitas.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="planos-botao">
                Adicionar
              </button>
            </form>
          </section>
        )}

        {confirmarExclusao && planoAtivo && (
          <div className="modal-fundo">
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
              <h3 id="modal-titulo">Você deseja mesmo excluir esse plano?</h3>
              <p>
                O plano "{planoAtivo.nome}" e todas as refeições dele serão removidos. Essa ação não
                pode ser desfeita.
              </p>
              <div className="modal-acoes">
                <button
                  type="button"
                  className="planos-botao-secundario"
                  onClick={() => setConfirmarExclusao(false)}
                  autoFocus
                >
                  Não
                </button>
                <button type="button" className="planos-botao-perigo" onClick={excluirPlano}>
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Planos;
