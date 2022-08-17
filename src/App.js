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
      },
      input2: {
        type: 'textarea',
        value: '',
        placeholder: 'Bio',
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
      },
    },
  ]);

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
