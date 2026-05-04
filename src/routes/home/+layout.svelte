<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { House, Info, Ellipsis } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button/index.js";

  let { children } = $props();

  const isActive = (path: string) => page.url.pathname === path;
</script>

{@render children?.()}

<nav class="fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-sm shadow-md border-t-stone-400">
  <div class="mx-auto flex h-16 align-middle text-center justify-around px-2 text-sm">
    
    <!-- HOME -->
    <Button
      onclick={() => goto('/home')}
      class="flex flex-1 flex-col items-center justify-center h-full bg-transparent hover:bg-transparent {isActive('/home') ? 'text-(--customGold)' : 'text-slate-500 hover:text-(--customGold)'}"
    >
      <House class="h-5 w-5" />
      <span class="mt-1 text-xs font-medium">HOME</span>
    </Button>

    <!-- ABOUT -->
    <Button
      onclick={() => goto('/home/about')}
      class="flex flex-1 flex-col items-center justify-center h-full bg-transparent hover:bg-transparent {isActive('/home/about') ? 'text-(--customGold)' : 'text-slate-500 hover:text-(--customGold)'}"
    >
      <Info class="h-5 w-5" />
      <span class="mt-1 text-xs">ABOUT</span>
    </Button>

    <!-- MORE -->
    <Button
      onclick={() => goto('/home/more')}
      class="flex flex-1 flex-col items-center justify-center h-full bg-transparent hover:bg-transparent {isActive('/home/more') ? 'text-(--customGold)' : 'text-slate-500 hover:text-(--customGold)'}"
    >
      <Ellipsis class="h-5 w-5" />
      <span class="mt-1 text-xs">MORE</span>
    </Button>
    
  </div>
</nav>
