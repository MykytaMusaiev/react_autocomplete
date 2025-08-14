import { useEffect, useState } from 'react';
import { Person } from '../types/Person';
import cn from 'classnames';

interface Props {
  peoples: Person[];
  onSelected: (person: Person | null) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

const Autocomplete: React.FC<Props> = ({
  peoples,
  onSelected,
  query,
  onQueryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const filteredPeoples = peoples.filter(person =>
    person.name.toLowerCase().includes(debouncedQuery.toLowerCase().trim()),
  );

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  const handleSelect = (person: Person) => {
    onSelected(person);
    onQueryChange(person.name);
    setIsOpen(false);
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
            onChange={event => onQueryChange(event.target.value)}
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
