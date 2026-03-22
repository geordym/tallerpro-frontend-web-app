import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform, cookies }) => {
  const apiUrl = platform?.env?.PUBLIC_API_BACKEND_URL;
  const accessToken = cookies.get('accessToken');

  if (!accessToken) {
    throw redirect(303, '/login');
  }

  try {
    const res = await fetch(`${apiUrl}/core/tenant/my-tenants`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (res.status === 401) {
      cookies.delete('accessToken', { path: '/' });
      cookies.delete('refreshToken', { path: '/' });
      cookies.delete('idToken', { path: '/' });
      throw redirect(303, '/login');
    }

    if (!res.ok) throw new Error('Error cargando tenants');

    const data = await res.json();

    return {
      tenants: data.tenants ?? []
    };

  } catch (e) {
    return { tenants: [], error: 'Error cargando tenants' };
  }
};