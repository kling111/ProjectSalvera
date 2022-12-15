import logging
import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    patient_data_ddb = dynamodb.Table('salvera_patient_data')

    # Retrieve submission form arguments as a dict
    submission_params = json.loads(event['body'])
    record = create_record_from_submission_params(submission_params)

    # Insert record in salvera_data_collectors table
    response = insert_patient_data_record(patient_data_ddb, record)

    return create_lambda_response(response)


def create_lambda_response(response):
    response = {"headers": {
        "Content-Type": "application/json"
    }}

    response['statusCode'] = 200 if response else 500
    response['body'] = (json.dumps(response)
                        if response
                        else 'Failed to insert record')

    return response


def insert_patient_data_record(ddb, record):
    response = ddb.put_item(Item=record)
    return response


def create_record_from_submission_params(submission_params):
    salvera_patient_data_column_keys = [
        'bmi', 'city', 'state', 'postal_code', 'data_collector_id']
    patient_record = {key: submission_params[key]
                      for key in salvera_patient_data_column_keys}

    full_name_split = submission_params['full_name'].split(" ")
    patient_record['patient_uuid'] = str(uuid.uuid4())
    patient_record['first_name'], patient_record['last_name'] = full_name_split

    return patient_record
