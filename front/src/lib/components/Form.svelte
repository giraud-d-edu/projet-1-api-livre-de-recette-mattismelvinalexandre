<script lang="ts">
	import Input from "./Input.svelte";
	import TextArea from "$lib/components/TextArea.svelte";

  
    let name = '';
    let email = '';
    let message = '';
  
    let nameError = '';
    let emailError = '';
    let messageError = '';
  
    let successMessage = '';
    let errorMessage = '';
  
    function validateForm() {
        let isValid = true;
  
        nameError = '';
        emailError = '';
        messageError = '';
  
        if (name.trim() === '') {
            nameError = 'Le nom est requis.';
            isValid = false;
        }
  
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email.trim())) {
            emailError = 'Veuillez entrer un email valide.';
            isValid = false;
        }
  
        if (message.trim() === '') {
            messageError = 'Le message ne peut pas être vide.';
            isValid = false;
        }
  
        return isValid;
    }
  
    async function submitForm(event: Event) {
        event.preventDefault();
  
        if (!validateForm()) return;
  
        try {
            // const response = await sendContactForm(name, email, message);
            // successMessage = response.message;
            errorMessage = "";
            name = '';
            email = '';
            message = '';
        } catch (error) {
            errorMessage = "Erreur lors de l'envoi du message.";
            successMessage = "";
        }
    }
  </script>
  
  <form on:submit={submitForm}>
    <Input
        label="Nom"
        bind:value={name}
        placeholder="Entrez votre nom"
        error={nameError}
        on:input={() => nameError = ''}
    />
  
    <Input
        label="Email"
        type="email"
        bind:value={email}
        placeholder="Entrez votre email"
        error={emailError}
        on:input={() => emailError = ''}
    />
  
    <TextArea
        label="Message"
        bind:value={message}
        placeholder="Entrez votre message"
        error={messageError}
        on:input={() => messageError = ''}
    />
  
    <button type="submit">Envoyer</button>
  </form>
  
  {#if successMessage}
    <p style="color: green;">{successMessage}</p>
  {/if}
  
  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
  
  <style>
    form {
        max-width: 500px;
        margin: 0 auto;
        padding: 2rem;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
  
    button {
        padding: 0.7rem 1.5rem;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
  
    button:hover {
        background-color: #45a049;
    }
  </style>
  