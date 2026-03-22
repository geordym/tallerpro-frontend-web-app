<script>
  export let title = "Construye más rápido. Escala sin fricción.";
  export let subtitle =
    "La plataforma que te permite lanzar, automatizar y escalar tu producto sin pelear con la infraestructura.";
  export let primaryCta = "Empieza gratis";
  export let secondaryCta = "Ver demo";
</script>

<section class="relative overflow-hidden">
  <!-- Background glow -->
  <div class="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 to-white"></div>

  <div class="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
    <!-- Badge -->
    <div class="inline-block mb-6">
      <span class="bg-gray-100 text-gray-700 text-sm px-4 py-1 rounded-full">
        🚀 Nuevo — Early access abierto
      </span>
    </div>

    <!-- Headline -->
    <h1 class="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
      {title}
    </h1>

    <!-- Subtitle -->
    <p class="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
      {subtitle}
    </p>

    <!-- CTAs -->
    <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
      <a
        href="/register"
        class="bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
      >
        {primaryCta}
      </a>

      <a
        href="/demo"
        class="border px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
      >
        {secondaryCta}
      </a>
    </div>

    <!-- Social proof -->
    <p class="mt-6 text-sm text-gray-500">
      Usado por founders y devs que quieren moverse rápido ⚡
    </p>

    <!-- Fake dashboard preview -->
    <div class="mt-16">
      <div class="mx-auto max-w-5xl rounded-2xl border shadow-xl overflow-hidden">
        <div class="bg-gray-100 px-4 py-2 text-left text-xs text-gray-500">
          dashboard.tusaas.com
        </div>

        <div class="bg-white p-6 grid md:grid-cols-3 gap-4 text-left text-sm">
          <div class="border rounded-xl p-4">
            <p class="text-gray-500">Usuarios activos</p>
            <p class="text-2xl font-bold mt-1">1,284</p>
          </div>

          <div class="border rounded-xl p-4">
            <p class="text-gray-500">MRR</p>
            <p class="text-2xl font-bold mt-1">$12,430</p>
          </div>

          <div class="border rounded-xl p-4">
            <p class="text-gray-500">Automations</p>
            <p class="text-2xl font-bold mt-1">87</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>