import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

const config = {
  preprocess: preprocess(),

 kit: {
    adapter: adapter({
      platformProxy: {
        configPath: 'wrangler.toml'
      }
    })
  }
};

export default config;