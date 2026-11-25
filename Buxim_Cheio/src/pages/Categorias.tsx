import {useState} from "react";
import "./Categorias.css";

export interface Category {
  id: string;
  name: string;
}

export const Categorias: Category[] = [
  {id: "entradas", name: "Entradas"},
  {id: "saladas", name: "Saladas"},
  {id: "sopas", name: "Sopas e caldos"},
  {id:"massas", name: "Massas"},
  {id: "carnes", name:"Carnes"},
  {id: "peixes", name: "Peixes e frutos do mar"},
  {id:"lanches", name: "Lanches e salgados"},
  {id: "sobremesas", name:"Sobremesas"},
  {id: "bebidas", name: "Bebidas" },
];

interface Props {
  onSelect?: (category: RecipeCategory | null) => void;
}

export default function RecipeCategories({ onSelect }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (category: RecipeCategory) => {
    const next = selectedId === category.id ? null : category.id;
    setSelectedId(next);
    onSelect?.(next ? category : null);
  };

  return (
    <section className="rc" aria-labelledby="rc-title">
      <header className="rc__header">
        <h2 id="rc-title" className="rc__title">
          O que vamos cozinhar hoje?
        </h2>
        <p className="rc__subtitle">Escolha uma categoria para ver as receitas.</p>
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
  );
}

