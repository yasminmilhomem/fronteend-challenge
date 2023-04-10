import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Profile.css";

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [stars, setStars] = useState([]);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.log(error));
      
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => {
        const sortedRepos = data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(sortedRepos);
      })

      fetch(`https://api.github.com/users/${username}/repos`)
      .then((response) => response.json())
      .then((data) => {
        const totalStars = data.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        setStars(totalStars);
      })
      
      .catch((error) => console.log(error));
  }, [username]);

  if (!user) {
    return <div className='loadingClass'>Carregando...</div>;
  }

  return (
    <div className='loadedClass'>
      <div className='leftBar'>
        <img src={user.avatar_url} alt={user.login} />
        <div className='nameGroup'>
        <h1>{user.name}</h1>
        <h1>{user.login}</h1>
        </div>
        <p>{user.bio}</p>
        <div className='numbersGroup'>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        <p>Starred Repos: {stars}</p>
        </div>
        <div className='infoGroup'>
        <p>Organization: {user.company}</p>
        <p>Location: {user.location}</p>
        <p></p>
        <p>Link: <a href={user.html_url}>{user.html_url}</a></p>
        <p>Twitter: {user.twitter_username}</p>
        <p>Voltar</p>
        </div>
      </div>
      <div className='rightBar'>
      <h2>Repositories:</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name} - {repo.stargazers_count} stars</li>
        ))}
      </ul>
      </div>
    </div>

  );
}

export default Profile;
