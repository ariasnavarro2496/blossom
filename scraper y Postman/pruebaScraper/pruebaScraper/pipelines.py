# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import psycopg2

# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class SavingToPostgrePipeline(object):
    def __init__(self):
        self.create_connection()
        

    def create_connection(self):
        self.connection = psycopg2.connect (
            host='localhost',
            user = 'postgres',
            password = 'admin',
            database = 'blossom',
            port = '8889'

        )
        self.cursor = self.connection.cursor()
