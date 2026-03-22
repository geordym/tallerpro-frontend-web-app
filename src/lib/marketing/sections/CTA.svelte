<script>
  export let title = "Empieza hoy mismo";
  export let subtitle =
    "Lanza tu producto más rápido y enfócate en lo que realmente importa: construir.";
  export let primary = "Crear cuenta gratis";
  export let secondary = "Ver demo";
</script>

<section class="py-24 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <!-- Card container -->
    <div class="relative rounded-3xl border bg-gradient-to-b from-gray-50 to-white p-10 md:p-14 shadow-lg">
      
      <!-- Glow -->
      <div class="absolute inset-0 -z-10 rounded-3xl blur-2xl opacity-20 bg-black"></div>

      <!-- Heading -->
      <h2 class="text-3xl md:text-4xl font-bold">
        {title}
      </h2>

      <!-- Subtitle -->
      <p class="text-gray-600 mt-4 max-w-xl mx-auto">
        {subtitle}
      </p>

      <!-- Buttons -->
      <div class="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/register"
          class="bg-black text-white px-7 py-3 rounded-xl font-medium hover:opacity-90 transition"
        >
          {primary}
        </a>

        <a
          href="/demo"
          class="border px-7 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          {secondary}
        </a>
      </div>

      <!-- Trust line -->
      <p class="mt-6 text-sm text-gray-500">
        Sin tarjeta de crédito • Setup en minutos
      </p>
    </div>
  </div>
</section>