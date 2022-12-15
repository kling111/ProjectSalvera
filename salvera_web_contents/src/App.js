import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import "./App.css";
import {
  openCollectorRegistrationForm,
  backToHome,
  successfulRegistration,
  successfulDataCollection,
  openDataCollectionForm,
} from "./index";

async function submitUserRegistrationForm() {
  const submitRegistrationLambdaAPIURL =
    "https://hd28kboqp5.execute-api.us-east-1.amazonaws.com/salvera_lambda_gw_stage/submit_collector_registration";

  await axios
    .post(`${submitRegistrationLambdaAPIURL}`, {
      full_name: `${document.getElementById("outlined-full-name").value}`,
      occupation: `${document.getElementById("outlined-occupation").value}`,
      city: `${document.getElementById("outlined-city").value}`,
      state: `${document.getElementById("outlined-state").value}`,
      postal_code: `${document.getElementById("outlined-postal-code").value}`,
    })
    .then((resp) => {
      successfulRegistration(resp.data);
    });
}

async function retrieveDataCollectors() {
  const retrieveDataCollectorsLambdaAPIURL =
    "https://hd28kboqp5.execute-api.us-east-1.amazonaws.com/salvera_lambda_gw_stage/retrieve_data_collectors";

  let records;
  await axios.get(`${retrieveDataCollectorsLambdaAPIURL}`).then((resp) => {
    records = resp.data.records;
  });

  return records;
}

async function submitPatientDataCollectionForm() {
  const submitDataCollectionLambdaAPIURL =
    "https://hd28kboqp5.execute-api.us-east-1.amazonaws.com/salvera_lambda_gw_stage/submit_data_collection";

  await axios
    .post(`${submitDataCollectionLambdaAPIURL}`, {
      full_name: `${
        document.getElementById("outlined-patient-full-name").value
      }`,
      bmi: `${document.getElementById("outlined-bmi").value}`,
      city: `${document.getElementById("outlined-city").value}`,
      state: `${document.getElementById("outlined-state").value}`,
      postal_code: `${document.getElementById("outlined-postal-code").value}`,
      data_collector_id: `${
        document.getElementById("outlined-data-collector-id").value
      }`,
    })
    .then(() => {
      successfulDataCollection({
        patient_name: `${
          document.getElementById("outlined-patient-full-name").value
        }`,
      });
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

export function SuccesfulCollectionMessage(props) {
  return (
    <div className="App">
      <h1 className="App-header">Project Salvera</h1>
      <br />
      <br />
      <h1>Thank you! We've collected {props.patient_name}'s information.</h1>
      <br />
      <br />
      <Button variant="contained" onClick={openDataCollectionForm}>
        Back to Data Collection
      </Button>
      <br />
      <br />
      <Button variant="text" onClick={backToHome}>
        Back to Home
      </Button>
    </div>
  );
}

export function PatientDataCollectionForm() {
  return (
    <div className="App">
      <h1 className="App-header">Salvera Patient Data Collection</h1>
      <TextField
        id="outlined-patient-full-name"
        label="Patient Full Name"
        variant="outlined"
      />
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
        id="outlined-postal-code"
        label="Postal Code"
        variant="outlined"
      />
      <br />
      <br />
      <TextField
        id="outlined-data-collector-id"
        label="Data Collector ID"
        variant="outlined"
      />
      <br />
      <br />
      <Button variant="contained" onClick={submitPatientDataCollectionForm}>
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

export function UserRegistrationForm() {
  return (
    <div className="App">
      <h1 className="App-header">Data Collector Registration</h1>
      <TextField id="outlined-full-name" label="Full Name" variant="outlined" />
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
        id="outlined-postal-code"
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

const dataCollectorColumns = [
  { field: "collector_id", headerName: "Data Collector ID", width: 125 },
  { field: "first_name", headerName: "First Name", width: 90 },
  { field: "last_name", headerName: "Last Name", width: 100 },
  { field: "occupation", headerName: "Occupation", width: 140 },
  {
    field: "city",
    headerName: "City",
    width: 80,
  },
  { field: "state", headerName: "State", width: 60 },
  { field: "postal_code", headerName: "Postal Code", width: 100 },
];

const patientDataColumns = [
  { field: "patient_uuid", headerName: "Patient UUID", width: 90 },
  { field: "first_name", headerName: "First Name", width: 130 },
  { field: "last_name", headerName: "Last Name", width: 130 },
  { field: "bmi", headerName: "BMI", width: 130 },
  {
    field: "city",
    headerName: "City",
    width: 90,
  },
  { field: "state", headerName: "State", width: 130 },
  { field: "postal_code", headerName: "Postal Code", width: 130 },
  { field: "data_collector_id", headerName: "Data Collector ID", width: 130 },
];

export function App() {
  const [dataCollectorRows, setDataCollectorRows] = useState([]);
  useEffect(() => {
    retrieveDataCollectors().then((resp) => {
      setDataCollectorRows(resp);
    });
  }, []);

  return (
    <div className="App">
      <h1 className="App-header">Project Salvera</h1>
      <br />
      <Button variant="contained" onClick={openCollectorRegistrationForm}>
        Register Data Collector
      </Button>
      <br />
      <br />
      <Button variant="contained" onClick={openDataCollectionForm}>
        Collect Salvera Patient Data
      </Button>
      <br />
      <br />
      <div
        style={{ position: "absolute", left: 13, height: 400, width: "48.5%" }}
      >
        <h2> Data Collector Table </h2>
        <DataGrid
          rows={dataCollectorRows}
          getRowId={(row) => row.collector_id}
          columns={dataCollectorColumns}
          pageSize={10}
        />
      </div>
      <div
        style={{ position: "absolute", right: 13, height: 400, width: "48.5%" }}
      >
        <h2> Patient Data Table </h2>
        <DataGrid
          rows={dataCollectorRows}
          getRowId={(row) => row.collector_id}
          columns={patientDataColumns}
          pageSize={10}
        />
      </div>
    </div>
  );
}
