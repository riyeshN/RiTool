import pika
import sys


def form_file_producer(routing_key, file):
    credentials = pika.PlainCredentials('riyesh', '997518rN5128')
    parameters = pika.ConnectionParameters('198.74.57.243', credentials=credentials)
    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()
    channel.exchange_declare(exchange='topic_logs', exchange_type='topic')

    channel.basic_publish(
        exchange='topic_logs', routing_key=routing_key, body=file)
    print(" [x] Sent %r:%r" % (routing_key, "done"))
    connection.close()
