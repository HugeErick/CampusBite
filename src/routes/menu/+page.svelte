<script lang="ts">
  import { goto } from '$app/navigation';
  import { House, UtensilsCrossed, Ellipsis, Clock3 } from '@lucide/svelte/icons';
  type MenuItem = {
    name: string;
    description: string;
    price: number;
    time: number;
    category: string;
    image: string;
  };

  const categories = ['Todos', 'Crepas', 'Fast Fruit', 'Kebab'];

  let selectedCategory = 'Todos';

  const menuItems: MenuItem[] = [
    {
      name: 'Crepa de Nutella',
      description: 'Crepa rellena con Nutella y plátano',
      price: 45,
      time: 8,
      category: 'Crepas',
      image: ''
    },
    {
      name: 'Crepa de Fresa',
      description: 'Crepa con fresas frescas y crema',
      price: 42,
      time: 8,
      category: 'Crepas',
      image: ''
    },
    {
      name: 'Bowl de Frutas',
      description: 'Frutas frescas con yogurt y granola',
      price: 38,
      time: 5,
      category: 'Fast Fruit',
      image: ''
    },
    {
      name: 'Smoothie Verde',
      description: 'Espinaca, plátano, mango y miel',
      price: 35,
      time: 3,
      category: 'Fast Fruit',
      image: ''
    },
    {
      name: 'Kebab de Pollo',
      description: 'Pan pita con pollo marinado y vegetales',
      price: 55,
      time: 12,
      category: 'Kebab',
      image: ''
    },
    {
      name: 'Kebab Vegetariano',
      description: 'Pan pita con falafel y vegetales',
      price: 48,
      time: 10,
      category: 'Kebab',
      image: ''
    }
  ];

  $: filteredItems =
    selectedCategory === 'Todos'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);
</script>

<svelte:head>
  <title>Menú | CampusBite</title>
  <meta name="description" content="Selecciona tus productos favoritos en CampusBite." />
</svelte:head>

<div class="min-h-screen bg-[#f2f2f2] pb-24 text-slate-900">
  <div class="mx-auto max-w-sm bg-[#f2f2f2]">
    <!-- Header -->
    <section class="rounded-b-3xl bg-gradient-to-b from-orange-500 to-amber-300 px-6 py-7 text-white shadow-md">
      <h1 class="text-3xl font-bold">Menú</h1>
      <p class="mt-2 text-lg">Selecciona tus productos favoritos</p>
    </section>

    <!-- Filtros -->
    <section class="mt-4 px-4">
      <div class="grid grid-cols-4 gap-2">
        {#each categories as category}
          <button
            on:click={() => (selectedCategory = category)}
            class={`flex h-10 w-full items-center justify-center rounded-2xl border px-2 text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'border-transparent bg-gradient-to-b from-orange-500 to-amber-300 text-white shadow-sm'
                : 'border-orange-400 bg-white text-orange-500'
            }`}
          >
            {category}
          </button>
       {/each}
      </div>
    </section>

    <!-- Lista -->
    <section class="mt-5 space-y-5 bg-[#f2f2f2] px-4 py-1">
      {#each filteredItems as item}
        <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
  <div class="grid grid-cols-[120px_1fr]">
    <div class="h-32 w-[120px] overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        class="h-full w-full object-cover"
      />
    </div>

    <div class="min-w-0 p-4">
      <div class="flex items-start justify-between gap-2">
        <h2 class="text-xl font-bold leading-tight text-slate-900">
          {item.name}
        </h2>

        <span class="shrink-0 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-500">
          {item.category}
        </span>
      </div>

      <p class="mt-2 text-base text-slate-700">
        {item.description}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <span class="text-2xl font-bold text-green-600">${item.price}</span>
        <span class="flex items-center gap-1 shrink-0 text-base text-slate-500">
         <Clock3 class="w-4 h-4" />
         {item.time} min
        </span>
      </div>
    </div>
  </div>
</article>
  {/each}
</section>
  
</div>
  <!-- NAVBAR -->
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

    <!-- MENU (ACTIVO) -->
    <button
      class="flex flex-1 flex-col items-center justify-center text-orange-500"
    >
      <UtensilsCrossed class="h-5 w-5" />
      <span class="mt-1 text-xs font-medium">MENU</span>
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