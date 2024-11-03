# Dynamic Form Inputs

Dynamic Form Inputs is a utility for adding or removing rows of desired form inputs.

## Usage

- 3 files have been mainly used in this project: App.js, DynamicInput.js and DynamicInput.module.css
- Have a state in the Component where you want to have DynamicInput Component(In this project we have the state in App Component)
- Initialize this state with an array having an object(row) with form inputs & this object will be the template for the rest of the rows.Below is the pattern of the state.
  ```
   const [inputRowList, setInputRowList] = useState([
       {
         id: 1,
         name: {
           type: 'input' | 'textarea' | 'select',
           value: '',
           placeholder: '',
           requiredMessage: '',
           options: []
         },
         name: {
           type: 'input' | 'textarea' | 'select',
           value: '',
           placeholder: '',
           requiredMessage: '',
           options: []
         },
         ...
         ...
         ...
       }
   ]);
  ```
- State example
  ```
    const [inputRowList, setInputRowList] = useState([
        {
          id: 1,
          name: {
            type: 'input',
            value: '',
            placeholder: 'Name',
            requiredMessage: 'Please enter name',
          },
          bio: {
            type: 'textarea',
            value: '',
            placeholder: 'Bio',
            requiredMessage: 'Please enter bio',
          },
          country: {
            type: 'select',
            value: '',
            options: [
              { label: 'select a country', value: '' },
              { label: 'India', value: 'india' },
              { label: 'Country 2', value: 'country2' },
              { label: 'Country 3', value: 'country3' },
            ],
            requiredMessage: 'Please select country',
          },
        },
    ]);
  ```
- Things to be noted while constructing the state:
  - id: 1 is a must.
  - Have name of the input as the property name.This is useful while getting field values.
    Eg: name, bio and country in the above state example
  - type for an input can only be input, textarea and select.
  - options property is applicable only for select input.
  - If you want to have validation for a particular input field have requiredMessage property.
  - If you want validation but you dont want message then set requiredMessage property to empty string
- DynamicInput component props
  - inputRowList - the above state(array)
  - setInputRowList - set function for the above state(fn)
  - maxRows - maximum number of rows that can be added(number)
  - addSeperator - whether you want seperator after each row or not(boolean)
  - containerStyles - styles for the Dynamic Input container(object)
  - inputRowStyles - styles for each row(object)
  - textboxStyles - general styles for all types of input(object)
  - textareaStyles - textarea input specific styles(object)
  - selectStyles - select input specific styles(object)
  - addBtnStyles - styles for add button(object)
  - removeBtnStyles - styles for remove button(object)
  - rowSeperatorStyles - styles for row seperator(object)
  - errorStyles - styles for input fields on error(object)
  - errorMessageStyles - styles for error message(object)
- To get input field values have the below function in the component where you have maintained the state and invoke it.
  ```
  const getValues = () => {
    const values = inputRowList.map((inputRow) => {
      const inputRowValues = {};
      for (let key in inputRow) {
        if (key === 'id') continue;
        inputRowValues[key] = inputRow[key].value;
      }
      return inputRowValues;
    });
    return values;
  };
  ```
- To validate the input fields have the below function in the component where you have maintained the state and invoke it.
  ```
  const validate = () => {
    setInputRowList((inputRowList) => {
      return inputRowList.map((inputRow) => {
        const inputRowClone = { ...inputRow };
        for (let key in inputRowClone) {
          if (key === 'id') continue;
          if (inputRowClone[key].hasOwnProperty('requiredMessage')) {
            if (!inputRowClone[key].value) {
              inputRowClone[key] = { ...inputRowClone[key], error: true };
            } else {
              inputRowClone[key] = { ...inputRowClone[key], error: false };
            }
          }
        }
        return inputRowClone;
      });
    });
  };
  ```
- To set input field values have the below function in the component where you have maintained the state and invoke it.
  ```
  const setValues = () => {
    setInputRowList((inputRowList) => {
      return data.map((dataRow, index) => {
        const inputRow = {};
        for (let key in dataRow) {
          inputRow[key] = {
            ...inputRowList[0][key],
            value: dataRow[key],
            error: false,
          };
        }
        inputRow.id = uuidv4();
        return inputRow;
      });
    });
  };
  ```
- Demo: https://codesandbox.io/s/dynamic-input-kwz53q
