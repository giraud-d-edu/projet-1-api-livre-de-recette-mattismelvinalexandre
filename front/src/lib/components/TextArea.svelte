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
  
  <div>
    <label for="textarea">{label}</label>
    <textarea
      id="textarea"
      bind:value
      placeholder={placeholder}
      on:input={handleInput}
    ></textarea>
    {#if error}
      <p class="error">{error}</p>
    {/if}
  </div>
  
  <style>
    div {
      margin-bottom: 1rem;
    }
  
    label {
      font-weight: bold;
      display: block;
    }
  
    textarea {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      resize: none;
      height: 150px;
    }
  
    .error {
      color: red;
      font-size: 0.9rem;
    }
  </style>
  