<script lang="ts">
  // more page
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button/index.js";
  let { data } = $props();

  import {
    User,
    Clock,
    Bell,
    LogOut,
    ChevronRight,
  } from "@lucide/svelte";

  const options = [
    {
      title: "Mi Perfil",
      desc: "Ver y editar información personal",
      icon: User,
      route: "/profile"
    },
    {
      title: "Historial de Pedidos",
      desc: "Ver tus pedidos anteriores",
      icon: Clock,
      route: "/orders"
    },
    {
      title: "Notificaciones",
      desc: "Configurar alertas y avisos",
      icon: Bell,
      route: "/notifications"
    },
  ];

</script>

<svelte:head>

  <title>More | CampusBite</title>
  <meta
    name="description"
    content="More settings."
  />
</svelte:head>

<div class="z-10 min-h-screen w-full pb-28">
  <div class="mx-auto space-y-4 pb-6">
    <!-- HEADER -->
    <div class="rounded-b-3xl px-6 py-8 bg-(--customGold) text-white shadow-md text-center">
      <h1 class="text-3xl font-bold">Más</h1>
      <p class="text-lg">Configuración y opciones</p>
    </div>

    <div class="mx-10">
      <div class="mx-auto p-4 space-y-4">
        <!-- USER CARD -->
        <div class="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white">
            <User size={22} />
          </div>
          <div>
            <p class="text-sm text-gray-500">ID: {data.user.id}</p>
          </div>
        </div>

        <!-- OPTIONS -->
        {#each options as item}
          <Button
            variant="ghost"
            class="w-full bg-white rounded-2xl shadow p-8 flex items-center justify-between hover:scale-[1.01] transition text-left"
            onclick={() => goto(item.route)}
          >
            <div class="flex items-center gap-3 flex-1 min-w-0">
              <div class="text-orange-500 w-5 flex justify-center shrink-0">
                <item.icon size={20} />
              </div>

              <div class="flex-1 min-w-0">
                <p class="font-medium text-orange-500 leading-tight">{item.title}</p>
                <p class="text-sm text-gray-500 leading-tight mt-1">{item.desc}</p>
              </div>
            </div>

            <ChevronRight size={18} class="text-orange-400 shrink-0 ml-3" />
          </Button>
        {/each}

        <!-- LOGOUT -->
        <form method="post" action="?/logout" use:enhance>
          <Button
            class="w-full border border-red-400 text-red-500 rounded-xl py-3 mt-4 hover:bg-red-400 transition flex items-center justify-center gap-2"
            type="submit"
          >
            <LogOut size={18} />
            Cerrar Sesión
          </Button>
        </form>
        <!-- FOOTER -->
        <div class="border border-orange-300 rounded-xl p-4 text-center text-sm text-gray-600">
          <p>¿Necesitas ayuda? Visita nuestra sección de ayuda o contacta a soporte</p>
          <p class="text-orange-500 mt-1">soporte@campusbite.edu</p>
        </div>
      </div>
    </div>
  </div>
</div>
