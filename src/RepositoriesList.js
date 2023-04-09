import React, { useState, useEffect } from 'react';

function RepositoriesList() {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleInputChange = event => {
    setUsername(event.target.value);
  };

  const handleButtonClick = () => {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        const repoList = sortedRepos.map(repo => `${repo.name} - ${repo.stargazers_count} stars`).join('\n');
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`<pre>${repoList}</pre>`);
      })
      .catch(error => console.log(error));
  };
  

  return (
    <div>
      <h1>GitHub Repositories</h1>
      <div>
        <label htmlFor="username-input">Enter a GitHub username:</label>
        <input type="text" id="username-input" value={username} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>{repo.name} - {repo.stargazers_count} stars</li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoriesList;
