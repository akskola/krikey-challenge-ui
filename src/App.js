import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimesCircle, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Avatar from "./images/Avatar.png"
import logo from './images/logo.jpg';

function App() {
  const [authors, setAuthors] = useState([]);
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    // Commenting out the actual API call
    // axios.get('http://localhost:3000/api/authors')
    //   .then(response => {
    //     setAuthors(response.data);
    //   })
    //   .catch(error => console.error('Error fetching data:', error));

    // Simulate API call with static JSON file
    axios.get('/data.json')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const removeAuthor = (authorToRemove) => {
    setRemoving(authorToRemove);
    setTimeout(() => {
      setAuthors(authors.filter(author => author.name !== authorToRemove.name));
      setRemoving(null);
    }, 800);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Company Logo" className="navbar-logo" />
          <div className="navbar-links">
            <a href="#howtoanimate">
              How to Animate <FontAwesomeIcon icon={faAngleDown} />
            </a>
            <a href="#business">
              Business <FontAwesomeIcon icon={faAngleDown} />
            </a>
            <a href="#education">
              Education <FontAwesomeIcon icon={faAngleDown} />
            </a>
            <a href="#socialmedia">
              Social Media <FontAwesomeIcon icon={faAngleDown} />
            </a>
            <a href="#pricing">Pricing</a>
            <a href="#aboutus">About Us</a>
          </div>
        </div>
        <div className="navbar-right">
          <button className="get-started-btn">Get Started</button>
        </div>
      </nav>
      <div className="authors-container">
        <div className="authors-header">
          <div className="back-icon">
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <span>You have {authors.length} Team Members</span>
        </div>
        <ul className="authors-list">
          {authors.map((author) => (
            <li key={author.name} className={`author-item ${removing && removing.name === author.name ? 'author-item-removing' : ''}`}>
              <img src={Avatar} alt={author.name} className="author-image" />
              <div className="author-info">
                <h2 className="author-name">{author.name}</h2>
                <p className="author-revenue">
                  Total Revenue: ${author.total_revenue}
                </p>
              </div>
              <button className="cross-mark-icon" onClick={() => removeAuthor(author)}>
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
