<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { LoaderCircle, Coffee } from "@lucide/svelte";
  import type { SubmitFunction } from "./$types";

  let { form } = $props();
  let studentId = $state(""); // bind:value works better with $state in Svelte 5
  let password = $state("");
  let isLoading = $state(false);

  const handleEnhance: SubmitFunction = () => {
    isLoading = true;
    return async ({ update }) => {
      isLoading = false;
      await update();
    };
  };
</script>

<section class="w-screen h-screen">
  <Card.Root class="p-8 w-4xl max-w-sm absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Card.Header class="flex flex-col items-center gap-2">
      <div>
        <Coffee /> 
      </div>

      <Card.Title class="text-3xl text-(--customGold)">CAMPUSBITE</Card.Title>    
      <Card.Description>
        Institutional access
      </Card.Description>
    </Card.Header>

    <form method="POST" action="?/login" use:enhance={handleEnhance}>
      <Card.Content>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label for="cb-studentid">Institutional ID</Label>
            <!-- Note: name="studentId" is the key for the server -->
            <Input id="cb-studentid" name="studentId" bind:value={studentId} required />
          </div>

          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="nur-password">Password</Label>
            </div>
            <Input id="nur-password" name="password" bind:value={password} type="password" required />
          </div>
        </div>
      </Card.Content>

      <Card.Footer class="flex flex-col mt-2 w-full">
        <div class="w-full">
          <Button type="submit" class="w-full" disabled={isLoading}>
            {#if isLoading}
              <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
              Please wait
            {:else}
              Login
            {/if}
          </Button>
        </div>

        {#if form?.message}
          <p class="text-sm mt-2 {form?.success ? 'text-green-500' : 'text-blue-500'}">
            {form.message}
          </p>
        {/if}
      </Card.Footer>
    </form>
  </Card.Root>
</section>
