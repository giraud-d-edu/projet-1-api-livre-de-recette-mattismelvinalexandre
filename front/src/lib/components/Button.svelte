<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' = 'button';
    export let disabled: boolean = false;
    export let onClick: (event: Event) => void = () => {};

    function handleClick(event: Event) {
        onClick(event);
    }
</script>

<button class="styled-button" type={type} on:click={handleClick} disabled={disabled}>
    <slot></slot>
</button>

<style>
    .styled-button {
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 10px 15px;
        font-size: 16px;
        transition: background 0.3s ease;
    }

    .styled-button:hover {
        background-color: #0056b3;
    }

    .styled-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>
