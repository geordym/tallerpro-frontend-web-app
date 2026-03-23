<script>
  import CTA from '$lib/marketing/sections/CTA.svelte';

  const features = [
    {
      title: 'Gestión de clientes',
      description:
        'Administra tu base de clientes, historial de servicios y recordatorios automáticos desde un solo lugar.',
      icon: '👥'
    },
    {
      title: 'Órdenes de trabajo',
      description:
        'Crea, edita y da seguimiento a órdenes de trabajo en tiempo real.',
      icon: '🛠️'
    },
    {
      title: 'Facturación integrada',
      description:
        'Genera facturas profesionales y lleva control de pagos sin herramientas externas.',
      icon: '💳'
    },
    {
      title: 'Reportes y métricas',
      description:
        'Visualiza ingresos, servicios más vendidos y rendimiento del negocio.',
      icon: '📊'
    },
    {
      title: 'Acceso multiusuario',
      description:
        'Permite que tu equipo trabaje de forma colaborativa con roles y permisos.',
      icon: '👨‍🔧'
    },
    {
      title: 'Seguridad avanzada',
      description:
        'Autenticación segura y protección de datos para tu negocio.',
      icon: '🔐'
    }
  ];
</script>

<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight">
        Todas las herramientas que tu taller necesita
      </h1>
      <p class="mt-6 text-lg text-gray-600">
        TallerPro te ayuda a gestionar clientes, órdenes, facturación y reportes
        desde una sola plataforma.
      </p>
    </div>

    <!-- Grid -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {#each features as feature}
        <div class="p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition">
          <div class="text-3xl mb-4">{feature.icon}</div>
          <h3 class="text-xl font-semibold mb-2">
            {feature.title}
          </h3>
          <p class="text-gray-600">
            {feature.description}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>

<CTA />