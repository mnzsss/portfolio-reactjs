import React, { useState, useEffect } from "react";

import parseStringAsArray from "./utils/parseStringAsArray";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepos() {
      const res = await api.get("/repositories");

      setRepositories(res.data);
    }

    loadRepos();
  }, []);

  async function handleAddRepository(e) {
    e.preventDefault();

    const res = await api.post("/repositories", {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(
      repositories.filter((repo) => {
        return repo.id !== id;
      })
    );
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={String(repo.id)}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <hr />

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
