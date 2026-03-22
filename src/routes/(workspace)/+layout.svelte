<!-- routes/(workspace)/+layout.svelte -->
<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('idToken');
    goto('/login');
  }

  // Extraer nombre del usuario del token (simplificado)
  function getUserName() {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) return 'Usuario';
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.name || payload.username || 'Usuario';
    } catch {
      return 'Usuario';
    }
  }
</script>

<div class="min-h-screen bg-zinc-950 text-white font-['Syne',sans-serif]">

  <!-- Navbar -->
  <nav class="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

      <!-- Logo -->
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center">
          <span class="text-zinc-950 font-black text-sm">T</span>
        </div>
        <span class="font-bold text-white tracking-tight text-lg">TallerPro</span>
      </div>

      <!-- Usuario + logout -->
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
            <span class="text-xs text-zinc-300 font-medium">
              {getUserName().charAt(0).toUpperCase()}
            </span>
          </div>
          <span class="text-sm text-zinc-400 hidden sm:block">{getUserName()}</span>
        </div>

        <button
          on:click={logout}
          class="text-xs text-zinc-500 hover:text-white border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          Salir
        </button>
      </div>

    </div>
  </nav>

  <!-- Contenido de la página -->
  <main class="max-w-6xl mx-auto px-6 py-10">
    <slot />
  </main>

</div>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>