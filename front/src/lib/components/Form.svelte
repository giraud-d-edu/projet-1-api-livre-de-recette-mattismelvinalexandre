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
  
  <form on:submit={submitForm} class="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg">
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
  
    <button
      type="submit"
      class="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      Envoyer
    </button>
    
    {#if successMessage}
      <p class="text-green-500 mt-4">{successMessage}</p>
    {/if}
  
    {#if errorMessage}
      <p class="text-red-500 mt-4">{errorMessage}</p>
    {/if}
  </form>
  