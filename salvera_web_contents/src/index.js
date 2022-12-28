import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  App,
  UserRegistrationForm,
  SuccessfulRegistrationMessage,
  PatientDataCollectionForm,
  SuccessfulCollectionMessage,
  PatientDataHeatmap,
} from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export function openCollectorRegistrationForm() {
  root.render(
    <React.StrictMode>
      <UserRegistrationForm />
    </React.StrictMode>
  );
}

export function openDataCollectionForm() {
  root.render(
    <React.StrictMode>
      <PatientDataCollectionForm />
    </React.StrictMode>
  );
}

export function openPatientDataHeatmap(patientData) {
  root.render(
    <React.StrictMode>
      <PatientDataHeatmap patientData={patientData} />
    </React.StrictMode>
  );
}

export function successfulRegistration(response) {
  root.render(
    <React.StrictMode>
      <SuccessfulRegistrationMessage
        first_name={response.first_name}
        last_name={response.last_name}
      />
    </React.StrictMode>
  );
}

export function successfulDataCollection(response) {
  root.render(
    <React.StrictMode>
      <SuccessfulCollectionMessage patient_name={response.patient_name} />
    </React.StrictMode>
  );
}

export function backToHome() {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
