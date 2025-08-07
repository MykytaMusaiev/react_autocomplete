import React, { useState } from 'react';
import './App.scss';
import { peopleFromServer } from './data/people';
import Autocomplete from './components/Autocomplete';

export const App: React.FC = () => {
  const [currentHuman, setCurrentHuman] = useState(null);
  const [query, setQuery] = useState('');

  const handleHumanPick = person => {
    setCurrentHuman(person);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    if (currentHuman) {
      setCurrentHuman(null);
    }
  };

  return (
    <div className="container">
      <main className="section is-flex is-flex-direction-column">
        <h1 className="title" data-cy="title">
          {currentHuman
            ? `${currentHuman.name} (${currentHuman.born} - ${currentHuman.died})`
            : 'No selected person'}
        </h1>

        <Autocomplete
          peoples={peopleFromServer}
          handleHumanPick={handleHumanPick}
          query={query}
          handleQueryChange={handleQueryChange}
        />

        {/* <div
          className="
            notification
            is-danger
            is-light
            mt-3
            is-align-self-flex-start
          "
          role="alert"
          data-cy="no-suggestions-message"
        >
          <p className="has-text-danger">No matching suggestions</p>
        </div> */}
      </main>
    </div>
  );
};
