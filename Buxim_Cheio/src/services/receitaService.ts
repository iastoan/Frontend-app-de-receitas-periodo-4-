import type { ReceitaResumo } from "./planoService";

const API_URL: string = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export const receitaService = {
  // Receitas que o usuário salvou (importadas do Spoonacular).
  listarSalvas: async (): Promise<ReceitaResumo[]> => {
    const res = await fetch(`${API_URL}/api/receitas/salvas`);
    if (!res.ok) {
      throw new Error(`Erro ${res.status} ao buscar receitas`);
    }
    return (await res.json()) as ReceitaResumo[];
  },
};
