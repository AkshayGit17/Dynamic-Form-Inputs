import React from 'react';

const Select = ({ name, value, onInputChangeHandler, options }) => {
  return (
    <select name={name} value={value} onChange={onInputChangeHandler}>
      {options.map((option) => {
        const { label, value } = option;
        return (
          <option key={value} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
};

const DynamicInput = ({ inputRowList, setInputRowList }) => {
  const onInputChangeHandler = (e, id) => {};

  return (
    <div className="inputContainer">
      {inputRowList.map((inputRow) => {
        const { id } = inputRow;

        return (
          <React.Fragment key={id}>
            <div className="inputRow">
              {Object.keys(inputRow).map((key) => {
                if (key === 'id') return null;
                const { type, value, placeholder, options } = inputRow[key];

                if (type === 'input') {
                  return (
                    <input
                      type="text"
                      name={key}
                      placeholder={placeholder}
                      value={value}
                      onChange={(e) => onInputChangeHandler(e, id)}
                      key={key}
                    />
                  );
                } else if (type === 'textarea') {
                  return (
                    <textarea
                      name={key}
                      placeholder={placeholder}
                      value={value}
                      onChange={(e) => onInputChangeHandler(e, id)}
                      key={key}
                      rows={10}
                      cols={4}
                    />
                  );
                } else if (type === 'select') {
                  return (
                    <Select
                      name={key}
                      value={value}
                      onInputChangeHandler={(e) => onInputChangeHandler(e, id)}
                      key={key}
                      options={options}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {id === 1 ? <button>Add</button> : <button>Remove</button>}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DynamicInput;
