import boto3
import random
import names
import uuid

dynamodb = boto3.resource('dynamodb')
patient_data_ddb = dynamodb.Table('salvera_patient_data')


def insert_patient_data_record(ddb, record):
    response = ddb.put_item(Item=record)
    return response


def delete_all_records(ddb, uuids):
    count = 0
    for uuid in uuids:
        response = ddb.delete_item(Key={"patient_uuid": uuid})
        print(count, response is not None)
        count += 1


def create_random_record():
    patient_record = {'patient_uuid': str(uuid.uuid4())}
    patient_record['first_name'] = names.get_first_name()
    patient_record['last_name'] = names.get_last_name()

    # Good
    patient_record['bmi'] = str(random.choices([random.randint(10, 20),
                                                random.randint(20, 25),
                                                random.randint(25, 35),
                                                random.randint(35, 50)],
                                weights=[0.5, 0.4, 0.05, 0.05])[0])

    # Bad
    '''patient_record['bmi'] = str(random.choices([random.randint(10, 20),
                                                random.randint(20, 25),
                                                random.randint(25, 35),
                                                random.randint(35, 50)],
                                weights=[0.4, 0.3, 0.2, 0.1])[0])'''

    city_states = [['Austin', 'TX'], ['Houston', 'TX'], ['Dallas', 'TX'], ['San Diego', 'CA'],
                   ['San Francisco', 'CA'], ['Seattle', 'WA'], [
                       'Kent', 'WA'], ['New York City', 'NY'],
                   ['Denver', 'CO'], ['Salt Lake City', 'UT'], [
                       'Kansas City', 'KS'], ['Chicago', 'OH'],
                   ['Las Vegas', 'NV'], ['Birmingham', 'AL'], [
                       'Honolulu', 'HI'], ['Boston', 'MA'],
                   ['West Lafayette', 'IN'], ['Miami', 'FL']]
    patient_record['city'], patient_record['state'] = random.choice(
        city_states)
    patient_record['postal_code'] = str(random.randint(10000, 99999))

    #patient_record['data_collector_id'] = str(1)
    #patient_record['data_collector_id'] = str(2)
    #patient_record['data_collector_id'] = str(3)
    #patient_record['data_collector_id'] = str(4)
    #patient_record['data_collector_id'] = str(5)
    patient_record['data_collector_id'] = str(6)

    # North
    '''patient_record['latitude'] = str(
        random.uniform(37.77981456768585, 37.79684092289836))
    patient_record['longitude'] = str(
        random.uniform(-122.44895667018291, -122.40299461234007))'''

    # South
    patient_record['latitude'] = str(
        random.uniform(37.73869219624082, 37.76155664705038))
    patient_record['longitude'] = str(
        random.uniform(-122.5060875794169, -122.44834421702203))

    return patient_record


#response = patient_data_ddb.scan()
#data = response["Items"]
#uuids = [record['patient_uuid'] for record in data]
#delete_all_records(patient_data_ddb, uuids)

for i in range(1000):
    insert_patient_data_record(patient_data_ddb, create_random_record())
    print(i)
