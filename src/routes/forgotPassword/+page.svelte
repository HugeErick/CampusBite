<script lang="ts">
  import * as z from "zod";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Loader2 } from "@lucide/svelte";

  let email = "";
  let message = "";
  let isLoading = false;

  const schema = z.object({ email: z.string().email("Invalid email") });

  async function handleSubmit() {
    message = "";
    const result = schema.safeParse({ email });
    if (!result.success) {
      message = result.error.issues[0].message;
      return;
    }

    isLoading = true;
  }
</script>

<section class="w-screen h-screen">
  <Card.Root class="absolute p-8 w-4xl max-w-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Card.Header>
      <Card.Title class="text-3xl text-(--customGold)">Forgot Password</Card.Title>
    </Card.Header>

    <form on:submit|preventDefault={handleSubmit}>
      <Card.Content>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label for="email">Email</Label>
            <Input id="email" bind:value={email} type="email" placeholder="your@email.com" required />
          </div>
        </div>
      </Card.Content>
      <Card.Footer class="flex flex-col mt-2 w-full">
        <Card.Action class="w-full">
          <Button type="submit" class="w-full" disabled={isLoading}>
            {#if isLoading}
              <Loader2 class="mr-2 h-4 w-4 animate-spin" />
              Please wait
            {:else}
              Send Reset Link
            {/if}
          </Button>
        </Card.Action>
        {#if message}
          <p class="text-sm mt-2
            {message.includes('email') ? 'text-green-500' : 'text-red-500'}">
            {message}
          </p>
        {/if}
      </Card.Footer>
    </form>
  </Card.Root>
</section>
