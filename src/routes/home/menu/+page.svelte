<script lang="ts">
  // menupage
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Clock3, ShoppingBasket, X } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";

  type MenuItem = {
    name: string;
    description: string;
    price: number;
    time: number;
    category: string;
    image: string;
    toppings?: string[];
  };

  type CartItem = MenuItem & { quantity: number; selectedToppings: string[] };

  const categories = ["Todos", "Crepas", "Fast Fruit", "Kebab"];
  let selectedCategory = $state("Todos");
  let cart = $state<CartItem[]>([]);
  let expandedItem = $state<string | null>(null);
  let pendingToppings = $state<string[]>([]);
  let sheetOpen = $state(false);

  const menuItems: MenuItem[] = [
    {
      name: "Crepa de Nutella",
      description: "Crepa rellena con Nutella y plátano",
      price: 45,
      time: 8,
      category: "Crepas",
      image: "https://images.unsplash.com/photo-1734056650036-7002ede7b8f8?w=500&auto=format&fit=crop&q=60",
      toppings: ["Chantilly", "Fresas", "Chispas de chocolate", "Coco rallado"]
    },
    {
      name: "Crepa de Fresa",
      description: "Crepa con fresas frescas y crema",
      price: 42,
      time: 8,
      category: "Crepas",
      image: "https://plus.unsplash.com/premium_photo-1699239047862-12af873dc18b?w=500&auto=format&fit=crop&q=60",
      toppings: ["Nutella", "Chantilly", "Miel", "Granola"]
    },
    {
      name: "Bowl de Frutas",
      description: "Frutas frescas con yogurt y granola",
      price: 38,
      time: 5,
      category: "Fast Fruit",
      image: "https://images.unsplash.com/photo-1498507297833-5373e346b4e0?w=500&auto=format&fit=crop&q=60",
      toppings: ["Chía", "Miel", "Coco rallado", "Granola extra"]
    },
    {
      name: "Smoothie Verde",
      description: "Espinaca, plátano, mango y miel",
      price: 35,
      time: 3,
      category: "Fast Fruit",
      image: "https://plus.unsplash.com/premium_photo-1699577272804-a73a470fb7fd?w=500&auto=format&fit=crop&q=60",
      toppings: ["Chía", "Proteína", "Jengibre", "Espirulina"]

    },
    {
      name: "Kebab de Pollo",
      description: "Pan pita con pollo marinado y vegetales",
      price: 55,
      time: 12,
      category: "Kebab",
      image: "https://images.unsplash.com/photo-1740591872073-e0e627756b90?w=500&auto=format&fit=crop&q=60",
      toppings: ["Extra salsa", "Queso", "Jalapeños", "Aguacate"]
    },
    {
      name: "Kebab Vegetariano",
      description: "Pan pita con falafel y vegetales",
      price: 48,
      time: 10,
      category: "Kebab",
      image: "https://plus.unsplash.com/premium_photo-1668618295105-ef66d54d1ab0?w=500&auto=format&fit=crop&q=60",
      toppings: ["Extra hummus", "Queso feta", "Jalapeños", "Aceitunas"]
    }
  ];

  let filteredItems = $derived(
    selectedCategory === "Todos"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory)
  );

  let totalItems = $derived(cart.reduce((sum, i) => sum + i.quantity, 0));
  let totalPrice = $derived(cart.reduce((sum, i) => sum + i.price * i.quantity, 0));

  function saveCart() {
    localStorage.setItem("cb-cart", JSON.stringify(cart));
  }

  function toggleExpand(item: MenuItem) {
    if (expandedItem === item.name) {
      expandedItem = null;
      pendingToppings = [];
    } else {
      expandedItem = item.name;
      pendingToppings = [];
    }
  }

  function toggleTopping(topping: string) {
    if (pendingToppings.includes(topping)) {
      pendingToppings = pendingToppings.filter((t) => t !== topping);
    } else if (pendingToppings.length < 2) {
      pendingToppings = [...pendingToppings, topping];
    }
  }

  function confirmAddToCart(item: MenuItem) {
    const key = item.name + JSON.stringify(pendingToppings.slice().sort());
    const existing = cart.find(
      (c) => c.name === item.name &&
        JSON.stringify(c.selectedToppings.slice().sort()) === JSON.stringify(pendingToppings.slice().sort())
    );
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1, selectedToppings: [...pendingToppings] });
    }
    expandedItem = null;
    pendingToppings = [];
    saveCart();
  }

  function removeFromCart(name: string, toppings: string[]) {
    cart = cart.filter(
      (c) => c.name !== name ||
      JSON.stringify((c.selectedToppings ?? []).slice().sort()) !== JSON.stringify((toppings ?? []).slice().sort())
    );
    saveCart();
  }

  onMount(() => {
    const saved = localStorage.getItem("cb-cart");
    if (saved) cart = JSON.parse(saved);
  });


