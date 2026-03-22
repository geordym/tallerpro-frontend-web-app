<script>
  export let data;
  const { tenants, error } = data;

function enterTenant(slug) {
  const isProd = window.location.hostname === 'tallerpro.com' || 
                 window.location.hostname === 'www.tallerpro.com';
  
  if (isProd) {
    window.location.href = `https://${slug}.tallerpro.com/dashboard`;
  } else {
    window.location.href = `http://${slug}.localhost:5173/dashboard`;
  }
}

  function getRoleLabel(role) {
    const labels = {
      ADMIN: "Administrador",
      VENDEDOR: "Vendedor",
      CAJERO: "Cajero",
      SUPERVISOR: "Supervisor"
    };
    return labels[role] ?? role;
  }

  function getRoleColor(role) {
    const colors = {
      ADMIN: "bg-amber-400/10 text-amber-400 border-amber-400/20",
      VENDEDOR: "bg-blue-400/10 text-blue-400 border-blue-400/20",
      CAJERO: "bg-green-400/10 text-green-400 border-green-400/20",
      SUPERVISOR: "bg-purple-400/10 text-purple-400 border-purple-400/20"
    };
    return colors[role] ?? "bg-zinc-700 text-zinc-300 border-zinc-600";
  }

  function getInitials(name) {
    return name
      .split(" ")
      .slice(0, 2)
      .map(w => w.charAt(0).toUpperCase())
      .join("");
  }
</script>

<div class="space-y-8">

  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-white">Mis espacios de trabajo</h1>
      <p class="text-gray-500 text-sm mt-1">Selecciona un tenant para continuar</p>
    </div>
    <a href="/tenants/new"
      class="flex items-center gap-2 bg-amber-400 text-zinc-950 font-semibold text-sm
             px-4 py-2 rounded-xl hover:bg-amber-300 active:scale-95 transition-all duration-200"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
      </svg>
      Nuevo tenant
    </a>
  </div>

  <!-- Error -->
  {#if error}
    <div class="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
      <p class="text-red-400 text-sm">{error}</p>
    </div>

  <!-- Sin tenants -->
  {:else if tenants.length === 0}
    <div class="border border-dashed border-zinc-800 rounded-2xl p-16 text-center">
      <div class="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
        </svg>
      </div>
      <p class="text-zinc-400 font-medium mb-1">Sin espacios de trabajo</p>
      <p class="text-zinc-600 text-sm mb-6">Crea tu primer tenant para comenzar</p>
      <a href="/tenants/new"
        class="bg-amber-400 text-zinc-950 font-semibold text-sm px-5 py-2.5 rounded-xl
               hover:bg-amber-300 transition-all duration-200"
      >
        Crear primer tenant
      </a>
    </div>

  <!-- Cards de tenants -->
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each tenants as tenant}
        <button
          on:click={() => enterTenant(tenant.slug)}
          class="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600
                 rounded-2xl p-6 text-left transition-all duration-200
                 hover:bg-zinc-800/50 active:scale-[0.98] w-full"
        >
          <div class="w-12 h-12 rounded-xl bg-zinc-800 group-hover:bg-zinc-700
                      flex items-center justify-center mb-4 transition-colors duration-200">
            <span class="text-white font-bold text-sm">
              {getInitials(tenant.name)}
            </span>
          </div>
          <div class="mb-3">
            <h3 class="text-white font-semibold text-base leading-tight mb-1">
              {tenant.name}
            </h3>
            <p class="text-zinc-500 text-xs">{tenant.slug}</p>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium px-2.5 py-1 rounded-lg border {getRoleColor(tenant.role)}">
              {getRoleLabel(tenant.role)}
            </span>
            <svg
              class="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-0.5
                     transition-all duration-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </button>
      {/each}
    </div>
  {/if}

</div>