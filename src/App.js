import React, { useState } from 'react';
import './App.css';
import { Search } from 'react-bootstrap-icons';


export function App() {
  const [username, setUsername] = useState('');
  const [repositories] = useState([]);

  const handleInputChange = event => {
    setUsername(event.target.value);
  };

  const handleButtonClick = () => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        const repoList = sortedRepos.map(repo => `${repo.name} - ${repo.stargazers_count} stars`).join('\n');
        document.body.innerHTML = `<pre>${repoList}</pre>`;
      })
      .catch(error => console.log(error));
  };
  
  

  return (
    <body>
    <div className='container'>
      <h1>Search Devs</h1>
      <div className='inputGroup'>
        <input type="text" placeholder='Type the username here...' id="username-input" value={username} onChange={handleInputChange} />
        <button onClick={handleButtonClick}><Search style={{background: 'none'}}/>Buscar</button>
      </div>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name} - {repo.stargazers_count} stars</li>
        ))}
      </ul>
    </div>
    </body>
  );
}

