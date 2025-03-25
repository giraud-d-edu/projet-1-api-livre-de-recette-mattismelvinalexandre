<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Recette } from '$lib/types/recette.ts';

	export let recette: Recette;
</script>

<article class="card">
	<header>
    {#if recette.image}
      <img src={recette.image} alt={recette.nom} />
    {:else}
      <img src="https://placehold.co/300x169?text=Upload an image" alt={recette.nom} />
    {/if}
		<h2>{recette.nom}</h2>
		<p class="category">
			{recette.category.name} ✨ {recette.sous_category.map((sub) => sub).join(', ')}
		</p>
	</header>
	<section class="description">
		<p>🏹 {recette.description}</p>
		<p><strong>⏰ Temps de préparation:</strong> {recette.tps_preparation_min} min</p>
		<p><strong>🍽️ Temps de cuisson:</strong> {recette.tps_cuisson_min} min</p>
		<p><strong>🔥 Type de cuisson:</strong> {recette.type_cuisson}</p>
		<p><strong>🇫🇷 Origine:</strong> {recette.origine}</p>
	</section>
	<footer>
		<h3>Ingrédients:</h3>
		<ul>
			{#each recette.ingredients as ingredient}
				<li>- {ingredient.quantite_gr} grammes de {ingredient.nom}</li>
			{/each}
		</ul>
    <button on:click={() => goto(`/recette/${recette.id}`)}>
      👩‍🍳 Voir la recette
    </button>
	</footer>
</article>

<style>
	.card {
		background-color: #fff;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin: 10px;
		width: 300px;
	}

	header {
		margin-bottom: 15px;
	}

	h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	.category {
		color: #666;
		font-size: 0.9rem;
	}

	.description p {
		margin: 5px 0;
		font-size: 0.9rem;
	}

	footer {
		margin-top: 15px;
	}

	footer h3 {
		margin-bottom: 10px;
	}

	ul {
		list-style-type: none;
		padding-left: 0;
	}

	li {
		font-size: 0.9rem;
	}

  button {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
  }
</style>
