import boto3


def store_file_s3(file, user_id, date, unique_uuid, file_name):
    s3 = boto3.resource('s3')
    bucket_name = "ritool"
    s3.Bucket(bucket_name).upload_fileobj(file, f"{user_id}/{date}/{unique_uuid}/{file_name}")


def delete_s3_object(key):
    s3 = boto3.resource('s3')
    bucket_name = "ritool"
    s3.Bucket(bucket_name).objects.filter(Prefix=key).delete()
