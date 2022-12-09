import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./App.css";
import { openCollectorRegistrationForm, backToHome } from "./index";

async function submitForm() {
  const submitFormURL =
    "https://hd28kboqp5.execute-api.us-east-1.amazonaws.com/salvera_lambda_gw_stage/submit_form";

  await axios
    .post(`${submitFormURL}`, {
      full_name: `${document.getElementById("outlined-fullname").value}`,
      occupation: `${document.getElementById("outlined-occupation").value}`,
      city: `${document.getElementById("outlined-city").value}`,
      state: `${document.getElementById("outlined-state").value}`,
      postal_code: `${document.getElementById("outlined-postalcode").value}`,
    })
    .then((response) => {
      console.log(response.data);
    });
}

export function UserRegistrationForm() {
  return (
    <div className="Form">
      <h1 className="Form-header">Data Collector Registration</h1>
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
      <Button variant="contained" onClick={submitForm}>
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
    </div>
  );
}