</script>

<svelte:head>
  <title>Menú | CampusBite</title>
  <meta name="description" content="Selecciona tus productos favoritos en CampusBite." />
</svelte:head>

<Sheet.Root bind:open={sheetOpen}>
  <Sheet.Trigger
    class="fixed right-4 top-4 lg:right-20 z-50 flex items-center gap-2 border-2 border-stone-200 border-dashed rounded-full px-4 py-2 dark:text-slate-200 text-slate-800 shadow-lg transition hover:brightness-95 bg-transparent"
  >
    <Button variant="ghost" size="icon" class="h-5 w-5">
      <ShoppingBasket  />
      {#if totalItems > 0}
        <span class="text-sm font-bold">{totalItems}</span>
      {/if}
    </Button>
  </Sheet.Trigger>
  <Sheet.Content side="right" class="flex flex-col z-100 w-80">
    <Sheet.Header>
      <Sheet.Title class="flex items-center gap-2 text-(--customGold)">
        <ShoppingBasket class="h-5 w-5" />
        Mi Canasta
      </Sheet.Title>
      <Sheet.Description>
        {totalItems} {totalItems === 1 ? "producto" : "productos"} · ${totalPrice}
      </Sheet.Description>
    </Sheet.Header>

    <div class="flex-1 overflow-y-auto py-4 space-y-3">
      {#if cart.length === 0}
        <p class="text-center text-sm text-slate-400 mt-10">Tu canasta está vacía</p>
      {:else}
        {#each cart as item}
          <div class="mx-2 flex flex-col gap-1 rounded-xl border border-slate-200 p-3">
            <div class="flex items-center gap-3">
              <img src={item.image} alt={item.name} class="h-12 w-12 rounded-lg object-cover object-center" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold leading-tight truncate">{item.name}</p>
                <p class="text-xs text-slate-500">${item.price} × {item.quantity}</p>
                {#if item.selectedToppings?.length > 0}
                  <p class="text-xs text-(--customgold) mt-0.5">{item.selectedToppings.join(", ")}
                  </p>
                {/if}
              </div>
              <Button
                variant="ghost"
                onclick={() => removeFromCart(item.name, item.selectedToppings)}
                class="shrink-0 text-red-400 hover:text-red-600 transition"
              >
                <X class="h-4 w-4" />
              </Button>
            </div>
          </div>
        {/each}
      {/if}
    </div>

    {#if cart.length > 0}
      <div class="border-t p-4 space-y-3">
        <div class="flex justify-between text-sm font-semibold">
          <span>Total</span>
          <span class="text-green-600">${totalPrice}</span>
        </div>
        <Button
          onclick={() => goto("/home/menu/payment")}
          class="w-full bg-(--customGold) text-white hover:brightness-95">
          Confirmar pedido
        </Button>
      </div>
    {/if}
  </Sheet.Content>
</Sheet.Root>

<div class="min-h-screen pb-24 text-slate-900">
  <div class="mx-auto space-y-6 pb-6">
    <!-- Header -->
    <section class="rounded-b-3xl bg-(--customGold) px-6 py-8 text-white shadow-md text-center">
      <h1 class="text-3xl font-bold">Menú</h1>
      <p class="mt-2 text-lg">Selecciona tus productos favoritos</p>
    </section>

    <!-- Filtros -->
    <section class="mt-4 px-4">
      <div class="grid grid-cols-4 gap-2">
        {#each categories as category}
          <Button
            onclick={() => (selectedCategory = category)}
            class={`flex h-10 w-full items-center justify-center rounded-2xl border px-2 text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category
                    ? "border-transparent bg-(--customGold) text-white shadow-sm"
                    : "border-orange-400 bg-(--customWhite) dark:bg-slate-800 dark:text-white  text-orange-500"
                  }`}
          >
            {category}
          </Button>
        {/each}
      </div>
    </section>

    <!-- Lista -->
    <section class="m-5 flex flex-col space-y-6 rounded-3xl bg-(--whiteStone) dark:text-white dark:bg-slate-800 text-slate-600 px-6 py-6">
      {#each filteredItems as item}
        <Button
          variant="ghost"
          onclick={() => toggleExpand(item)}
          class="overflow-hidden h-auto rounded-2xl border border-slate-200 dark:bg-slate-600 shadow-md">
          <div class="flex flex-col sm:grid sm:grid-cols-[120px_1fr] items-center">
            <div class="h-32 w-30 overflow-hidden flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                class="m-1 h-full w-full rounded-2xl object-cover object-center"
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

              <p class="mt-2 text-base">
                {item.description}
              </p>

              <div class="mt-4 flex items-center justify-between">
                <span class="text-2xl font-bold text-green-600">${item.price}</span>
                <span class="flex items-center gap-1 shrink-0 text-base">
                  <Clock3 class="w-4 h-4" />
                  {item.time} min
                </span>
              </div>
            </div>
          </div>
        </Button>

        <!-- toppings -->
        {#if expandedItem === item.name && item.toppings}
          <div class="border-t border-slate-200 dark:border-slate-500 px-4 py-4 space-y-3">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Extras · máx. 2
            </p>
            <div class="grid grid-cols-2 gap-2">
              {#each item.toppings as topping}
                {@const selected = pendingToppings.includes(topping)}
                {@const disabled = !selected && pendingToppings.length >= 2}
                <button
                  onclick={() => toggleTopping(topping)}
                  disabled={disabled}
                  class={`rounded-xl border px-3 py-2 text-sm text-left transition-all ${ selected ? "border-orange-400 bg-orange-50 text-orange-600 font-semibold dark:bg-orange-900/30" : disabled ? "border-slate-200 text-slate-300 cursor-not-allowed" : "border-slate-200 text-slate-600 dark:text-slate-300 hover:border-orange-3  00"
                  }`}
                >
                  {topping}
                </button>
              {/each}
            </div>
            <Button
              onclick={() => confirmAddToCart(item)}
              class="w-full bg-(--customGold) text-white hover:brightness-95 mt-1"
            >
              Agregar al carrito
            </Button>
          </div>
        {/if}
      {/each}
    </section>
    <div class="w-full text-center flex align-middle items-center justify-center">

      <Button
        variant="ghost"
        onclick={() => (sheetOpen = true)}
        class="flex self-center w-full items-center gap-2 bg-(--customGold) text-white rounded-full px-5 py-6 shadow-xl transition hover:brightness-95"
      >
        <ShoppingBasket class="h-5 w-5" />
        {#if totalItems > 0}
          <span class="text-sm font-bold">{totalItems} · ${totalPrice}</span>
        {:else}
          <span class="text-sm font-bold">Mi canasta</span>
        {/if}
      </Button>
    </div>

  </div>
</div>
