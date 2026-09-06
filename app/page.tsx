import App from '../src/App';
import { pageMetadata, person, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
export const metadata = pageMetadata('/', 'Timur Isachenko | AI CTO & Principal Solution Architect', 'Timur Isachenko builds AI-native products and high-scale distributed systems. Explore 17+ years of engineering work, technical books, and research.');
metadata.title = { absolute: 'Timur Isachenko | AI CTO & Principal Solution Architect' };
export default function Page() {
  return <><JsonLd data={{ '@context': 'https://schema.org', '@graph': [person, { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: 'Timur Isachenko', publisher: { '@id': person['@id'] } }] }} /><App /></>;
}
