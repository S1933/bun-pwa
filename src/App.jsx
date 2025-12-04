import { useState, useEffect } from "react";

const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
};

export default function App() {
  const [pokemonByType, setPokemonByType] = useState({});
  const [selectedType, setSelectedType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/pokemon-by-type.json")
      .then((res) => res.json())
      .then((data) => {
        setPokemonByType(data);
        setSelectedType(Object.keys(data)[0]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ padding: 20, fontFamily: "sans-serif" }}>Loading...</div>;
  }

  const types = Object.keys(pokemonByType);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", maxWidth: 800, margin: "0 auto" }}>
      <h1>🎮 Pokémon by Type</h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: 20,
              cursor: "pointer",
              backgroundColor: selectedType === type ? typeColors[type] : "#e0e0e0",
              color: selectedType === type ? "white" : "#333",
              fontWeight: selectedType === type ? "bold" : "normal",
              textTransform: "capitalize",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 16,
        }}
      >
        {pokemonByType[selectedType]?.map((pokemon) => (
          <div
            key={pokemon.id}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: `${typeColors[selectedType]}22`,
              border: `2px solid ${typeColors[selectedType]}`,
              textAlign: "center",
            }}
          >
            <img src={pokemon.sprite} alt={pokemon.name} style={{ width: 80, height: 80 }} />
            <p style={{ margin: "8px 0 0", fontWeight: 500 }}>{pokemon.name}</p>
            <small style={{ color: "#666" }}>#{pokemon.id}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
