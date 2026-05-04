<script lang="ts">
  //about page
  import { Clock, GlassWater, CreditCard, Coffee } from "@lucide/svelte/icons";

  const features = [
    {
      title: "Sistema de Turnos Inteligente",
      description: "Evita las filas y conoce tu tiempo de espera en tiempo real.",
      icon: Clock
    },
    {
      title: "Pedidos Personalizados",
      description: "Personaliza tus productos con extras y opciones adicionales.",
      icon: GlassWater
    },
    {
      title: "Pago Seguro",
      description: "Tus datos de pago están protegidos con un proceso confiable y seguro.",
      icon: CreditCard
    }
  ];

  const steps = [
    "Inicia sesión con tus credenciales institucionales.",
    "Obtén tu turno y explora el menú disponible.",
    "Personaliza tus productos y añádelos al carrito.",
    "Realiza el pago de forma segura.",
    "Recibe tu código QR y recoge tu pedido cuando esté listo."
  ];
</script>

<svelte:head>
  <title>About | CampusBite</title>
  <meta
    name="description"
    content="Conoce más sobre CampusBite, la solución digital para gestionar pedidos en la cafetería universitaria."
  />
</svelte:head>

<div class="min-h-screen w-full pb-26">
  <div class="mx-auto space-y-6 pb-6">
    <div class="flex flex-col text-center items-center gap-6">
      <section class="p-6 rounded-b-3xl bg-(--customGold) text-white shadow-md">
        <h1 class="text-3xl font-bold">Acerca de CAMPUSBITE</h1>
        <p class="mt-4 text-sm md:text-base">
          Tu cafetería universitaria digital.
        </p>
      </section>

      <div class="space-y-5 px-4">
        <section class="text-center shadow-md mx-2 flex flex-col items-center justify-center bg-(--whiteStone) dark:bg-slate-800 dark:text-white text-slate-600 p-6 rounded-3xl">
          <div class="mb-2">
            <Coffee class="w-6 h-6" />
          </div>
          <h2 class="text-2xl font-bold text-(--customGold)">CAMPUSBITE</h2>
          <div class="rounded-3xl m-2 ">
            <p class="mt-4 ">
              CampusBite es una solución digital diseñada para gestionar pedidos en la
              cafetería universitaria de forma rápida, segura y organizada. Su propósito
              es reducir tiempos de espera, mejorar la experiencia del estudiante y
              facilitar el trabajo del personal.
            </p>
          </div>
        </section>

        <section class="grid grid-cols-1 gap-4 items-center justify-center text-center px-6 py-8">
          {#each features as item}
            <div class="flex w-full items-start gap-4 rounded-2xl bg-(--whiteStone) dark:bg-slate-800 dark:text-white text-slate-600 px-10 py-8 shadow-sm text-center justify-center">

              <!-- icono -->
              <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                <svelte:component this={item.icon} class="w-5 h-5 text-(--customGold)" />
              </div>

              <!-- texto -->
              <div>
                <h3 class="text-lg font-semibold">
                  {item.title}
                </h3>
                <p class="text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          {/each}
        </section>

        <section class="rounded-2xl border-2 border-orange-400 bg-(--whiteStone) dark:bg-slate-800 dark:text-white text-slate-600 p-6 shadow-sm">
          <h3 class="text-2xl font-bold">¿Cómo funciona?</h3>

          <div class="mt-4 space-y-4">
            {#each steps as step, index}
              <div class="flex items-start gap-3">
                <div class="flex h-7 w-7 items-center justify-center rounded-full bg-(--customGold) text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p>{step}</p>
              </div>
            {/each}
          </div>
        </section>

        <footer class="text-center text-sm text-slate-500">
          <p>CAMPUSBITE v1.0.0</p>
          <p>© 2026 Universidad - Todos los derechos reservados</p>
        </footer>
      </div>
    </div>
  </div>

</div>
