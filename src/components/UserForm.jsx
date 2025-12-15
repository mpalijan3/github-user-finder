import React, { useState } from 'react';

const UserForm = ({ onSearch }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">GitHub username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. facebook"
        />
      </div>
      <button type="submit">GO!</button>
    </form>
  );
};

export default UserForm;

import PropTypes from 'prop-types';

UserForm.propTypes = {
  onSearch: PropTypes.func.isRequired
};