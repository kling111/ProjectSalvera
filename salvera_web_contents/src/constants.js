export const marks = [
  {
    value: 1,
    label: "Jan",
  },
  {
    value: 2,
    label: "Feb",
  },
  {
    value: 3,
    label: "March",
  },
  {
    value: 4,
    label: "April",
  },
  {
    value: 5,
    label: "May",
  },
  {
    value: 6,
    label: "June",
  },
];

export const dataCollectorColumns = [
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

export const patientDataColumns = [
  { field: "patient_uuid", headerName: "Patient UUID", width: 100 },
  { field: "first_name", headerName: "First Name", width: 90 },
  { field: "last_name", headerName: "Last Name", width: 100 },
  { field: "bmi", headerName: "BMI", width: 60 },
  {
    field: "city",
    headerName: "City",
    width: 80,
  },
  { field: "state", headerName: "State", width: 60 },
  { field: "postal_code", headerName: "Postal Code", width: 100 },
  { field: "latitude", headerName: "Latitude", width: 100 },
  { field: "longitude", headerName: "Longitude", width: 100 },
  { field: "data_collector_id", headerName: "Data Collector ID", width: 125 },
];
