import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";


function App() {
  
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const repository = {
      title: `Repository ${Date.now()}`, 
      url: `https://github.com.br/felipeSobral/repo-${Date.now()}`,
      techs: ['React', 'NodeJs']
    }

    const response = await api.post('repositories', repository)

    setRepositories([ ...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const repo = repositories.filter(repository => repository.id !== id)

    setRepositories(repo)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li>
            <a href={repository.url}>{repository.title}</a>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
