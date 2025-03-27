<script>  
	import "../app.css";
</script>

<header class="bg-black/30 fixed top-0 left-0 w-full z-10 py-3">
	<nav>
		<ul class="flex justify-center space-x-6">
			<li><a href="/" class="text-white font-bold hover:underline">Recettes</a></li>
			<li><a href="/ingredient" class="text-white font-bold hover:underline">Ingrédients</a></li>
			<li><a href="/contact" class="text-white font-bold hover:underline">Contact</a></li>
		</ul>
	</nav>
</header>

<main class="p-5 mt-12">
	<slot/>
</main>
