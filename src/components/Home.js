import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'react-bootstrap-icons';
import './Home.css'

function Home() {
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <body>
    <div className='container'>
      <h1>Search Devs</h1>
      <div className='inputGroup'>
      <input type="text" placeholder='Type the username here...' onChange={handleInputChange} />
      <button><Link to={`/profile/${username}`} style={{color: '#fafafa', textDecoration: 'none'}} ><Search style={{background: 'none'}}/>Buscar</Link></button>
      </div>
    </div>
    </body>
  );
}

export default Home;