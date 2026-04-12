<script lang="ts">
	import "../app.css";
	import { ModeWatcher, toggleMode} from "mode-watcher";
  import { Switch } from "$lib/components/ui/switch/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
  import { Sun, Moon } from "@lucide/svelte";

	let { children } = $props();

  let isDark = $state(true);

  function handleToggle() {
    isDark = !isDark;
    toggleMode();
  }

</script>

<svelte:head>
	<!-- <link rel="icon" href={favicon} /> -->
</svelte:head>

<ModeWatcher />

<div
	class="
	bg-(--customWhite) dark:bg-(--darkTheme) rubikal
	flex flex-col items-center justify-center antialiased
	"
>

  <div class="absolute top-4 right-4 flex items-center gap-2 p-2">
    {#if isDark}
      <Moon class="h-4 w-4" />
    {:else}
      <Sun class="h-4 w-4" />
    {/if}
          
    <Switch 
      id="toggle-theme" 
      onCheckedChange={handleToggle} 
    />
          
    <Label for="toggle-theme" class="sr-only">
      Toggle theme
    </Label>
  </div>

	{@render children?.()}
</div>
