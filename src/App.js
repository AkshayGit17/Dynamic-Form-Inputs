import { useState } from 'react';

import DynamicInput from './DynamicInput';

function App() {
  const [inputRowList, setInputRowList] = useState([
    {
      id: 1,
      input1: {
        type: 'input',
        value: '',
        placeholder: 'Name',
        requiredMessage: 'Please enter name',
      },
      input2: {
        type: 'textarea',
        value: '',
        placeholder: 'Bio',
        requiredMessage: 'Please enter bio',
      },
      select1: {
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

  return (
    <div className="App">
      <DynamicInput
        inputRowList={inputRowList}
        setInputRowList={setInputRowList}
        maxRows={6}
        addSeperator
        rowSeperatorStyles={{ width: '52rem' }}
      />
    </div>
  );
}

export default App;
