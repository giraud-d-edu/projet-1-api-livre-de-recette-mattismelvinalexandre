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

<div class="flex flex-col gap-1">
    <label class="font-semibold text-gray-700">{label}</label>
    <select 
        bind:value={value} 
        on:change={handleChange}
        class="p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none w-full"
    >
        <option value="" disabled selected>Sélectionner...</option>
        {#each options as option}
            <option value={option[optionValue]}>{option[optionLabel]}</option>
        {/each}
    </select>

    {#if error}
        <p class="text-red-500 text-sm mt-1">{error}</p>
    {/if}
</div>
