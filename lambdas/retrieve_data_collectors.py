import json
import pymysql

import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)


def handler(event, context):
    # Retrive names and IDs from salvera_data_collectors table
    conn = create_aurora_connection()
    user_id_name_map = retrieve_data_collector_records(conn)
    close_aurora_connection(conn)

    return create_lambda_response(user_id_name_map)


def create_lambda_response(user_id_name_map):
    response = {"headers": {
        "Content-Type": "application/json"
    }}

    response['statusCode'] = 200
    response['body'] = json.dumps(user_id_name_map)

    return response


def close_aurora_connection(conn):
    conn.close()


def retrieve_data_collector_records(conn):
    cur = conn.cursor()
    cur.execute(
        f'SELECT * FROM salvera_data_collectors;')
    response = cur.fetchall()

    user_id_name_map = {record[0]: " ".join(
        [record[1], record[2]]) for record in response}
    return user_id_name_map


def create_aurora_connection():
    conn = pymysql.connect(
        host='salvera-aurora-cluster-instance-0.c4kifzwbccfs.us-east-1.rds.amazonaws.com',
        user='kdling',
        password="Pacino$123",
        db='salvera_admin',
    )

    return conn
