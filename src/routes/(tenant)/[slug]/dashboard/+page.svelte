<!-- routes/(tenant)/[slug]/dashboard/+page.svelte -->
<script>
  import { page } from "$app/stores";
  $: slug = $page.params.slug;

  const stats = [
    { label: "Órdenes activas", value: "12", change: "+3 hoy",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>`,
      color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    { label: "Clientes este mes", value: "34", change: "+8 vs mes anterior",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>`,
      color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { label: "Ingresos del mes", value: "$4.200.000", change: "+12% vs mes anterior",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>`,
      color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
    { label: "Citas hoy", value: "5", change: "2 pendientes",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5"/>`,
      color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" }
  ];

  const recentOrders = [
    { id: "ORD-001", client: "Carlos Mendoza", vehicle: "Honda Civic 2019", service: "Cambio de aceite + frenos", status: "EN_PROCESO", time: "Hace 2h" },
    { id: "ORD-002", client: "Ana Gómez", vehicle: "Toyota Corolla 2021", service: "Revisión general", status: "LISTO", time: "Hace 4h" },
    { id: "ORD-003", client: "Luis Herrera", vehicle: "Mazda 3 2020", service: "Suspensión delantera", status: "ESPERANDO", time: "Hace 6h" },
    { id: "ORD-004", client: "María Torres", vehicle: "Chevrolet Spark 2018", service: "Sistema eléctrico", status: "EN_PROCESO", time: "Ayer" },
    { id: "ORD-005", client: "Jorge Ramírez", vehicle: "Renault Logan 2022", service: "Cambio de correa", status: "LISTO", time: "Ayer" },
  ];

  function getStatusStyle(status) {
    const styles = {
      EN_PROCESO: "bg-amber-400/10 text-amber-400 border-amber-400/20",
      LISTO: "bg-green-400/10 text-green-400 border-green-400/20",
      ESPERANDO: "bg-zinc-700/50 text-zinc-400 border-zinc-700"
    };
    return styles[status] ?? "bg-zinc-700 text-zinc-400";
  }

  function getStatusLabel(status) {
    const labels = {
      EN_PROCESO: "En proceso",
      LISTO: "Listo",
      ESPERANDO: "Esperando"
    };
    return labels[status] ?? status;
  }
</script>

<div class="space-y-6">

  <!-- Header -->
  <div>
    <h1 class="text-xl font-bold text-white">Dashboard</h1>
    <p class="text-zinc-500 text-sm mt-0.5">Resumen de operaciones — {slug}</p>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    {#each stats as stat}
      <div class="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
        <div class="flex items-start justify-between mb-4">
          <p class="text-zinc-400 text-sm">{stat.label}</p>
          <div class="w-9 h-9 rounded-xl border flex items-center justify-center {stat.bg}">
            <svg class="w-4 h-4 {stat.color}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              {@html stat.icon}
            </svg>
          </div>
        </div>
        <p class="text-2xl font-bold text-white mb-1">{stat.value}</p>
        <p class="text-xs text-zinc-500">{stat.change}</p>
      </div>
    {/each}
  </div>

  <!-- Órdenes recientes -->
  <div class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
    <div class="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
      <h2 class="text-sm font-semibold text-white">Órdenes recientes</h2>
      <a href="/{slug}/orders" class="text-xs text-amber-400 hover:text-amber-300 transition-colors">
        Ver todasss →
      </a>
    </div>

    <div class="divide-y divide-zinc-800">
      {#each recentOrders as order}
        <div class="flex items-center gap-4 px-6 py-4 hover:bg-zinc-800/30 transition-colors">

          <!-- ID -->
          <span class="text-xs font-mono text-zinc-600 w-16 shrink-0">{order.id}</span>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm text-white font-medium truncate">{order.client}</p>
            <p class="text-xs text-zinc-500 truncate">{order.vehicle} · {order.service}</p>
          </div>

          <!-- Status -->
          <span class="text-xs font-medium px-2.5 py-1 rounded-lg border shrink-0 {getStatusStyle(order.status)}">
            {getStatusLabel(order.status)}
          </span>

          <!-- Tiempo -->
          <span class="text-xs text-zinc-600 shrink-0 hidden sm:block">{order.time}</span>

        </div>
      {/each}
    </div>
  </div>

</div>