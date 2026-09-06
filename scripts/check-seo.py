"""Check the production server's crawlable HTML: python3 scripts/check-seo.py [base]."""
import json
import sys
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000'
SITE = 'https://timurisa.com'
class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.canonicals, self.links, self.schemas, self.meta = [], [], [], {}
        self.title, self.in_title, self.schema = '', False, None
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a['href'])
        if tag == 'a': self.links.append(a.get('href', ''))
        if tag == 'meta': self.meta[a.get('name', a.get('property'))] = a.get('content')
        if tag == 'title': self.in_title = True
        if tag == 'script' and a.get('type') == 'application/ld+json': self.schema = ''
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.schema is not None: self.schema += data
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.schema is not None:
            self.schemas.append(json.loads(self.schema))
            self.schema = None

def get(path):
    return urllib.request.urlopen(BASE + path)

xml = ET.fromstring(get('/sitemap.xml').read())
urls = [entry.find('{*}loc').text for entry in xml]
assert len(urls) == len(set(urls)), 'Duplicate sitemap URLs'
assert all('#' not in url for url in urls), 'Fragment URL in sitemap'
assert len([u for u in urls if '/projects/' in u]) == 23, 'Missing project URLs'
titles = set()
for url in urls:
    path = url.removeprefix(SITE) or '/'
    response = get(path)
    assert response.status == 200
    page = Page(response.read().decode())
    assert len(page.canonicals) == 1 and page.canonicals[0].rstrip('/') == url.rstrip('/'), (path, page.canonicals)
    assert page.title and page.title not in titles, (path, 'Duplicate title')
    assert page.title.count('Timur Isachenko') == 1, (path, page.title)
    titles.add(page.title)
    assert page.meta.get('description'), (path, 'Missing description')
    assert page.meta.get('og:url', '').rstrip('/') == url.rstrip('/'), (path, 'Wrong OG URL')
    assert page.meta.get('twitter:card') == 'summary_large_image'
    assert 'noindex' not in page.meta.get('robots', '')
    if path == '/': assert page.schemas[0]['@graph'][0]['@type'] == 'Person'
    if path == '/book':
        assert page.schemas[0]['@type'] == 'ItemList'
        assert len(page.schemas[0]['itemListElement']) == 3
        assert all(item['item']['@type'] == 'Book' for item in page.schemas[0]['itemListElement'])
    if path == '/blog':
        for post in [u.removeprefix(SITE) for u in urls if '/blog/' in u]:
            assert post in page.links, ('Article absent from server HTML', post)
    if '/blog/' in path:
        assert page.schemas[0]['@type'] == 'BlogPosting'
        assert page.schemas[0]['mainEntityOfPage'] == url
        assert page.schemas[0]['publisher']['@type'] == 'Person'
for path in ['/definitely-not-a-page', '/projects/definitely-not-a-project', '/blog/definitely-not-a-post']:
    try:
        get(path)
        raise AssertionError(('Expected HTTP 404', path))
    except urllib.error.HTTPError as error:
        assert error.code == 404, (path, error.code)
robots = get('/robots.txt').read().decode()
assert 'Disallow: /studio' in robots and f'Sitemap: {SITE}/sitemap.xml' in robots
studio = Page(get('/studio').read().decode())
assert 'noindex' in studio.meta.get('robots', ''), 'Studio must not be indexed'
image = get('/opengraph-image')
assert image.headers.get_content_type() == 'image/png'
data = image.read()
assert int.from_bytes(data[16:20], 'big') == 1200 and int.from_bytes(data[20:24], 'big') == 630
print(f'PASS: {len(urls)} canonical pages, unique titles, descriptions, social metadata, server-rendered article links, JSON-LD, sitemap, robots, admin noindex, 404s, and 1200×630 social image.')
