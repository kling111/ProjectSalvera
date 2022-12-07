import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./App.css";
import { openCollectorRegistrationForm, backToHome } from "./index";

async function submitForm() {
  console.log("Here");
  await axios.post(
    "https://hd28kboqp5.execute-api.us-east-1.amazonaws.com/salvera_lambda_gw_stage/submit_form",
    {
      "Full Name": `${document.getElementById("outlined-fullname").value}`,
      Occupation: `${document.getElementById("outlined-occupation").value}`,
      City: `${document.getElementById("outlined-city").value}`,
      State: `${document.getElementById("outlined-state").value}`,
      "Postal Code": `${document.getElementById("outlined-postalcode").value}`,
    }
  );
  console.log("done");
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
      <Button variant="standard" onClick={backToHome}>
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
      <button onClick={openCollectorRegistrationForm}>
        Register Data Collector
      </button>
      <br />
      <br />
      <button>Register Salvera Patient</button>
    </div>
  );
}
