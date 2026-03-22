import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request, platform, cookies }) => {
    const apiUrl = platform?.env?.PUBLIC_API_BACKEND_URL;
    console.log('apiUrl:', apiUrl); // revisa en los logs del Worker
    const form = await request.formData();
    const username = form.get('email') as string;
    const password = form.get('password') as string;

    if (!username || !password) {
      return fail(400, { error: 'Email y contraseña son requeridos' });
    }

    try {
      const res = await fetch(`${apiUrl}/core/public/commands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'core.users.login',
          payload: { username, password }
        })
      });

      if (!res.ok) {
        const data = await res.json();
        return fail(400, { error: data.message || 'Error al iniciar sesión' });
      }

      const data = await res.json();
      const { accessToken, refreshToken, idToken } = data;

      cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
      });
      cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
      });
      cookies.set('idToken', idToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/'
      });

    } catch (e) {
      return fail(500, { error: 'Error de conexión con el servidor' });
    }

    redirect(303, '/dashboard');
  }
};