import React from 'react';

import styles from './DynamicInput.module.css';

const {
  inputContainer: containerClass,
  inputRow: inputRowClass,
  textbox: textboxClass,
  textarea: textareaClass,
  select: selectClass,
  btn: btnClass,
  addBtn: addBtnClass,
  removeBtn: removeBtnClass,
  rowSeperator: rowSeperatorClass,
} = styles;

const Select = ({ name, value, onInputChangeHandler, options, className }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onInputChangeHandler}
      className={className}
    >
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

const DynamicInput = ({
  inputRowList,
  setInputRowList,
  containerStyles,
  inputRowStyles,
  textboxStyles,
  textareaStyles,
  selectStyles,
  addBtnStyles,
  removeBtnStyles,
  rowSeperatorStyles,
}) => {
  const onInputChangeHandler = (e, id) => {
    setInputRowList((inputRowList) => {
      const { name, value } = e.target;
      return inputRowList.map((inputRow) => {
        if (inputRow.id === id) {
          return {
            ...inputRow,
            [name]: { ...inputRow[name], value },
          };
        } else {
          return inputRow;
        }
      });
    });
  };

  const onAddClickHandler = () => {
    setInputRowList((inputRowList) => {
      const inputRow = {};

      for (let key in inputRowList[0]) {
        if (key === 'id') continue;
        inputRow[key] = { ...inputRowList[0][key], value: '' };
      }

      if (inputRowList.length === 1) {
        inputRow.id = 2;
      } else {
        inputRow.id = inputRowList[inputRowList.length - 1].id + 1;
      }

      return inputRowList.concat(inputRow);
    });
  };

  const onDeleteClickHandler = (id) => {
    setInputRowList((inputRowList) => {
      return inputRowList.filter((inputRow) => inputRow.id !== id);
    });
  };

  return (
    <div className={containerClass} style={containerStyles}>
      {inputRowList.map((inputRow) => {
        const { id } = inputRow;

        return (
          <React.Fragment key={id}>
            <div className={inputRowClass} style={inputRowStyles}>
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
                      className={textboxClass}
                      style={textboxStyles}
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
                      className={[textboxClass, textareaClass].join(' ')}
                      style={textareaStyles}
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
                      className={[textboxClass, selectClass].join(' ')}
                      style={selectStyles}
                    />
                  );
                } else {
                  return null;
                }
              })}
              {id === 1 ? (
                <button
                  onClick={onAddClickHandler}
                  className={[btnClass, addBtnClass].join(' ')}
                  style={addBtnStyles}
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={() => onDeleteClickHandler(id)}
                  className={[btnClass, removeBtnClass].join(' ')}
                  style={removeBtnStyles}
                >
                  Remove
                </button>
              )}
            </div>
            <div className={rowSeperatorClass} style={rowSeperatorStyles}></div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DynamicInput;
