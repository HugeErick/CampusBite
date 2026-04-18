<script lang="ts">
  import { goto } from '$app/navigation';
  import {
    Ticket,
    Clock3,
    UtensilsCrossed,
    House,
    Info,
    Ellipsis,
    ChevronRight
  } from '@lucide/svelte/icons';

  const steps = [
    'Obtén tu turno para realizar tu pedido',
    'Selecciona tus productos del menú',
    'Paga y recibe tu código QR',
    'Recoge tu pedido cuando sea tu turno'
  ];

  let currentTurn = 5;
  let nextTurnIn = '4:02';

  let showMyTurn = false;
  let myTurn = 13;
  let estimatedWait = 24;
  let hasTurn = false;

  function handleGetTurn() {
    if (hasTurn) return;
    hasTurn = true;
    showMyTurn = true;
  }
</script>

<svelte:head>
  <title>Home | CampusBite</title>
  <meta
    name="description"
    content="Gestión de turnos en CampusBite."
  />
</svelte:head>

<div class="min-h-screen bg-[#f7f1e8] pb-28">
  <div class="mx-auto max-w-sm space-y-6 pb-6">
    <!-- Header -->
    <section class="rounded-b-3xl bg-gradient-to-b from-orange-500 to-amber-300 px-6 py-8 text-white shadow-md">
      <h1 class="text-3xl font-bold">Gestión de Turno</h1>
      <p class="mt-2 text-lg">Bienvenido a CAMPUSBITE</p>
    </section>

    <div class="space-y-5 px-4">
      <!-- Card turno actual -->
      <section class="rounded-3xl bg-[#ececec] px-6 py-8 text-center shadow-sm">
        <div class="mb-3 flex items-center justify-center gap-2 text-slate-600">
          <Ticket class="h-6 w-6" />
          <span class="text-2xl font-medium">Turno Actual</span>
        </div>

        <div class="text-7xl font-bold text-amber-500">
          {currentTurn}
        </div>

        <div class="mt-4 flex items-center justify-center gap-2 text-slate-600">
          <Clock3 class="h-5 w-5" />
          <span class="text-xl">Próximo turno en: {nextTurnIn}</span>
        </div>
      </section>

      <!-- Card de mi turno -->
      {#if showMyTurn}
        <section class="rounded-3xl bg-gradient-to-b from-orange-500 to-amber-300 px-6 py-6 text-white shadow-md">
          <div class="mb-3 text-lg font-semibold">Tu Turno</div>

          <div class="flex items-center justify-between">
            <div>
              <p class="text-5xl font-bold">#{myTurn}</p>
            </div>

            <div class="text-right">
              <p class="text-sm opacity-90">Espera aproximada</p>
              <p class="text-3xl font-bold">{estimatedWait} min</p>
            </div>
          </div>
        </section>
      {/if}

      <!-- Botón obtener turno -->
      <button
        on:click={handleGetTurn}
        disabled={hasTurn}
        class={`flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-5 text-xl font-bold shadow-md transition ${
          hasTurn
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-gradient-to-b from-orange-500 to-amber-300 text-white hover:scale-[1.01]'
        }`}
      >
        <Ticket class="h-6 w-6" />
        <span>{hasTurn ? 'Turno obtenido' : 'Obtener Turno'}</span>
      </button>

      <!-- Botón ver menú -->
      <button
        on:click={() => goto('/menu')}
        class="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-orange-400 bg-[#f7f1e8] px-6 py-5 text-xl font-medium text-orange-500 transition hover:bg-orange-50"
      >
        <UtensilsCrossed class="h-6 w-6" />
        <span>Ver Menú</span>
        <ChevronRight class="h-5 w-5" />
      </button>

      <!-- Cómo funciona -->
      <section class="rounded-3xl border-2 border-orange-400 bg-[#f7f1e8] px-5 py-6">
        <h3 class="mb-4 text-2xl font-semibold text-orange-500">¿Cómo funciona?</h3>

        <ul class="space-y-3 text-lg text-orange-500">
          {#each steps as step}
            <li class="flex items-start gap-3 leading-relaxed">
              <span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-400"></span>
              <span>{step}</span>
            </li>
          {/each}
        </ul>
      </section>
    </div>
  </div>

  <nav class="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur-sm shadow-md">
    <div class="mx-auto flex h-20 max-w-sm justify-around px-2 text-sm">
      <!-- HOME -->
      <button
        on:click={() => goto('/home')}
        class="flex flex-1 flex-col items-center justify-center text-orange-500"
      >
        <House class="h-5 w-5" />
        <span class="mt-1 text-xs font-medium">HOME</span>
      </button>

      <!-- ABOUT -->
      <button
        on:click={() => goto('/home/about')}
        class="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-orange-500"
      >
        <Info class="h-5 w-5" />
        <span class="mt-1 text-xs">ABOUT</span>
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