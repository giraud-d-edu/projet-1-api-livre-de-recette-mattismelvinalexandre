<script lang="ts">
    export let label: string;
    export let value: string = '';
    export let options: { [key: string]: any }[] = [];
    export let optionLabel: string;
    export let optionValue: string;
    export let error: string = '';
    export let onChange: (event: Event) => void = () => {};

    function handleChange(event: Event) {
        onChange(event);
    }
</script>

<div class="select-field">
    <label>{label}</label>
    <select bind:value={value} on:change={handleChange}>
        <option value="" disabled selected>Sélectionner...</option>
        {#each options as option}
            <option value={option[optionValue]}>{option[optionLabel]}</option>
        {/each}
    </select>
    {#if error}
        <p class="error-message">{error}</p>
    {/if}
</div>

<style>
    .select-field {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    select {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: white;
    }

    .error-message {
        color: red;
        font-size: 0.875rem;
    }
</style>
