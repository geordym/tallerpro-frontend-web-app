<script>
  import CTA from '$lib/marketing/sections/CTA.svelte';
  import { onMount } from 'svelte';

  let yearly = false;

  const plans = [
    {
      name: 'Gratis',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'Perfecto para talleres pequeños que están empezando.',
      features: [
        'Hasta 20 clientes',
        'Órdenes básicas',
        '1 usuario',
        'Soporte por email'
      ],
      highlighted: false
    },
    {
      name: 'Pro',
      priceMonthly: 29,
      priceYearly: 290,
      description: 'La mejor opción para talleres en crecimiento.',
      features: [
        'Clientes ilimitados',
        'Órdenes avanzadas',
        'Facturación integrada',
        'Reportes',
        'Hasta 5 usuarios'
      ],
      highlighted: true
    },
    {
      name: 'Business',
      priceMonthly: 79,
      priceYearly: 790,
      description: 'Para talleres grandes o múltiples sedes.',
      features: [
        'Todo en Pro',
        'Multi-sucursal',
        'Usuarios ilimitados',
        'Soporte prioritario',
        'Acceso anticipado a features'
      ],
      highlighted: false
    }
  ];
</script>

<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto mb-12">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
        Precios simples y transparentes
      </h1>
      <p class="mt-4 text-lg text-gray-600">
        Empieza gratis y escala cuando tu taller crezca.
      </p>

      <!-- Toggle -->
      <div class="mt-8 flex items-center justify-center gap-4">
        <span class={!yearly ? 'font-semibold' : 'text-gray-500'}>
          Mensual
        </span>

<button
  class="w-14 h-7 bg-gray-200 rounded-full relative"
  on:click={() => (yearly = !yearly)}
  aria-label="Cambiar entre precio mensual y anual"
>
  <div
    class={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition ${
      yearly ? 'translate-x-7' : ''
    }`}
  ></div>
</button>

        <span class={yearly ? 'font-semibold' : 'text-gray-500'}>
          Anual
          <span class="text-green-600 text-sm ml-1">(2 meses gratis)</span>
        </span>
      </div>
    </div>

    <!-- Pricing Cards -->
    <div class="grid gap-8 md:grid-cols-3 mt-12">
      {#each plans as plan}
        <div
          class={`rounded-2xl border p-8 flex flex-col ${
            plan.highlighted
              ? 'border-black shadow-xl scale-105'
              : 'border-gray-200'
          }`}
        >
          {#if plan.highlighted}
            <span class="text-sm font-semibold text-black mb-3">
              Más popular
            </span>
          {/if}

          <h3 class="text-xl font-semibold">{plan.name}</h3>
          <p class="text-gray-600 mt-2">{plan.description}</p>

          <!-- Price -->
          <div class="mt-6">
            <span class="text-4xl font-bold">
              $
              {yearly ? plan.priceYearly : plan.priceMonthly}
            </span>
            <span class="text-gray-500 ml-1">
              {yearly ? '/año' : '/mes'}
            </span>
          </div>

          <!-- Features -->
          <ul class="mt-6 space-y-3 text-gray-700 flex-1">
            {#each plan.features as feature}
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span>
                {feature}
              </li>
            {/each}
          </ul>

          <!-- CTA -->
          <button
            class={`mt-8 w-full py-3 rounded-xl font-semibold transition ${
              plan.highlighted
                ? 'bg-black text-white hover:opacity-90'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {plan.name === 'Gratis'
              ? 'Empezar gratis'
              : 'Elegir plan'}
          </button>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="py-20 bg-gray-50">
  <div class="max-w-4xl mx-auto px-6">
    <h2 class="text-2xl font-bold text-center mb-10">
      Preguntas frecuentes
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="font-semibold">
          ¿Puedo cancelar en cualquier momento?
        </h3>
        <p class="text-gray-600 mt-2">
          Sí, puedes cancelar tu suscripción cuando quieras sin cargos adicionales.
        </p>
      </div>

      <div>
        <h3 class="font-semibold">
          ¿Ofrecen soporte?
        </h3>
        <p class="text-gray-600 mt-2">
          Sí, todos los planes incluyen soporte. Los planes superiores tienen prioridad.
        </p>
      </div>

      <div>
        <h3 class="font-semibold">
          ¿Hay descuento anual?
        </h3>
        <p class="text-gray-600 mt-2">
          Sí, al pagar anual obtienes 2 meses gratis.
        </p>
      </div>
    </div>
  </div>
</section>

<CTA />