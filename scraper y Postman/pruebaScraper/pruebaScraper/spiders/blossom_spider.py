import scrapy
from pruebaScraper.items import PruebascraperItem


class BlossomSpiderSpider(scrapy.Spider):
    name = "blossom_spider"
    allowed_domains = ["www.blossom.net"]
    start_urls = ["https://www.blossom.net/"]

    def parse(self, response):

        texto = response.css('p.main-description')

        for text in texto:

            yield {
                'text': text.css('p.main-description').get()
            }
        pass
