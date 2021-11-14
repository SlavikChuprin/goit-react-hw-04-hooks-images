import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles.css';

function Searchbar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const handleNameChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(request);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={request}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}

Searchbar.propsType = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
