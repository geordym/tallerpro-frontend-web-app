import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
  return {
    apiUrl: platform?.env?.PUBLIC_API_BACKEND_URL
  };
};