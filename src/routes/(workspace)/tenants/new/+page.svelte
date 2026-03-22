<!-- routes/(workspace)/tenants/new/+page.svelte -->
<script>
  export let data;
  const PUBLIC_API_BACKEND_URL = data.apiUrl;

  let name = "";
  let contactEmail = "";
  let billingEmail = "";
  let planType = "BASIC";
  let sameEmail = false;
  let loading = false;
  let error = null;

  $: if (sameEmail) billingEmail = contactEmail;

  const plans = [
    {
      value: "BASIC",
      label: "Basic",
      price: "Gratis",
      description: "Para empezar yay",
      features: ["1 usuario", "Funciones básicas", "Soporte por email"]
    },
    {
      value: "PROFESSIONAL",
      label: "Professional",
      price: "$29/mes",
      description: "Para crecer",
      features: ["10 usuarios", "Todas las funciones", "Soporte prioritario"]
    },
    {
      value: "ENTERPRISE",
      label: "Enterprise",
      price: "$99/mes",
      description: "Para escalar",
      features: ["Usuarios ilimitados", "API access", "Soporte dedicado"]
    }
  ];

  async function createTenant() {
    loading = true;
    error = null;

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch(`${PUBLIC_API_BACKEND_URL}/core/commands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name: "core.owner.tenants.create",
          payload: { name, contactEmail, billingEmail, planType }
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error creando tenant");
      }

      window.location.href = "/dashboard";

    } catch (e) {
      error = e.message;
    }

    loading = false;
  }
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</svelte:head>

<div class="max-w-2xl mx-auto font-['Syne',sans-serif]">

  <!-- Header -->
  <div class="mb-10">
    
     <a href="/dashboard"
      class="flex items-center gap-2 text-zinc-500 hover:text-white text-sm transition-colors mb-6"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
      </svg>
      Volver al dashboard
    </a>
    <h1 class="text-2xl font-bold text-white">Nuevo espacio de trabajo</h1>
    <p class="text-zinc-500 text-sm mt-1">Configura tu tenant y empieza a operar</p>
  </div>

  <form on:submit|preventDefault={createTenant} class="space-y-8">

    <!-- Información básica -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5">
      <h2 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Información básica</h2>

      <div class="space-y-1">
        <label class="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Nombre del negocio
        </label>
        <input
          bind:value={name}
          placeholder="Ej: Taller Mecánico López"
          required
          class="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm
                 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1
                 focus:ring-amber-400/30 transition-all duration-200"
        />
      </div>

      <div class="space-y-1">
        <label class="text-xs font-medium text-zinc-400 uppercase tracking-wider">
          Email de contacto
        </label>
        <input
          type="email"
          bind:value={contactEmail}
          placeholder="contacto@negocio.com"
          required
          class="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm
                 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1
                 focus:ring-amber-400/30 transition-all duration-200"
        />
      </div>

      <div class="space-y-1">
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Email de facturación
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={sameEmail}
              class="w-3.5 h-3.5 rounded accent-amber-400"
            />
            <span class="text-xs text-zinc-500">Igual al de contacto</span>
          </label>
        </div>
        <input
          type="email"
          bind:value={billingEmail}
          placeholder="facturacion@negocio.com"
          disabled={sameEmail}
          required
          class="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm
                 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1
                 focus:ring-amber-400/30 transition-all duration-200
                 disabled:opacity-40 disabled:cursor-not-allowed"
        />
      </div>
    </div>

    <!-- Selección de plan -->
    <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
      <h2 class="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Plan</h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {#each plans as plan}
          <button
            type="button"
            on:click={() => planType = plan.value}
            class="relative text-left p-4 rounded-xl border transition-all duration-200
                   {planType === plan.value
                     ? 'border-amber-400 bg-amber-400/5'
                     : 'border-zinc-800 bg-zinc-950 hover:border-zinc-600'}"
          >
            {#if planType === plan.value}
              <div class="absolute top-3 right-3 w-4 h-4 rounded-full bg-amber-400 flex items-center justify-center">
                <svg class="w-2.5 h-2.5 text-zinc-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            {/if}

            <p class="text-white font-semibold text-sm mb-0.5">{plan.label}</p>
            <p class="text-amber-400 font-bold text-base mb-2">{plan.price}</p>
            <p class="text-zinc-500 text-xs mb-3">{plan.description}</p>
            <ul class="space-y-1">
              {#each plan.features as feature}
                <li class="flex items-center gap-1.5 text-xs text-zinc-400">
                  <svg class="w-3 h-3 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  {feature}
                </li>
              {/each}
            </ul>
          </button>
        {/each}
      </div>
    </div>

    {#if error}
      <div class="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
        <p class="text-red-400 text-sm">{error}</p>
      </div>
    {/if}

    <!-- Submit -->
    <button
      type="submit"
      disabled={loading}
      class="w-full bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl text-sm
             hover:bg-amber-300 active:scale-[0.98] transition-all duration-200
             disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {#if loading}
        <span class="flex items-center justify-center gap-2">
          <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          Creando espacio de trabajo...
        </span>
      {:else}
        Crear espacio de trabajo
      {/if}
    </button>

  </form>
</div>