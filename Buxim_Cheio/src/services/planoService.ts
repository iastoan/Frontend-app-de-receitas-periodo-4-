const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export type TipoRefeicao = "CAFE_DA_MANHA" | "LANCHE" | "ALMOCO" | "JANTAR";

export interface ReceitaResumo {
  id: number;
  nome: string;
  imagem: string | null;
  tempoPreparo: number | null;
  porcoes: number | null;
}

export interface Plano {
  id: number;
  nome: string;
  dataInicio: string;
  dataFim: string;
}

export interface Refeicao {
  id: number;
  data: string;
  tipoRefeicao: TipoRefeicao;
  receita: ReceitaResumo;
}

export interface PlanoDetalhe extends Plano {
  refeicoes: Refeicao[];
}

export interface NovoPlano {
  nome: string;
  dataInicio: string;
  dataFim: string;
}

export interface NovaRefeicao {
  receitaId: number;
  data: string;
  tipoRefeicao: TipoRefeicao;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!res.ok) {
    const corpo = await res.text();
    throw new Error(corpo || `Erro ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as T;
  }
  return (await res.json()) as T;
}

export const planoService = {
  listar: () => request<Plano[]>("/api/planos"),

  buscar: (id: number) => request<PlanoDetalhe>(`/api/planos/${id}`),

  criar: (dados: NovoPlano) =>
    request<Plano>("/api/planos", {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  adicionarRefeicao: (planoId: number, dados: NovaRefeicao) =>
    request<Refeicao>(`/api/planos/${planoId}/refeicoes`, {
      method: "POST",
      body: JSON.stringify(dados),
    }),

  excluir: (id: number) =>
    request<void>(`/api/planos/${id}`, {
      method: "DELETE",
    }),

  removerRefeicao: (planoId: number, refeicaoId: number) =>
    request<void>(`/api/planos/${planoId}/refeicoes/${refeicaoId}`, {
      method: "DELETE",
    }),
};
