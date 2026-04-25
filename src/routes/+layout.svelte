  <script lang="ts">
  // indentation does work here (it should be 1 after script tag)
    import "../app.css";
    import { ModeWatcher, toggleMode} from "mode-watcher";
    import { Sun, Moon } from "@lucide/svelte";
    import { Button } from "$lib/components/ui/button/index.js";

    let { children } = $props();

    let isDark = $state(true);

    function handleToggle() {
      isDark = !isDark;
      toggleMode();
    }
  </script>

<svelte:head>
  <!-- indentation working here -->
  <!-- <link rel="icon" href={favicon} /> -->
</svelte:head>

<ModeWatcher />

<div
  class="
  bg-(--customWhite) dark:bg-(--darkTheme) rubikal
  flex flex-col items-center justify-center antialiased
  "
>
  <Button
    variant="ghost"
    class="absolute top-4 right-4 flex items-center gap-2 p-2"
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
