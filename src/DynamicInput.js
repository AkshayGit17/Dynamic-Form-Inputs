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
  error: errorClass,
  errorMessage: errorMessageClass,
} = styles;

const Select = ({
  name,
  value,
  onInputChangeHandler,
  options,
  className,
  style,
}) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onInputChangeHandler}
      className={className}
      style={style}
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
  maxRows,
  addSeperator,
  containerStyles,
  inputRowStyles,
  textboxStyles,
  textareaStyles,
  selectStyles,
  addBtnStyles,
  removeBtnStyles,
  rowSeperatorStyles,
  errorStyles,
  errorMessageStyles,
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
      if (inputRowList.length === maxRows) {
        return inputRowList;
      }
      const inputRow = {};

      for (let key in inputRowList[0]) {
        if (key === 'id') continue;
        inputRow[key] = { ...inputRowList[0][key], value: '', error: false };
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
                const {
                  type,
                  value,
                  placeholder,
                  options,
                  requiredMessage,
                  error,
                } = inputRow[key];

                const classNames = [textboxClass];

                if (error) {
                  classNames.push(errorClass);
                }

                if (type === 'input') {
                  return (
                    <div>
                      <input
                        type="text"
                        name={key}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onInputChangeHandler(e, id)}
                        key={key}
                        className={classNames.join(' ')}
                        style={
                          error
                            ? { ...textboxStyles, ...errorStyles }
                            : textboxStyles
                        }
                      />
                      {error && (
                        <p
                          style={errorMessageStyles}
                          className={errorMessageClass}
                        >
                          {requiredMessage}
                        </p>
                      )}
                    </div>
                  );
                } else if (type === 'textarea') {
                  return (
                    <div>
                      <textarea
                        name={key}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onInputChangeHandler(e, id)}
                        key={key}
                        className={[...classNames, textareaClass].join(' ')}
                        style={
                          error
                            ? { ...textareaStyles, ...errorStyles }
                            : textareaStyles
                        }
                      />
                      {error && (
                        <p
                          style={{ ...errorMessageStyles, marginTop: '0' }}
                          className={errorMessageClass}
                        >
                          {requiredMessage}
                        </p>
                      )}
                    </div>
                  );
                } else if (type === 'select') {
                  return (
                    <div>
                      <Select
                        name={key}
                        value={value}
                        onInputChangeHandler={(e) =>
                          onInputChangeHandler(e, id)
                        }
                        key={key}
                        options={options}
                        className={[...classNames, selectClass].join(' ')}
                        style={
                          error
                            ? { ...selectStyles, ...errorStyles }
                            : selectStyles
                        }
                      />
                      {error && (
                        <p
                          style={errorMessageStyles}
                          className={errorMessageClass}
                        >
                          {requiredMessage}
                        </p>
                      )}
                    </div>
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
            {addSeperator && (
              <div
                className={rowSeperatorClass}
                style={rowSeperatorStyles}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default DynamicInput;
