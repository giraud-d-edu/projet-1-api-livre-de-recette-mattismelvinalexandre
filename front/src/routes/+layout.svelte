<script>
  </script>
  
  <header>
	<nav>
	  <ul>
		<li><a href="/">Accueil</a></li>
		<li><a href="/recette">Recette</a></li>
	  </ul>
	</nav>
  </header>
  
  <main>
	<slot/>
  </main>
  
  <style>
	* {
	  margin: 0;
	  padding: 0;
	}
  
	header {
	  background-color: rgba(0, 0, 0, 0.3);
	  padding: 10px 0;
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  z-index: 10;
	}
  
	nav ul {
	  display: flex;
	  list-style-type: none;
	  justify-content: center;
	}
  
	nav ul li {
	  margin: 0 15px;
	}
  
	nav ul li a {
	  color: white;
	  text-decoration: none;
	  font-weight: bold;
	}
  
	nav ul li a:hover {
	  text-decoration: underline;
	}
  
	main {
	  padding: 20px;
	  margin-top: 50px;
	}
  </style>
  