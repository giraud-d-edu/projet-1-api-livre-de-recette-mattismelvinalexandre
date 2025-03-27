<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let disabled: boolean = false;
    export let onClick: (event: Event) => void = () => {};

    function handleClick(event: Event) {
        onClick(event);
    }
</script>

<button 
    class="bg-blue-500 text-white border-none rounded-md cursor-pointer px-4 py-2 text-base transition-all ease-in-out duration-300 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed" 
    type={type} 
    on:click={handleClick} 
    disabled={disabled}
>
    <slot></slot>
</button>
