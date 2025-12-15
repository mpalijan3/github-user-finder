import React from 'react';

const UserDetails = ({ user, repos, onReset }) => {
  if (!user || !repos) return null;
    return (
    <div>
      <div>
        <img src={user.avatar_url} alt={user.name} width="100" />
        <h2>{user.name}</h2>
        <p>Location: {user.location}</p>
        <p>Bio: {user.bio}</p>
      </div>
      <div>
        <h3>Repositories:</h3>
        <ul>
          {repos.map(repo => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};

export default UserDetails;

import PropTypes from 'prop-types';

UserDetails.propTypes = {
  user: PropTypes.object.isRequired,
  repos: PropTypes.array.isRequired,
  onReset: PropTypes.func.isRequired
};