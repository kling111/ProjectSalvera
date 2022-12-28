import React, { useEffect, useState } from "react";
import { TextField, Button, Slider } from "@mui/material";
import { Layer, Map, Source } from "react-map-gl";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

import {
  openCollectorRegistrationForm,
  backToHome,
  successfulRegistration,
  successfulDataCollection,
  openDataCollectionForm,
  openPatientDataHeatmap,
} from "./index";
import { heatmapLayer } from "./heatmapLayer";
import { marks, patientDataColumns, dataCollectorColumns } from "./constants";

import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";

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

async function retrievePatientData() {
  const retrievePatientDataLambdaAPIURL =
    "https://hd28kboqp5.execute-api.us-east-1.amazonaws.com/salvera_lambda_gw_stage/retrieve_patient_data";

  let records;
  await axios.get(`${retrievePatientDataLambdaAPIURL}`).then((resp) => {
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

export function SuccessfulRegistrationMessage(props) {
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

export function SuccessfulCollectionMessage(props) {
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

export function PatientDataHeatmap(props) {
  const patientDataGeoJSON = {
    type: "FeatureCollection",
    features: [],
  };

  props.patientData.forEach((record) => {
    patientDataGeoJSON.features.push({
      type: "Feature",
      properties: { bmi: parseFloat(record.bmi) },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(record.longitude),
          parseFloat(record.latitude),
        ],
      },
    });
  });

  function filterPatientBMIGeoJSON(filterValue) {
    const data = {
      type: "FeatureCollection",
      features: [],
    };

    props.patientData.forEach((record) => {
      if (filterValue === parseInt(record.data_collector_id)) {
        data.features.push({
          type: "Feature",
          properties: { bmi: parseFloat(record.bmi) },
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(record.longitude),
              parseFloat(record.latitude),
            ],
          },
        });
      }
    });

    return data;
  }

  const [filteredPatientBMI, setFilteredPatientBMI] = useState(
    filterPatientBMIGeoJSON(1)
  );

  return (
    <div className="App">
      <h1 className="App-header">Patient Data Heatmap</h1>
      <br />
      <br />
      <Slider
        sx={{ width: 400 }}
        aria-label="Date"
        defaultValue={1}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={1}
        max={6}
        onChange={(_, newMonth) =>
          setFilteredPatientBMI(filterPatientBMIGeoJSON(newMonth))
        }
      />
      <br />
      <br />
      <br />
      <Map
        initialViewState={{
          longitude: -122.44,
          latitude: 37.76,
          zoom: 11,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {filteredPatientBMI.features.length ? (
          <Source id="patientBMIData" type="geojson" data={filteredPatientBMI}>
            <Layer {...heatmapLayer}></Layer>
          </Source>
        ) : null}
      </Map>
      <br />
      <Button variant="text" onClick={backToHome}>
        Back to Home
      </Button>
    </div>
  );
}

export function App() {
  const [dataCollectorRows, setDataCollectorRows] = useState([]);
  useEffect(() => {
    retrieveDataCollectors().then((records) => {
      setDataCollectorRows(records);
    });
  }, []);

  const [patientDataRows, setPatientDataRows] = useState([]);
  useEffect(() => {
    retrievePatientData().then((records) => {
      setPatientDataRows(records);
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
      <Button
        variant="contained"
        onClick={() => openPatientDataHeatmap(patientDataRows)}
        disabled={!patientDataRows.length ? true : false}
      >
        Patient Data Visualization
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
          pageSize={100}
          rowsPerPageOptions={[]}
        />
      </div>
      <div
        style={{ position: "absolute", right: 13, height: 400, width: "48.5%" }}
      >
        <h2> Patient Data Table </h2>
        <DataGrid
          rows={patientDataRows}
          getRowId={(row) => row.patient_uuid}
          columns={patientDataColumns}
          pageSize={100}
          rowsPerPageOptions={[]}
        />
      </div>
    </div>
  );
}
