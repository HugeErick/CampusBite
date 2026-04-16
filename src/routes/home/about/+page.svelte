<script lang="ts">
import { Clock, GlassWater, CreditCard, Coffee, House, Info, Ellipsis } from '@lucide/svelte/icons';
import { goto } from '$app/navigation';
  const features = [
  {
    title: 'Sistema de Turnos Inteligente',
    description: 'Evita las filas y conoce tu tiempo de espera en tiempo real.',
    icon: Clock
  },
  {
    title: 'Pedidos Personalizados',
    description: 'Personaliza tus productos con extras y opciones adicionales.',
    icon: GlassWater
  },
  {
    title: 'Pago Seguro',
    description: 'Tus datos de pago están protegidos con un proceso confiable y seguro.',
    icon: CreditCard
  }
];

  const steps = [
    'Inicia sesión con tus credenciales institucionales.',
    'Obtén tu turno y explora el menú disponible.',
    'Personaliza tus productos y añádelos al carrito.',
    'Realiza el pago de forma segura.',
    'Recibe tu código QR y recoge tu pedido cuando esté listo.'
  ];
</script>

<svelte:head>
  <title>About | CampusBite</title>
  <meta
    name="description"
    content="Conoce más sobre CampusBite, la solución digital para gestionar pedidos en la cafetería universitaria."
  />
</svelte:head>

<div class="min-h-screen bg-[#f7f1e8] p-6 pb-28">
  <div class="mx-auto max-w-5xl space-y-6">
    <section class="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-300 p-6 text-white shadow-lg">
      <h1 class="text-3xl font-bold">Acerca de CAMPUSBITE</h1>
      <p class="mt-2 text-sm md:text-base">
        Tu cafetería universitaria digital.
      </p>
    </section>

    <section class="rounded-3xl bg-white p-8 text-center shadow-md">
      <div class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
      <Coffee class="w-5 h-5 text-orange-500" />
      </div>
      <h2 class="text-2xl font-bold text-slate-900">CAMPUSBITE</h2>
      <p class="mt-4 text-slate-700">
        CampusBite es una solución digital diseñada para gestionar pedidos en la
        cafetería universitaria de forma rápida, segura y organizada. Su propósito
        es reducir tiempos de espera, mejorar la experiencia del estudiante y
        facilitar el trabajo del personal.
      </p>
    </section>

    <section class="grid gap-4">
      {#each features as item}
    <div class="flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm">
    
      <!-- icono -->
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
        <svelte:component this={item.icon} class="w-5 h-5 text-orange-500" />
      </div>

      <!-- texto -->
      <div>
        <h3 class="text-lg font-semibold text-slate-800">
          {item.title}
        </h3>
        <p class="text-sm text-slate-600">
          {item.description}
        </p>
      </div>
  </div>
{/each}
    </section>

    <section class="rounded-2xl border-2 border-orange-400 bg-[#fff8ef] p-6 shadow-sm">
      <h3 class="text-2xl font-bold text-slate-900">¿Cómo funciona?</h3>

      <div class="mt-4 space-y-4">
        {#each steps as step, index}
          <div class="flex items-start gap-3">
            <div class="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
              {index + 1}
            </div>
            <p class="text-slate-700">{step}</p>
          </div>
        {/each}
      </div>
    </section>

    <footer class="pb-6 text-center text-sm text-slate-500">
      <p>CAMPUSBITE v1.0.0</p>
      <p>© 2026 Universidad - Todos los derechos reservados</p>
    </footer>
  </div>
  <nav class="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur-sm shadow-md">
  <div class="mx-auto flex h-20 max-w-sm justify-around px-2 text-sm">

    <!-- HOME -->
    <button
      on:click={() => goto('/home')}
      class="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-orange-500"
    >
      <House class="h-5 w-5" />
      <span class="mt-1 text-xs">HOME</span>
    </button>

    <!-- ABOUT (ACTIVO) -->
    <button
      class="flex flex-1 flex-col items-center justify-center text-orange-500"
    >
      <Info class="h-5 w-5" />
      <span class="mt-1 text-xs font-medium">ABOUT</span>
    </button>

    <!-- MORE -->
    <button
      on:click={() => goto('/more')}
      class="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-orange-500"
    >
      <Ellipsis class="h-5 w-5" />
      <span class="mt-1 text-xs">MORE</span>
    </button>

  </div>
</nav>
</div>