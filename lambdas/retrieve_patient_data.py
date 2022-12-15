import logging
import json
import boto3

dynamodb = boto3.resource('dynamodb')

logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    patient_data_ddb = dynamodb.Table('salvera_patient_data')
    patient_data = scan_patient_data(patient_data_ddb)

    return create_lambda_response(patient_data)


def create_lambda_response(data):
    response = {"headers": {
        "Content-Type": "application/json"
    }}

    response['statusCode'] = 200
    response['body'] = json.dumps({'records': data})

    return response


def scan_patient_data(ddb):
    response = ddb.scan()
    data = response['Items']

    while 'LastEvaluatedKey' in response:
        response = ddb.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
        data.extend(response['Items'])

    return data
