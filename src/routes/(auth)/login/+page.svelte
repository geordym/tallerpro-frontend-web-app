<script>
  import { enhance } from '$app/forms';
  export let form;

  let loading = false;
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
        Gestiona tu<br/>taller con<br/>
        <span class="text-amber-400">precisión.</span>
      </h2>
      <p class="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
        Todo lo que necesitas para operar tu negocio en un solo lugar.
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
        <h1 class="text-2xl font-bold text-white mb-1">Bienvenido de vuelta</h1>
        <p class="text-zinc-500 text-sm">Ingresa tus credenciales para continuar</p>
      </div>

      <form method="POST" use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update();
          loading = false;
        };
      }} class="space-y-4">

        <div class="space-y-1">
          <label class="text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            name="email"
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
            name="password"
            placeholder="••••••••"
            class="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl px-4 py-3 text-sm
                   placeholder:text-zinc-600 focus:outline-none focus:border-amber-400 focus:ring-1
                   focus:ring-amber-400/30 transition-all duration-200"
          />
        </div>

        <div class="flex justify-end">
          <a href="/forgot-password" class="text-xs text-zinc-500 hover:text-amber-400 transition-colors">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {#if form?.error}
          <div class="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
            <p class="text-red-400 text-sm">{form.error}</p>
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
              Ingresando...
            </span>
          {:else}
            Iniciar sesión
          {/if}
        </button>

      </form>

      <p class="text-center text-sm text-zinc-600 mt-6">
        ¿No tienes cuenta?
        <a href="/register" class="text-amber-400 font-medium hover:text-amber-300 transition-colors">
          Regístrate gratis
        </a>
      </p>

    </div>
  </div>

</section>