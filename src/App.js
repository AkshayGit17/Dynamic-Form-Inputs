import { useState } from 'react';

import './App.css';
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
        placeholder: 'Age',
      },
      select1: {
        type: 'select',
        value: '',
        options: [
          { label: 'select a country', value: '' },
          { label: 'India', value: 'india' },
          { label: 'Japan', value: 'japan' },
        ],
      },
    },
  ]);

  return (
    <div className="App">
      <DynamicInput
        inputRowList={inputRowList}
        setInputRowList={setInputRowList}
      />
    </div>
  );
}

export default App;
