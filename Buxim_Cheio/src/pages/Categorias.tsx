
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Categorias.css";
import "./Home.css";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: "entradas", name: "Entradas", icon: "🥗" },
  { id: "saladas", name: "Saladas", icon: "🥬" },
  { id: "sopas", name: "Sopas e caldos", icon: "🍲" },
  { id: "massas", name: "Massas", icon: "🍝" },
  { id: "carnes", name: "Carnes", icon: "🥩" },
  { id: "peixes", name: "Peixes e frutos do mar", icon: "🐟" },
  { id: "lanches", name: "Lanches e salgados", icon: "🍔" },
  { id: "sobremesas", name: "Sobremesas", icon: "🍰" },
  { id: "bebidas", name: "Bebidas", icon: "🥤" },
];

interface Props {
  onSelect?: (category: Category | null) => void;
}

const MENU = [
  { label: "Início", path: "/home" },
  { label: "Receitas", path: "/receitas" },
  { label: "Categorias", path: "/categorias" },
  { label: "Meus Planos", path: "/planos" },
  { label: "Meu Perfil", path: "/perfil" },
  { label: "Configurações", path: "/configuracoes" },
];

export default function RecipeCategories({ onSelect }: Props) {
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (category: Category) => {
    const next = selectedId === category.id ? null : category.id;

    setSelectedId(next);
    onSelect?.(next ? category : null);
  };

  return (
    <div className="home-container">
      <aside className="sidebar">
        <h2 className="logo">ReceitasJA</h2>

        <nav>
          {MENU.map((item) => (
            <button
              key={item.path}
              type="button"
              className={item.path === "/categorias" ? "active" : ""}
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
        <section className="rc" aria-labelledby="rc-title">
          <header className="rc__header">
            <h2 id="rc-title" className="rc__title">
              O que vamos cozinhar hoje?
            </h2>

            <p className="rc__subtitle">
              Escolha uma categoria para ver as receitas.
            </p>
          </header>

          <ul className="rc__grid">
            {CATEGORIES.map((category) => {
              const active = category.id === selectedId;

              return (
                <li key={category.id}>
                  <button
                    type="button"
                    className={`rc__card${active ? " rc__card--active" : ""}`}
                    aria-pressed={active}
                    onClick={() => handleClick(category)}
                  >
                    <span className="rc__icon" aria-hidden="true">
                      {category.icon}
                    </span>

                    <span className="rc__name">{category.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}



