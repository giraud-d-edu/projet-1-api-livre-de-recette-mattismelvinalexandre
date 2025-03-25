<script lang="ts">
	import { goto } from '$app/navigation';
	import { deleteRecette } from '$lib/stores/recette';

	let { recette } = $props();
</script>

<article class="recette-detail">
	<header>
		<img src={recette.image || 'https://placehold.co/600x338?text=No+Image'} alt={recette.nom} />
		<div class="header-content">
			<h1>{recette.nom}</h1>
			<button onclick={() => goto('/')}>🔙 Retour</button>
			<button onclick={() => goto(`/recette/${recette.id}/edit`)}>✏️ Edit</button>
			<button
				onclick={() => {
					deleteRecette(recette.id).then(() => goto('/'));
				}}
			>
				🗑️ Delete
			</button>
			<p class="category">
				{recette.category.name} ✨ {recette.sous_category.map((sub: any) => sub).join(', ')}
			</p>
		</div>
	</header>

	<section class="description">
		<p>🏹 {recette.description}</p>
		<p><strong>⏰ Temps de préparation:</strong> {recette.tps_preparation_min} min</p>
		<p><strong>🍽️ Temps de cuisson:</strong> {recette.tps_cuisson_min} min</p>
		<p><strong>🔥 Type de cuisson:</strong> {recette.type_cuisson}</p>
		<p><strong>🇫🇷 Origine:</strong> {recette.origine}</p>
	</section>

	<section class="ingredients">
		<h2>🛒 Ingrédients</h2>
		<ul>
			{#each recette.ingredients as ingredient}
				<li>{ingredient.quantite_gr}g de {ingredient.nom}</li>
			{/each}
		</ul>
	</section>
</article>

<style>
	.recette-detail {
		background-color: #fff;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		max-width: 600px;
		margin: 20px auto;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	img {
		width: 100%;
		height: auto;
		border-radius: 8px;
		object-fit: cover;
	}

	.header-content {
		margin-top: 10px;
	}

	h1 {
		font-size: 1.8rem;
		margin: 5px 0;
	}

	.category {
		color: #666;
		font-size: 1rem;
	}

	.description {
		margin-top: 15px;
		font-size: 1rem;
	}

	.ingredients {
		margin-top: 20px;
	}

	.ingredients h2 {
		margin-bottom: 10px;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		font-size: 1rem;
		padding: 4px 0;
	}

	button {
		background-color: #f0f0f0;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 5px 10px;
		cursor: pointer;
	}
</style>
