import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';



const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;
    return resolve(event, {
      transformPageChunk: ({ html }) =>
        html
          .replace('%paraglide.lang%', locale)
          .replace('%paraglide.dir%', getTextDirection(locale))
    });
  });


const MAIN_DOMAIN = 'tallerpro.com';

const EXLUDED_DOMAINS = [
  MAIN_DOMAIN,
  `www.${MAIN_DOMAIN}`,
  'localhost',
  '127.0.0.1',
];

const handleTenant: Handle = async ({ event, resolve }) => {
  const hostname = (event.request.headers.get('host') ?? '').split(':')[0];
  const apiUrl = event.platform?.env?.PUBLIC_API_BACKEND_URL;

  console.log("Hostname " + hostname)
  if (EXLUDED_DOMAINS.includes(hostname)) {
    return resolve(event);
  }

  let domain: string;
  if (hostname.endsWith(`.${MAIN_DOMAIN}`)) {
    domain = hostname.replace(`.${MAIN_DOMAIN}`, '');
  } else {
    domain = hostname;
  }

  try {
    const res = await fetch(`${apiUrl}/core/public/tenant/resolve?domain=${domain}`);
    if (res.ok) {
      event.locals.tenant = await res.json();
    }
  } catch (e) {
    console.error('Error resolving tenant:', e);
  }

  return resolve(event);
};
export const handle: Handle = sequence(handleTenant, handleParaglide);