<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  $: slug = $page.params.slug;

  $: navItems = [
    {
      label: "Dashboard",
      href: `/${slug}/dashboard`,
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>`
    },
    {
      label: "Usuarios",
      href: `/${slug}/users`,
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>`
    },
    {
      label: "Configuración",
      href: `/${slug}/settings`,
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>`
    }
  ];

  $: currentPath = $page.url.pathname;

  function isActive(href) {
    return currentPath === href || currentPath.startsWith(href + "/");
  }

  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("idToken");
    goto("/login");
  }

  function getUserName() {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return "Usuario";
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.name || payload.username || "Usuario";
    } catch {
      return "Usuario";
    }
  }

  let sidebarOpen = true;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex bg-zinc-950 font-['Syne',sans-serif]">

  <!-- Sidebar -->
  <aside class="
    {sidebarOpen ? 'w-60' : 'w-16'}
    flex flex-col bg-zinc-900 border-r border-zinc-800
    transition-all duration-300 shrink-0 sticky top-0 h-screen
  ">

    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-zinc-800 gap-3 overflow-hidden">
      <div class="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
        <span class="text-zinc-950 font-black text-sm">T</span>
      </div>
      {#if sidebarOpen}
        <div class="overflow-hidden">
          <p class="text-white font-bold text-sm leading-tight truncate">{slug}</p>
          <p class="text-zinc-500 text-xs">TallerPro</p>
        </div>
      {/if}
    </div>

    <!-- Nav -->
    <nav class="flex-1 px-2 py-4 space-y-1">
      {#each navItems as item}
        
          <a href={item.href}
          class="
            flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200
            {isActive(item.href)
              ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent'}
          "
        >
          <svg
            class="w-5 h-5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
          >
            {@html item.icon}
          </svg>
          {#if sidebarOpen}
            <span class="truncate">{item.label}</span>
          {/if}
        </a>
      {/each}
    </nav>

    <!-- Footer del sidebar -->
    <div class="p-2 border-t border-zinc-800 space-y-1">

      <!-- Cambiar tenant -->
      
       <a href="/dashboard"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500
               hover:text-white hover:bg-zinc-800 transition-all duration-200"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"/>
        </svg>
        {#if sidebarOpen}
          <span>Cambiar tenant</span>
        {/if}
      </a>

      <!-- Usuario -->
      <button
        on:click={logout}
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500
               hover:text-red-400 hover:bg-red-400/5 transition-all duration-200"
      >
        <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
        </svg>
        {#if sidebarOpen}
          <span>Salir</span>
        {/if}
      </button>

    </div>
  </aside>

  <!-- Contenido principal -->
  <div class="flex-1 flex flex-col min-w-0">

    <!-- Topbar -->
    <header class="h-16 border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 bg-zinc-950/80 backdrop-blur-sm z-40">

      <!-- Toggle sidebar -->
      <button
        on:click={() => sidebarOpen = !sidebarOpen}
        class="text-zinc-500 hover:text-white transition-colors"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
        </svg>
      </button>

      <!-- Usuario -->
      <div class="flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <p class="text-sm text-white font-medium leading-tight">{getUserName()}</p>
          <p class="text-xs text-zinc-500">{slug}</p>
        </div>
        <div class="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <span class="text-xs text-zinc-300 font-medium">
            {getUserName().charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

    </header>

    <!-- Página -->
    <main class="flex-1 p-6 overflow-auto">
      <slot />
    </main>

  </div>

</div>