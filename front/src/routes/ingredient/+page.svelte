<script lang="ts">
    import { getAllIngredients, ingredients, addIngredient, deleteIngredient } from '$lib/stores/ingredient';
    import { onMount } from 'svelte';
    import Input from '$lib/components/Input.svelte';
    import Swal from "sweetalert2";
  
    let loading = true;
    let newIngredient = '';
    let error = '';
  
    onMount(async () => {
      loading = true;
      await getAllIngredients();
      loading = false;
    });
  
    async function addNewIngredient() {
      if (!newIngredient.trim()) {
        error = "Le champ ne peut pas être vide.";
        return;
      }
      if (newIngredient.trim().length < 3) {
        error = "Le nom de l'ingrédient doit contenir au moins 3 caractères.";
        return;
      }
      error = '';
      await addIngredient(newIngredient);
      Swal.fire({
        title: 'Ajouté !',
        text: 'L\'ingrédient a été ajouté avec succès.',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true
      });
      newIngredient = '';
    }
  
    async function removeIngredient(id: string) {
      await deleteIngredient(id);
    }
</script>
  
<h1 class="text-2xl font-semibold mb-4">Ingrédients</h1>

<div class="flex gap-2 items-center mb-4">
  <Input
    label="Nouvel ingrédient"
    bind:value={newIngredient}
    placeholder="Ajoutez un ingrédient..."
    error={error}
    onInput={(event) => newIngredient = (event.target as HTMLInputElement).value}
    required={true}
  />
  <button 
    on:click={async () => {
      await addNewIngredient();
    }}
    class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
  >
    Ajouter
  </button>
</div>

{#if loading}
  <p class="text-gray-500 animate-pulse">Chargement des Ingrédients...</p>
{:else if $ingredients.length > 0}
  <ul class="space-y-2">
    {#each $ingredients as ingredient}
      <li class="flex justify-between items-center bg-gray-100 p-2 rounded shadow">
        <span class="text-gray-800">{ingredient.nom}</span>
        <button 
            on:click={async () => {
            const result = await Swal.fire({
              title: 'Êtes-vous sûr ?',
              text: "Cette action est irréversible !",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Oui, supprimer',
              cancelButtonText: 'Annuler'
            });

            if (result.isConfirmed) {
              await removeIngredient(ingredient.id as string);
                Swal.fire({
                title: 'Supprimé !',
                text: 'L\'ingrédient a été supprimé.',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true
                });
            }
            }}
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Supprimer
        </button>
      </li>
    {/each}
  </ul>
{:else}
  <p class="text-gray-500">Aucun ingrédient trouvé.</p>
{/if}
