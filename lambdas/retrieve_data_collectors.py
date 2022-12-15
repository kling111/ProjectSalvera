import json
import pymysql

import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    # Retrive names and IDs from salvera_data_collectors table
    conn = create_aurora_connection()
    records = retrieve_data_collector_records(conn)
    close_aurora_connection(conn)

    return create_lambda_response(records)


def create_lambda_response(records):
    response = {"headers": {
        "Content-Type": "application/json"
    }}

    response['statusCode'] = 200
    response['body'] = json.dumps({'records': records})

    return response


def close_aurora_connection(conn):
    conn.close()


def retrieve_data_collector_records(conn):
    cur = conn.cursor()
    cur.execute(
        f'SELECT * FROM salvera_data_collectors;')
    response = cur.fetchall()

    columns_names = ['collector_id', 'first_name', 'last_name',
                     'occupation', 'city', 'state', 'postal_code']
    records = [{key: value for key, value in zip(
        columns_names, record)} for record in response]
    return records


def create_aurora_connection():
    conn = pymysql.connect(
        host='salvera-aurora-cluster-instance-0.c4kifzwbccfs.us-east-1.rds.amazonaws.com',
        user='kdling',
        password="Pacino$123",
        db='salvera_admin',
    )

    return conn
