<script lang="ts">
  import { goto } from '$app/navigation';

  import {
    User,
    Clock,
    Bell,
    CircleHelp,
    Settings,
    LogOut,
    ChevronRight,
    House,
    Info,
    Ellipsis
  } from '@lucide/svelte/icons';

  const options = [
    {
      title: 'Mi Perfil',
      desc: 'Ver y editar información personal',
      icon: User,
      route: '/profile'
    },
    {
      title: 'Historial de Pedidos',
      desc: 'Ver tus pedidos anteriores',
      icon: Clock,
      route: '/orders'
    },
    {
      title: 'Notificaciones',
      desc: 'Configurar alertas y avisos',
      icon: Bell,
      route: '/notifications'
    },
    {
      title: 'Ayuda y Soporte',
      desc: 'Preguntas frecuentes y asistencia',
      icon: CircleHelp,
      route: '/support'
    },
    {
      title: 'Configuración',
      desc: 'Ajustes de la aplicación',
      icon: Settings,
      route: '/settings'
    }
  ];

  function logout() {
    goto('/');
  }
</script>

<div class="min-h-screen bg-[#f7f1e8] pb-32">
  <!-- HEADER -->
  <div class="bg-gradient-to-r from-orange-400 to-amber-300 p-6 rounded-b-3xl">
    <h1 class="text-xl font-bold text-orange-600">Más</h1>
    <p class="text-sm text-orange-500">Configuración y opciones</p>
  </div>

  <div class="max-w-md mx-auto p-4 space-y-4">
    <!-- USER CARD -->
    <div class="bg-white rounded-2xl shadow p-4 flex items-center gap-4">
      <div class="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center text-white">
        <User size={22} />
      </div>
      <div>
        <p class="font-semibold text-orange-500">Estudiante 112</p>
        <p class="text-sm text-gray-500">ID: 112</p>
      </div>
    </div>

    <!-- OPTIONS -->
    {#each options as item}
      <button
        type="button"
        class="w-full bg-white rounded-2xl shadow p-4 flex items-center justify-between hover:scale-[1.01] transition text-left"
        on:click={() => goto(item.route)}
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="text-orange-500 w-5 flex justify-center shrink-0">
            {#if item.icon}
              <item.icon size={20} />
            {/if}
          </div>

          <div class="flex-1 min-w-0">
            <p class="font-medium text-orange-500 leading-tight">{item.title}</p>
            <p class="text-sm text-gray-500 leading-tight mt-1">{item.desc}</p>
          </div>
        </div>

        <ChevronRight size={18} class="text-orange-400 shrink-0 ml-3" />
      </button>
    {/each}

    <!-- LOGOUT -->
    <button
      class="w-full border border-red-400 text-red-500 rounded-xl py-3 mt-4 hover:bg-red-50 transition flex items-center justify-center gap-2"
      on:click={logout}
    >
      <LogOut size={18} />
      Cerrar Sesión
    </button>

    <!-- FOOTER -->
    <div class="border border-orange-300 rounded-xl p-4 text-center text-sm text-gray-600">
      <p>¿Necesitas ayuda? Visita nuestra sección de ayuda o contacta a soporte</p>
      <p class="text-orange-500 mt-1">soporte@campusbite.edu</p>
    </div>
  </div>

  <!-- NAVBAR -->
  <nav class="fixed bottom-3 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-50">
    <div class="flex items-center justify-around rounded-2xl bg-white/95 shadow-lg border border-gray-200 h-20 backdrop-blur-sm">
      <!-- HOME -->
      <button
        on:click={() => goto('/home')}
        class="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-orange-500"
      >
        <House class="h-5 w-5" />
        <span class="mt-1 text-[11px]">HOME</span>
      </button>

      <!-- ABOUT -->
      <button
        on:click={() => goto('/home/about')}
        class="flex flex-1 flex-col items-center justify-center text-slate-500 hover:text-orange-500"
      >
        <Info class="h-5 w-5" />
        <span class="mt-1 text-[11px]">ABOUT</span>
      </button>

      <!-- MORE -->
      <button
        class="flex flex-1 flex-col items-center justify-center text-orange-500"
      >
        <Ellipsis class="h-5 w-5" />
        <span class="mt-1 text-[11px] font-medium">MORE</span>
      </button>
    </div>
  </nav>
</div>