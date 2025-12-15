import React, { Component } from 'react';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      user: null,
      repos: [],
      loading: false,
      error: null
    };
  }

  fetchUserData = async (username) => {
    this.setState({ loading: true, error: null });
    
    try {
      const proxyUrl = 'https://corsproxy.io/?';
      const userUrl = `https://api.github.com/users/${username}`;
      
      const userResponse = await fetch(proxyUrl + encodeURIComponent(userUrl), {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!userResponse.ok) {
        if (userResponse.status === 404) throw new Error('User not found');
        throw new Error(`HTTP error! status: ${userResponse.status}`);
      }
      
      const userData = await userResponse.json();

      const reposUrl = `https://api.github.com/users/${username}/repos`;
      const reposResponse = await fetch(proxyUrl + encodeURIComponent(reposUrl), {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
      }
      
      const reposData = await reposResponse.json();

      this.setState({
        user: userData,
        repos: reposData,
        username: username,
        loading: false
      });
    } catch (error) {
      //console.error('Fetch error:', error);
      this.setState({
        error: error.message,
        loading: false,
        user: null,
        repos: []
      });
    }
  };

  handleReset = () => {
    this.setState({
      username: '',
      user: null,
      repos: [],
      error: null
    });
  };

  render() {
    const { user, repos, loading, error } = this.state;

    return (
      <div>
        <h1>GitHub User Finder</h1>
        
        {!user && !loading && !error && (
          <UserForm onSearch={this.fetchUserData} />
        )}

        {loading && <p>Loading...</p>}
        
        {error && (
          <div>
            <p>Error: {error}</p>
            <button onClick={() => this.setState({ error: null })}>Try Again</button>
          </div>
        )}

        {user && (
          <UserDetails 
            user={user} 
            repos={repos} 
            onReset={this.handleReset}
          />
        )}
      </div>
    );
  }
}

export default App;