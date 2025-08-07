import { useState } from 'react';
import { Person } from '../types/Person';
import cn from 'classNames';

interface Props {
  peoples: Person[];
  handleHumanPick: (person: Person | null) => void;
  query: string;
  handleQueryChange: (query: string) => void;
}

const Autocomplete: React.FC<Props> = ({
  peoples,
  handleHumanPick,
  query,
  handleQueryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filteredPeoples = peoples.filter(person =>
    person.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (person: Person) => {
    handleHumanPick(person);
    handleQueryChange(person.name);
    setIsOpen(false);
  };

  const onChange = event => {
    handleQueryChange(event.target.value);
    setIsOpen(true);
  };

  const showNoResults = isOpen && query && filteredPeoples.length === 0;

  return (
    <div className="Autocomplete-wrapper is-align-self-flex-start is-relative">
      <div className={cn('dropdown', { 'is-active': isOpen })}>
        <div className="dropdown-trigger">
          <input
            value={query}
            type="text"
            placeholder="Enter a part of the name"
            className="input"
            data-cy="search-input"
            onFocus={() => setIsOpen(true)}
            onChange={event => onChange(event)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          />
        </div>

        <div className="dropdown-menu" role="menu" data-cy="suggestions-list">
          <div className="dropdown-content">
            {filteredPeoples.map(person => (
              <div
                className="dropdown-item"
                data-cy="suggestion-item"
                key={person.slug}
              >
                <p
                  className="has-text-link"
                  onClick={() => handleSelect(person)}
                >
                  {person.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showNoResults && (
        <div
          className="
          notification
          is-danger
          is-light
          mt-3
          is-align-self-flex-start"
          role="alert"
          data-cy="no-suggestions-message"
        >
          <p className="has-text-danger">No matching suggestions</p>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
