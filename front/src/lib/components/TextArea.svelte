<script lang="ts">
  export let label: string;
  export let value: string = '';
  export let placeholder: string = '';
  export let error: string = '';
  export let onInput: (event: Event) => void = () => {};

  function handleInput(event: Event) {
      onInput(event);
  }
</script>

<div class="mb-4">
  <label for="textarea" class="block font-semibold text-gray-700">{label}</label>
  <textarea
      id="textarea"
      bind:value
      placeholder={placeholder}
      on:input={handleInput}
      class="w-full mt-2 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-36"
  ></textarea>
  {#if error}
      <p class="text-red-500 text-sm mt-1">{error}</p>
  {/if}
</div>
