// Define the FilterSection component
const FilterSection = ({ title, options, selectedOptions, onSelect }) => {
    return (
      <div className="filter-section">
        <h4>{title}</h4>
        {options.map((option) => (
          <div key={option} className="filter-option">
            <input
              type="checkbox"
              id={`filter-${title}-${option}`}
              name={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => onSelect(option)}
            />
            <label htmlFor={`filter-${title}-${option}`}>{option}</label>
          </div>
        ))}
      </div>
    );
  };
  