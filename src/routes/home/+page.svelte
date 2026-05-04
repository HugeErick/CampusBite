<script lang="ts">
  //homepage
  import { onMount } from 'svelte';
  import { page } from "$app/state";
  import { toast } from "@zerodevx/svelte-toast";
  import { goto } from '$app/navigation';
  import {
    Ticket,
    Clock3,
    UtensilsCrossed,
    ChevronRight
  } from '@lucide/svelte/icons';
  import { Button } from "$lib/components/ui/button/index.js";

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
  
  onMount(() => {
    if (page.url.searchParams.get("welcome") === "1") {
      toast.push("Bienvenido de vuelta");
      const url = new URL(page.url);
      url.searchParams.delete("welcome");
      goto(url.toString(), { replaceState: true, noScroll: true});
    }
  });
</script>

<svelte:head>

  <title>Home | CampusBite</title>
  <meta
    name="description"
    content="Gestión de turnos en CampusBite."
  />
</svelte:head>

<div class="z-10 min-h-screen w-full pb-28">
  <div class="mx-auto space-y-6 pb-6">
    <!-- Header -->
    <section class="rounded-b-3xl bg-(--customGold) px-6 py-8 text-white shadow-md text-center">
      <h1 class="text-3xl font-bold">Gestión de Turno</h1>
      <p class="mt-2 text-lg">Bienvenido a CAMPUSBITE</p>
    </section>

    <div class="space-y-5 px-4">
      <!-- Card turno actual -->
      <section class="rounded-3xl bg-(--whiteStone) dark:bg-slate-800 dark:text-white text-slate-600 px-6 py-8 text-center shadow-sm">
        <div class="mb-3 flex items-center justify-center gap-2 ">
          <Ticket class="h-6 w-6" />
          <span class="text-2xl font-medium">Turno Actual</span>
        </div>

        <div class="text-7xl font-bold text-amber-500">
          {currentTurn}
        </div>

        <div class="mt-4 flex items-center justify-center gap-2">
          <Clock3 class="h-5 w-5" />
          <span class="text-xl">Próximo turno en: {nextTurnIn}</span>
        </div>
      </section>

      <!-- Card de mi turno -->
      {#if showMyTurn}
        <section class="rounded-3xl bg-(--customGold) px-6 py-6 text-white shadow-md">
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

      <!-- Botón ver menú -->
      <Button
        onclick={() => goto('/menu')}
        class="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-orange-400 bg-(--whiteStone) dark:bg-slate-800 px-6 py-5 text-xl font-medium text-(--customGold) transition hover:bg-orange-50"
      >
        <UtensilsCrossed class="h-6 w-6" />
        <span>Ver Menú</span>
        <ChevronRight class="h-5 w-5" />
      </Button>

      <!-- Cómo funciona -->
      <section class="rounded-3xl border-2 border-orange-400 bg-(--whiteStone) dark:bg-slate-800 px-5 py-6">
        <h3 class="mb-4 text-2xl font-semibold text-(--customGold)">¿Cómo funciona?</h3>

        <ul class="space-y-3 text-lg text-(--customGold)">
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

</div>
