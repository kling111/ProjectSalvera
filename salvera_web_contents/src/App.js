import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./App.css";
import {
  openCollectorRegistrationForm,
  backToHome,
  successfulRegistration,
} from "./index";
import { MenuItem, Select } from "@mui/material";

async function submitUserRegistrationForm() {
  const submitRegistrationLambdaAPIURL =
    "https://hd28kboqp5.execute-api.us-east-1.amazonaws.com/salvera_lambda_gw_stage/submit_form";

  await axios
    .post(`${submitRegistrationLambdaAPIURL}`, {
      full_name: `${document.getElementById("outlined-fullname").value}`,
      occupation: `${document.getElementById("outlined-occupation").value}`,
      city: `${document.getElementById("outlined-city").value}`,
      state: `${document.getElementById("outlined-state").value}`,
      postal_code: `${document.getElementById("outlined-postalcode").value}`,
    })
    .then((resp) => {
      successfulDataCollection(resp.data);
    });
}

async function submitPatientDataCollection(setSubmission) {
  const submitPatientDataAPIURL = "TODO";

  await axios
    .post(`${submitPatientDataAPIURL}`, {
      full_name: `${document.getElementById("outlined-fullname").value}`,
      occupation: `${document.getElementById("outlined-bmi").value}`,
      city: `${document.getElementById("outlined-city").value}`,
      state: `${document.getElementById("outlined-state").value}`,
      postal_code: `${document.getElementById("outlined-postalcode").value}`,
      data_collector: `${
        document.getElementById("simple-select-data-collector").value
      }`,
    })
    .then((resp) => {
      setSubmission([resp.data.data_collector_name, resp.data.patient_name]);
    });
}

async function getDataCollectors() {
  const retrieveDataCollectorsAPIURL = "TODO";

  await axios.get(`${retrieveDataCollectorsAPIURL}`).then((resp) => {
    return resp.data;
  });
}

export function SuccesfulRegistrationMessage(props) {
  return (
    <div className="App">
      <h1 className="App-header">Project Salvera</h1>
      <br />
      <br />
      <h1>
        Welcome to Project Salvera, {props.first_name} {props.last_name}!
      </h1>
      <br />
      <br />
      <Button variant="text" onClick={backToHome}>
        Back to Home
      </Button>
    </div>
  );
}

export function PatientDataCollectionForm() {
  const [salveraCollectorsMap, setSalveraCollectorsMap] = useState({});
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    setSalveraCollectorsMap(getDataCollectors());
  });

  return (
    <div className="App">
      <h1 className="App-header">Salvera Patient Data Collection</h1>
      <TextField id="outlined-fullname" label="Full Name" variant="outlined" />
      <br />
      <br />
      <TextField id="outlined-bmi" label="BMI" variant="outlined" />
      <br />
      <br />
      <TextField id="outlined-city" label="City" variant="outlined" />
      <br />
      <br />
      <TextField id="outlined-state" label="State" variant="outlined" />
      <br />
      <br />
      <TextField
        id="outlined-postalcode"
        label="Postal Code"
        variant="outlined"
      />
      <br />
      <br />
      <Select
        id="simple-select-data-collector"
        labelId="simple-select-data-collector-label"
        label="Data Collector"
      >
        {Object.entries(salveraCollectorsMap).map((dataCollector) => {
          <MenuItem value={dataCollector[0]}> {dataCollector[1]} </MenuItem>;
        })}
      </Select>
      <br />
      <br />
      <Button
        variant="contained"
        onClick={() => submitPatientDataCollection(setSubmission)}
      >
        Submit
      </Button>
      <br />
      <br />
      <Button variant="text" onClick={backToHome}>
        Back to Home
      </Button>
      {submission && (
        <div>
          <br />
          <br />
          <h1>
            Thank you {submission[0]}! We've recorded {submission[1]}'s
            information.
          </h1>
        </div>
      )}
    </div>
  );
}

export function UserRegistrationForm() {
  return (
    <div className="App">
      <h1 className="App-header">Data Collector Registration</h1>
      <TextField id="outlined-fullname" label="Full Name" variant="outlined" />
      <br />
      <br />
      <TextField
        id="outlined-occupation"
        label="Occupation"
        variant="outlined"
      />
      <br />
      <br />
      <TextField id="outlined-city" label="City" variant="outlined" />
      <br />
      <br />
      <TextField id="outlined-state" label="State" variant="outlined" />
      <br />
      <br />
      <TextField
        id="outlined-postalcode"
        label="Postal Code"
        variant="outlined"
      />
      <br />
      <br />
      <Button variant="contained" onClick={submitUserRegistrationForm}>
        Submit
      </Button>
      <br />
      <br />
      <Button variant="text" onClick={backToHome}>
        Back to Home
      </Button>
    </div>
  );
}

export function App() {
  return (
    <div className="App">
      <h1 className="App-header">Project Salvera</h1>
      <br />
      <Button variant="contained" onClick={openCollectorRegistrationForm}>
        Register Data Collector
      </Button>
      <br />
      <br />
      <Button variant="contained">Register Salvera Patient</Button>
      <br />
      <br />
      <h1>{false && "Hello World"}</h1>
    </div>
  );
}
