<script lang="ts">
  //layout
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { ModeWatcher, toggleMode} from "mode-watcher";
  import {
    Sun, Moon, 
  } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button/index.js";

  let { children } = $props();
  let isDark = $state(true);

  function handleToggle() {
    isDark = !isDark;
    toggleMode();
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<SvelteToast />

<div
  class="
  bg-(--customWhite) dark:bg-(--darkTheme) rubikal
  flex flex-col items-center justify-center antialiased
  "
>
  <Button
    variant="ghost"
    class="hidden border-2 border-stone-200 border-dashed lg:flex z-100 absolute top-4 right-4 items-center gap-2 p-2 dark:text-slate-200 text-slate-800" 
    onclick={handleToggle}
  >
    {#if isDark}
      <Moon class="h-4 w-4" />
    {:else}
      <Sun class="h-4 w-4" />
    {/if}
  </Button>
  {@render children?.()}
</div>
