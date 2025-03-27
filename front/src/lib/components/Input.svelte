<script lang="ts">
  export let label: string;
  export let type: string = 'text';
  export let value: string | number = '';
  export let placeholder: string = '';
  export let error: string = '';
  export let required: boolean = false;
  export let onInput: (event: Event) => void = () => {};

  function handleInput(event: Event) {
    onInput(event);
  }
</script>

<div class="mb-4">
  <label for="input-{label}" class="font-semibold block text-gray-700">
    {label}
  </label>
  <input
    id="input-{label}"
    type={type}
    bind:value
    placeholder={placeholder}
    on:input={handleInput}
    required={required}
    class="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
  {#if error}
    <p class="text-red-500 text-sm mt-1">{error}</p>
  {/if}
</div>
