<script lang="ts">
// login page
import * as z from "zod";
import { Button } from "$lib/components/ui/button/index.js";
import { Label } from "$lib/components/ui/label/index.js";
import { Input } from "$lib/components/ui/input/index.js";
import * as Card from "$lib/components/ui/card/index.js";
import { LoaderCircle, Coffee } from "@lucide/svelte";

let studentId: number;
let password = "";
let message = "";
let isLoading = false;

type LoginFields = z.infer<typeof loginSchema>;
let errors: Partial<Record<keyof LoginFields, string[]>> = {};

const loginSchema = z.object({
  studentId: z.coerce.number().min(4, "invalid id, too short").max(1000000, "invalid id, too long"),
  password: z.string().min(1, "Password is requiered"),
})
.strict() // dont allow extra fields from request  

async function handleLogin() {
  errors = {}
  message = "";

  const result = loginSchema.safeParse({ studentId, password });

  if (!result.success) {
    // 'flat' transforms Zod's nested error array into a key-value object
    const flat = result.error.issues.reduce((acc, issue) => {
        const key = issue.path[0] as keyof LoginFields;
        if (key) acc[key] = [...(acc[key] ?? []), issue.message];
        return acc;
    }, {} as Partial<Record<keyof LoginFields, string[]>>);
    errors = flat;
    return;
  }
  isLoading = true;
}
</script>

<section class="w-screen h-screen">
  <Card.Root class="absolute p-8 w-4xl max-w-sm top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <Card.Header class="flex flex-col items-center gap-2">
    <!-- logo -->
      <div>
        <Coffee /> 
      </div>

    <!-- logo -->
      <Card.Title class="text-3xl text-(--customGold)">CAMPUSBITE</Card.Title>    
      <Card.Description>
        Institutional access
      </Card.Description>
    </Card.Header>

    <form on:submit|preventDefault={handleLogin}>
      <Card.Content>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label for="cb-studentid">Institutional ID</Label>
            <Input id="cb-studentid" bind:value={studentId} required />
            {#if errors.studentId}
              <p class="text-xs text-red-500">{errors.studentId[0]}</p>
            {/if}
          </div>

          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="nur-password">Password</Label>
              <Card.Description class="ms-auto inline-block text-sm underline-offset-4 hover:underline">
                <a
                  href="/forgotPassword"
                >
                  Forgot your password?
                </a>
              </Card.Description>
            </div>
            <Input id="nur-password" bind:value={password} type="password" required />
            {#if errors.password}
              <p class="text-xs text-red-500">{errors.password[0]}</p>
            {/if}
            <Card.Description class="hover:underline">
              <a
                href="/signUp"
              >
                Don't have an Account?
              </a>
            </Card.Description>
          </div>
        </div>
      </Card.Content>
      <Card.Footer class="flex flex-col mt-2 w-full">
        <Card.Action class="w-full">
          <Button type="submit" class="w-full" disabled={isLoading}>
            {#if isLoading}
              <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
              Please wait
            {:else}
              Login
            {/if}
          </Button>
        </Card.Action>
        {#if message}
          <p
            class="text-sm
            {message.includes("success") ? "text-green-500" : "text-blue-500"}"
          >
            {message}
          </p>
        {/if}
      </Card.Footer>
    </form>
  </Card.Root>
</section>
