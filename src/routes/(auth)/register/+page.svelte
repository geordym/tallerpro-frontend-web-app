<!-- routes/(auth)/register/+page.svelte -->
<script>
  export let data;
  const PUBLIC_API_BACKEND_URL = data.apiUrl;
  let email = "";
  let password = "";
  let name = "";
  let loading = false;
  let error = null;

  async function register() {
    loading = true;
    error = null;

    try {
      const res = await fetch(`${PUBLIC_API_BACKEND_URL}/core/public/commands`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "core.users.register",
          payload: { name, email, password }
        })
      });

      if (!res.ok) throw new Error("Error creando usuario");

      const data = await res.json();
      const { accessToken, refreshToken, idToken } = data.tokens;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("idToken", idToken);

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

<section class="min-h-screen flex bg-zinc-950 font-['Syne',sans-serif]">

  <!-- Panel izquierdo decorativo -->
  <div class="hidden lg:flex w-1/2 relative overflow-hidden bg-zinc-900 items-center justify-center p-16">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fbbf24_0%,_transparent_60%)] opacity-20"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_#f59e0b_0%,_transparent_50%)] opacity-10"></div>

    <div class="absolute inset-0 opacity-5"
      style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 40px 40px;">
    </div>

    <div class="relative z-10 text-center">
      <div class="w-16 h-16 rounded-2xl bg-amber-400 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-amber-400/20">
        <span class="text-zinc-950 font-black text-2xl">T</span>
      </div>
      <h2 class="text-4xl font-black text-white leading-tight mb-4">
        Empieza hoy<br/>sin costo.<br/>
        <span class="text-amber-400">Gratis.</span>
      </h2>
      <p class="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
        Crea tu cuenta y gestiona tu taller desde el primer día.
      </p>
    </div>
  </div>

  <!-- Panel derecho - formulario -->
  <div class="flex-1 flex items-center justify-center px-8 py-12">
    <div class="w-full max-w-sm">

      <!-- Logo mobile -->
      <div class="flex items-center gap-2 mb-10 lg:hidden">
        <div class="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
          <span class="text-zinc-950 font-black text-sm">T</span>
        </div>
        <span class="font-bold text-white text-lg tracking-tight">TallerPro</span>
      </div>

      <div class="mb-8">
        <h1 class="text-2xl font-bold text-white mb-1">Crear cuenta</h1>
        <p class="text-zinc-500 text-sm">Empieza gratis en segundos</p>
      </div>

      <form class="space-y-4" on:submit|preventDefault={register}>

        <div class="space-y-1">
          <label class="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Nombre
          </label>
          <input
            bind:value={name}
            placeholder="Juan Pérez"
            class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm
                   placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1
                   focus:ring-amber-400/30 transition-all duration-200"
          />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            bind:value={email}
            placeholder="correo@email.com"
            class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm
                   placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1
                   focus:ring-amber-400/30 transition-all duration-200"
          />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Contraseña
          </label>
          <input
            type="password"
            bind:value={password}
            placeholder="••••••••"
            class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm
                   placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1
                   focus:ring-amber-400/30 transition-all duration-200"
          />
        </div>

        {#if error}
          <div class="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <p class="text-red-400 text-sm">{error}</p>
          </div>
        {/if}

        <button
          type="submit"
          disabled={loading}
          class="w-full bg-amber-400 text-zinc-950 font-bold py-3 rounded-xl text-sm
                 hover:bg-amber-300 active:scale-[0.98] transition-all duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {#if loading}
            <span class="flex items-center justify-center gap-2">
              <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Creando cuenta...
            </span>
          {:else}
            Crear cuenta
          {/if}
        </button>

      </form>

      <p class="text-center text-sm text-zinc-600 mt-6">
        ¿Ya tienes cuenta?
        <a href="/login" class="text-amber-400 font-medium hover:text-amber-300 transition-colors">
          Inicia sesión
        </a>
      </p>

    </div>
  </div>

</section>