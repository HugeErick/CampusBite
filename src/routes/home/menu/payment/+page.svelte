<script lang="ts">

  // payment page
  import { goto } from '$app/navigation';
  import { CreditCard, Lock, CheckCircle } from "@lucide/svelte";

  let cardNumber = $state('');
  let cardName = $state('');
  let expiry = $state('');
  let cvv = $state('');
  let success = $state(false);

  function formatCardNumber(val: string) {
    return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(val: string) {
    const clean = val.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  }

  function handleCardNumber(e: Event) {
    cardNumber = formatCardNumber((e.target as HTMLInputElement).value);
  }

  function handleExpiry(e: Event) {
    expiry = formatExpiry((e.target as HTMLInputElement).value);
  }

  function handleCvv(e: Event) {
    cvv = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 3);
  }

  function confirm() {
    if (!cardNumber || !cardName || !expiry || !cvv) return;
    success = true;
    localStorage.removeItem('cb-cart');
    setTimeout(() => goto('/'), 3000);
  }

  // detect card type
  let cardType = $derived(
    cardNumber.startsWith('4') ? 'Visa' :
    cardNumber.startsWith('5') ? 'Mastercard' : ''
  );
</script>

<svelte:head>
  <title>Pago | CampusBite</title>
</svelte:head>

{#if success}
  <div class="min-h-screen flex flex-col items-center justify-center gap-6 bg-(--customWhite) dark:bg-slate-900 px-6 text-center">
    <CheckCircle class="h-20 w-20 text-green-500" />
    <h1 class="text-3xl font-bold text-slate-800 dark:text-white">¡Pedido confirmado!</h1>
    <p class="text-slate-500 dark:text-slate-400">Tu pedido está en camino. Redirigiendo...</p>
  </div>
{:else}
  <div class="min-h-screen bg-(--customWhite) dark:bg-slate-900 pb-28">

    <!-- Header -->
    <section class="rounded-b-3xl bg-(--customGold) px-6 py-8 text-white shadow-md text-center">
      <h1 class="text-3xl font-bold">Pago</h1>
      <p class="mt-2 text-lg flex items-center justify-center gap-2">
        <Lock class="h-4 w-4" /> Pago seguro
      </p>
    </section>

    <div class="mx-auto max-w-md px-6 mt-8 space-y-6">

      <!-- Card preview -->
      <div class="relative h-44 rounded-3xl p-6 shadow-xl overflow-hidden mt-4"
        style="background: linear-gradient(135deg, var(--customGold), #b45309)">
        <div class="absolute inset-0 opacity-10"
          style="background-image: repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%); background-size: 12px 12px;">
        </div>
        <div class="relative flex flex-col h-full justify-between text-white">
          <div class="flex justify-between items-start">
            <CreditCard class="h-8 w-8 opacity-80" />
            <span class="text-sm font-bold opacity-80">{cardType}</span>
          </div>
          <div>
            <p class="text-xl font-mono tracking-widest">
              {cardNumber || '•••• •••• •••• ••••'}
            </p>
            <div class="flex justify-between mt-2 text-sm opacity-80">
              <span>{cardName || 'NOMBRE APELLIDO'}</span>
              <span>{expiry || 'MM/AA'}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-md space-y-4">

        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Número de tarjeta
          </label>
          <input
            type="text"
            inputmode="numeric"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            oninput={handleCardNumber}
            class="w-full rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-(--customGold)"
          />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Nombre en la tarjeta
          </label>
          <input
            type="text"
            placeholder="Juan Pérez"
            bind:value={cardName}
            class="w-full rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-(--customGold)"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Vencimiento
            </label>
            <input
              type="text"
              inputmode="numeric"
              placeholder="MM/AA"
              value={expiry}
              oninput={handleExpiry}
              class="w-full rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-(--customGold)"
            />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              CVV
            </label>
            <input
              type="text"
              inputmode="numeric"
              placeholder="123"
              value={cvv}
              oninput={handleCvv}
              class="w-full rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-(--customGold)"
            />
          </div>
        </div>

        <button
          onclick={confirm}
          class="w-full mt-2 rounded-2xl bg-(--customGold) text-white font-bold py-4 text-base shadow-md transition hover:brightness-95 disabled:opacity-50"
          disabled={!cardNumber || !cardName || !expiry || !cvv}
        >
          Confirmar pago
        </button>

        <p class="text-center text-xs text-slate-400 flex items-center justify-center gap-1">
          <Lock class="h-3 w-3" /> Tus datos están protegidos
        </p>
      </div>
    </div>
  </div>
{/if}
