<script lang="ts">
import { goto } from '$app/navigation';
//steps reducidos de funcionamiento

  const steps = [
    'Obtén tu turno para realizar tu pedido',
    'Selecciona tus productos del menú',
    'Paga y recibe tu código QR',
    'Recoge tu pedido cuando sea tu turno'
  ];

  let currentTurn = 5; //temporal simular UI
  let nextTurnIn = '4:02'; //temporal nada más para IU
  // nuevos estados
  let showMyTurn = false;
  let myTurn = 13; // temporal
  let estimatedWait = 24; // temporal
  let hasTurn = false; // para crear botón de ya tienes turno 

  function handleGetTurn() {
  if (hasTurn) return; // evita duplicados

  hasTurn = true;
  showMyTurn = true;
}

</script>

<svelte:head>
  <title>Home | CampusBite</title> <!--titulo de la pestaña del navegador-->
  <meta
    name="description"
    content="Gestión de turnos en CampusBite."
  />
</svelte:head>

<div class="min-h-screen bg-[#f7f1e8]"> <!--seccion de arriba, titulo y bienvenida-->
  <div class="mx-auto max-w-sm space-y-6 pb-8">
    <!-- Header -->
    <section class="rounded-b-3xl bg-gradient-to-b from-orange-500 to-amber-300 px-6 py-8 text-white shadow-md">
      <h1 class="text-3xl font-bold">Gestión de Turno</h1>
      <p class="mt-2 text-lg">Bienvenido a CAMPUSBITE</p>
    </section>

    <div class="px-4 space-y-5"> <!--seccion de turno actual, actualizacion y numero--> 
      <!-- Card turno actual -->
      <section class="rounded-3xl bg-[#ececec] px-6 py-8 text-center shadow-sm">
        <div class="mb-3 flex items-center justify-center gap-2 text-slate-600">
          <span class="text-lg">🎟️</span>
          <span class="text-2xl font-medium">Turno Actual</span>
        </div>

        <div class="text-7xl font-bold text-amber-500">
          {currentTurn} 
        </div>

        <div class="mt-4 flex items-center justify-center gap-2 text-slate-600">
          <span class="text-lg">🕒</span>
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
      class={`w-full rounded-2xl px-6 py-5 text-xl font-bold shadow-md transition
      ${
        hasTurn
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-gradient-to-b from-orange-500 to-amber-300 text-white hover:scale-[1.01]'
      }`}
  >
    🎟️ {hasTurn ? 'Turno obtenido' : 'Obtener Turno'}
  </button>

      <!-- Botón ver menú -->
      <button
        on:click={() => goto('/menu')}
        class="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-orange-400 bg-[#f7f1e8] px-6 py-5 text-xl font-medium text-orange-500 transition hover:bg-orange-50"
      >
        <span>Ver Menú</span>
        <span>›</span>
      </button>

      <!-- Cómo funciona -->
      <section class="rounded-3xl border-2 border-orange-400 bg-[#f7f1e8] px-5 py-6">
        <h3 class="mb-3 text-2xl font-semibold text-orange-500">¿Cómo funciona?</h3>

        <ul class="space-y-2 text-lg text-orange-500">
          {#each steps as step}
            <li class="leading-relaxed">• {step}</li>
          {/each}
        </ul>
      </section>
    </div>
  </div>
<nav class="fixed bottom-0 left-0 right-0 border-t bg-white shadow-md">
  <div class="mx-auto flex max-w-sm justify-around py-3 text-sm">

    <!-- HOME -->
    <button
      on:click={() => goto('/home')}
      class="flex flex-col items-center text-orange-500"
    >
      <span class="text-lg">🏠</span>
      <span class="text-xs font-medium">HOME</span>
    </button>

    <!-- ABOUT -->
    <button
      on:click={() => goto('/home/about')}
      class="flex flex-col items-center text-slate-500 hover:text-orange-500"
    >
      <span class="text-lg">ℹ️</span>
      <span class="text-xs">ABOUT</span>
    </button>

    <!-- MORE --> 
    <button
      on:click={() => goto('/more')}
      class="flex flex-col items-center text-slate-500 hover:text-orange-500"
    >
      <span class="text-lg">⋯</span>
      <span class="text-xs">MORE</span>
    </button>

  </div>
</nav>
</div>


