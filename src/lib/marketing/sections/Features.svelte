<script>
  const features = [
    {
      title: "Multi-tenant listo",
      desc: "Arquitectura preparada para manejar múltiples clientes desde el día uno.",
      icon: "🏢"
    },
    {
      title: "Auth integrada",
      desc: "Login, sesiones y seguridad sin tener que reinventar la rueda.",
      icon: "🔐"
    },
    {
      title: "Escalable desde el inicio",
      desc: "Diseñado para crecer contigo, desde MVP hasta producción real.",
      icon: "🚀"
    },
    {
      title: "API-first",
      desc: "Todo accesible vía API para integraciones y automatizaciones.",
      icon: "⚡"
    },
    {
      title: "Deploy simple",
      desc: "Despliega en minutos sin pelear con infraestructura compleja.",
      icon: "☁️"
    },
    {
      title: "DX enfocada en devs",
      desc: "Herramientas pensadas para moverte rápido y sin fricción.",
      icon: "🧠"
    }
  ];
</script>

<section class="py-20 px-6 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <!-- Heading -->
    <div class="text-center mb-14">
      <h2 class="text-3xl md:text-4xl font-bold">
        Todo lo que necesitas para lanzar más rápido
      </h2>
      <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
        Infraestructura moderna para que te enfoques en tu producto, no en el boilerplate.
      </p>
    </div>

    <!-- Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each features as feature}
        <div class="bg-white p-6 rounded-2xl border hover:shadow-lg transition">
          <div class="text-2xl mb-3">{feature.icon}</div>
          <h3 class="font-semibold text-lg">{feature.title}</h3>
          <p class="text-gray-600 mt-2 text-sm">
            {feature.desc}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>