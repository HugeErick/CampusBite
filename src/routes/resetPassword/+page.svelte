<script lang="ts">
import * as z from "zod";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";

  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Loader2 } from "@lucide/svelte";

  // ESTADO
  let newPassword = "";
  let confirmPassword = "";
  let message = "";
  let isLoading = false;
  let success = false;

  // ERRORES POR CAMPO
  let errors = {
    newPassword: "",
    confirmPassword: "",
    general: ""
  };

  const token = $page.url.searchParams.get("token");

  // VALIDACIÓN  (mínimo 8 caracteres)
  const schema = z.object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
  }).refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });

  function clearErrors() {
    errors = { newPassword: "", confirmPassword: "", general: "" };
    message = "";
  }

  async function handleReset() {
    clearErrors();
    success = false;

    if (!token) {
      errors.general = "Invalid or missing reset token";
      return;
    }

    const result = schema.safeParse({ newPassword, confirmPassword });

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field === "newPassword") errors.newPassword = issue.message;
        else if (field === "confirmPassword") errors.confirmPassword = issue.message;
        else errors.general = issue.message;
      }
      return;
    }

    try {
      isLoading = true;

      //  (luego aquí irá backend real)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      success = true;
      message = "Password updated successfully. You can now log in.";

      newPassword = "";
      confirmPassword = "";
    } catch (error) {
      errors.general = "Something went wrong. Try again.";
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- fondo negro general, SIN caja centrada -->
<section class="flex min-h-screen items-center justify-center bg-black px-4">

  <!-- quité estilos de fondo/borde del Card -->
  <Card.Root class="w-full max-w-sm p-8">


    <div class="mb-6 text-center">
      <h1 class="text-3xl font-bold text-orange-500">Reset Password</h1>
      <p class="mt-2 text-sm text-zinc-400">
        Enter your new password
      </p>
    </div>

    <form on:submit|preventDefault={handleReset}>
      <Card.Content>
        <div class="flex flex-col gap-5">

          <!-- NEW PASSWORD -->
          <div class="grid gap-2">
            <Label for="new-password" class="text-white">New Password</Label>

            <!-- estilos dark -->
            <Input
              id="new-password"
              bind:value={newPassword}
              type="password"
              required
              class="border-zinc-700 bg-zinc-900 text-white"
            />

            <!--  ERROR POR CAMPO -->
            {#if errors.newPassword}
              <p class="text-sm text-red-500">{errors.newPassword}</p>
            {/if}
          </div>

          <!-- CONFIRM PASSWORD -->
          <div class="grid gap-2">
            <Label for="confirm-password" class="text-white">Confirm Password</Label>

            <Input
              id="confirm-password"
              bind:value={confirmPassword}
              type="password"
              required
              class="border-zinc-700 bg-zinc-900 text-white"
            />

            {#if errors.confirmPassword}
              <p class="text-sm text-red-500">{errors.confirmPassword}</p>
            {/if}
          </div>

          <!-- ERROR GENERAL -->
          {#if errors.general}
            <p class="text-sm text-red-500">{errors.general}</p>
          {/if}

          <!-- MENSAJE DE ÉXITO / ERROR -->
          {#if message}
            <p class="text-sm {success ? 'text-green-500' : 'text-red-500'}">
              {message}
            </p>
          {/if}
        </div>
      </Card.Content>

      <!-- BOTONES -->
      <Card.Footer class="mt-4 flex flex-col gap-3">

        <!-- RESET -->
        <Button
          type="submit"
          class="w-full bg-orange-500 text-white hover:bg-orange-600"
          disabled={isLoading}
        >
          {#if isLoading}
            <Loader2 class="mr-2 h-4 w-4 animate-spin" />
            Please wait
          {:else}
            Reset Password
          {/if}
        </Button>

        <!-- Boton funcional -->
        <Button
          type="button"
          variant="outline"
          class="w-full border-zinc-700 bg-transparent text-white hover:bg-zinc-900"
          on:click={() => goto("/")}
        >
          Back to Login
        </Button>

      </Card.Footer>
    </form>
  </Card.Root>
</section>