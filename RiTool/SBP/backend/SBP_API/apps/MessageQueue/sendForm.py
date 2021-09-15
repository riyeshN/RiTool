import pika

credentials = pika.PlainCredentials('riyesh', '997518rN5128')
# parameters = pika.URLParameters('amqp://guest:guest@198.74.57.243:5672/%2F')
parameters = pika.ConnectionParameters('198.74.57.243', credentials=credentials)
connection = pika.BlockingConnection(parameters)
channel = connection.channel()
channel.queue_declare(queue='hello')
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()
