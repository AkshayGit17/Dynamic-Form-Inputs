import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import DynamicInput from "./DynamicInput";

import styles from "./App.module.css";

import data from "./data.json";

function App() {
  const [inputRowList, setInputRowList] = useState([
    {
      id: uuidv4(),
      name: {
        type: "input",
        value: "",
        placeholder: "Name",
        requiredMessage: "Please enter name",
      },
      bio: {
        type: "textarea",
        value: "",
        placeholder: "Bio",
        requiredMessage: "Please enter bio",
      },
      country: {
        type: "select",
        value: "",
        options: [
          { label: "select a country", value: "" },
          { label: "India", value: "india" },
          { label: "Country 2", value: "country2" },
          { label: "Country 3", value: "country3" },
        ],
        requiredMessage: "Please select country",
      },
    },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  const validate = () => {
    setInputRowList((inputRowList) => {
      return inputRowList.map((inputRow) => {
        const inputRowClone = { ...inputRow };
        for (let key in inputRowClone) {
          if (key === "id") continue;
          if (inputRowClone[key].hasOwnProperty("requiredMessage")) {
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

  const getValues = () => {
    const values = inputRowList.map((inputRow) => {
      const inputRowValues = {};
      for (let key in inputRow) {
        if (key === "id") continue;
        inputRowValues[key] = inputRow[key].value;
      }
      return inputRowValues;
    });
    console.log(values);
    return values;
  };

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

  useEffect(() => {
    if (isLoaded) {
      setValues();
    }
  }, [isLoaded]);

  return (
    <div className="App">
      <DynamicInput
        inputRowList={inputRowList}
        setInputRowList={setInputRowList}
        maxRows={6}
        addSeperator
        rowSeperatorStyles={{ width: "52rem" }}
      />
      {/* added the below buttons for demo purpose only */}
      <div className={styles.btnContainer}>
        <button
          className={styles.btn}
          style={{ background: "#143268" }}
          onClick={() => setIsLoaded(true)}
        >
          Load Values
        </button>
        <button
          className={styles.btn}
          style={{ background: "#143268" }}
          onClick={validate}
        >
          Validate
        </button>
        <button
          className={styles.btn}
          style={{ background: "#143268" }}
          onClick={getValues}
        >
          Console Values
        </button>
      </div>
    </div>
  );
}

export default App;
