import logging
import json
import boto3

s3 = boto3.resource('s3')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    patient_data = get_patient_data()

    return create_lambda_response(patient_data)


def create_lambda_response(data):
    response = {"headers": {
        "Content-Type": "application/json"
    }}

    response['statusCode'] = 200
    response['body'] = json.dumps(data)

    return response


def get_patient_data():
    patient_data_obj = s3.Object('project-salvera-data', 'bmi.json')
    patient_data_json = json.loads(patient_data_obj.get()['Body'].read())

    return patient_data_json
