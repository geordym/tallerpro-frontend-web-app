<script>
  const testimonials = [
    {
      quote:
        "Nos ahorró semanas de setup. Pasamos de idea a producción mucho más rápido.",
      name: "Carlos R.",
      role: "Founder, SaaS B2B"
    },
    {
      quote:
        "La arquitectura multi-tenant nos evitó rehacer todo después del MVP.",
      name: "Laura M.",
      role: "Indie Hacker"
    },
    {
      quote:
        "Se nota que está hecho por devs para devs. DX brutal.",
      name: "Andrés P.",
      role: "Fullstack Developer"
    }
  ];
</script>

<section class="py-20 px-6">
  <div class="max-w-6xl mx-auto text-center">
    <!-- Heading -->
    <h2 class="text-3xl md:text-4xl font-bold">
      Construido para moverte rápido
    </h2>

    <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
      Founders y desarrolladores ya están lanzando más rápido sin pelear con el boilerplate.
    </p>

    <!-- Logos row (fake social proof inicial) -->
    <div class="mt-10 flex flex-wrap justify-center gap-8 text-gray-400 text-sm">
      <span>Startup Studio</span>
      <span>Indie Hackers</span>
      <span>Dev Founders</span>
      <span>Builders Latam</span>
      <span>Bootstrappers</span>
    </div>

    <!-- Testimonials -->
    <div class="mt-14 grid md:grid-cols-3 gap-6 text-left">
      {#each testimonials as t}
        <div class="border rounded-2xl p-6 bg-white shadow-sm">
          <p class="text-gray-700 leading-relaxed">
            “{t.quote}”
          </p>

          <div class="mt-4">
            <p class="font-semibold text-sm">{t.name}</p>
            <p class="text-xs text-gray-500">{t.role}</p>
          </div>
        </div>
      {/each}
    </div>

    <!-- Bottom metric -->
    <div class="mt-12 text-sm text-gray-500">
      🚀 Devs lanzando productos más rápido cada semana
    </div>
  </div>
</section>