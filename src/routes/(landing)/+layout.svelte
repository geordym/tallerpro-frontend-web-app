<script>
  import Navbar from '$lib/marketing/Navbar.svelte';
  import Footer from '$lib/marketing/Footer.svelte';
</script>

<div class="min-h-screen flex flex-col">
  <Navbar />
  
  <main class="flex-1">
    <slot />
  </main>

  <Footer />
</div>