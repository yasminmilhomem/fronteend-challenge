import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./Profile.css";
import { GeoAlt, Heart, Star, Envelope, Link, Building, People, Twitter } from 'react-bootstrap-icons';

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
    <>
    <div className='loadedClass'>
      <div className='leftBar'>
        <img src={user.avatar_url} alt={user.login} />
        <div className='nameGroup'>
        <h2>{user.name}</h2>
        <h3>@{user.login}</h3>
        </div>
        <p>{user.bio}</p>

        <div className='numbersGroup'>
        <p><People />Followers: {user.followers}</p>
        <p><Heart />Following: {user.following}</p>
        <p>< Star/>Starred Repos: {stars}</p>
        </div>

        <div className='infoGroup'>
        <p><Building />Organization: {user.company}</p>
        <p><GeoAlt />Location: {user.location}</p>
        <p><Envelope />Email: {user.email}</p>
        <p></p>
        <p><Link />Link: <a href={user.blog}>{user.blog}</a></p>
        <p><Twitter />Twitter: {user.twitter_username}</p>
        <button>Voltar</button>
        </div>
      </div>
      <div className='rightBar'>
      <h2>Repositories:</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>{repo.name} - {repo.stargazers_count} stars - Last updated: {repo.updated_at} </li>
        ))}
      </ul>
      </div>
    </div>
     
      <img src="https://raw.githubusercontent.com/makasi-tech/fronteend-challenge/main/tela_perfil.PNG" alt="texto réi" />
      </>
  );
}

export default Profile;
