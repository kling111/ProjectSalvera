import json
import pymysql

import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    # Retrieve submission form arguments as a tuple
    record = retrieve_submission_parameters(event)

    # Insert record in salvera_data_collectors table
    conn = create_aurora_connection()
    is_success = insert_data_collector_record(conn, record)
    close_aurora_connection(conn)

    return create_lambda_response(record, is_success)


def create_lambda_response(record, is_success):
    response = {"headers": {
        "Content-Type": "application/json"
    }}

    response['statusCode'] = 200 if is_success else 500
    response['body'] = (f'Inserted data collector {record} in the salvera_data_collectors DB'
                        if is_success
                        else 'Failed to insert record')

    return response


def close_aurora_connection(conn):
    conn.close()


def insert_data_collector_record(conn, record):
    cur = conn.cursor()
    response = cur.execute(
        f'INSERT INTO salvera_data_collectors VALUES {(0, ) + record};')

    if response:
        conn.commit()
        return True
    return False


def create_aurora_connection():
    conn = pymysql.connect(
        host='salvera-aurora-cluster-instance-0.c4kifzwbccfs.us-east-1.rds.amazonaws.com',
        user='kdling',
        password="Pacino$123",
        db='salvera_admin',
    )

    return conn


def retrieve_submission_parameters(event):
    event_body = json.loads(event['body'])

    full_name_split = event_body['full_name'].split(" ")
    del event_body['full_name']
    event_body['first_name'], event_body['last_name'] = full_name_split[0], full_name_split[1]

    salvera_data_collector_column_keys = [
        'first_name', 'last_name', 'city', 'state', 'postal_code', 'occupation']

    return tuple(event_body[key] for key in salvera_data_collector_column_keys)
