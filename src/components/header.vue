<template>
	<header class="main-header">	
		<div class="col-3 logo-name">
			<router-link to='/'>Foodipedia</router-link>
		</div>			
		<nav>
			<ul>
				<li v-if="!auth">
					<router-link to="/signin" tag="button">Sign In</router-link>
				</li>
				<li v-if="!auth">
					<router-link to="/signup" tag="button">Sign Up</router-link>
				</li>
				<li v-if="auth">
					<router-link to="/myRecipes" tag="button">My recipes</router-link>
				</li>
				<li v-if="auth">
					<button @click="onLogout" class="logout">Logout</button>
				</li>
			</ul>
		</nav>
	</header>
</template>

<script>
	export default {
		computed: {
			auth(){
				return this.$store.getters.isAuthenticated
			}
		},
		methods: {
			onLogout(){
				this.$store.dispatch('logout')
			}
		}
	}
</script>

<style scoped lang="scss">

@import "../styles.scss";

	.main-header{
		height: 56px;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		background-color: $colorLightBlack;
		padding: 0 20px;
	}

	.logo-name{
		font-weight: bold;
		color: white;
		font-size: 32px;
		font-family: Lato;
		a{
			text-decoration: none;	
			color: white;
		}
	}

	.logo-name:hover, .logo-name:active{
		color: white;
	}

	
	nav{
		height: 100%
	}
	
	ul{
		list-style: none;
		padding: 0;
		margin: 0;
		height: 100%;
		display: flex;
		flex-flow: row;
		align-items: center;
	}
				
	button{
		background-color: transparent;
		padding: 9px;
		margin: 0 13px;
		border: 1px solid #ffffff;
		text-decoration: none;
		color: white;
	}

	button:hover, button:active{
		color: $colorLightGrey;
		background-color: white;
		border: 1px solid $colorLightGrey;
	}

	.logout{
		background-color: transparent;
		border: none;
		font: inherit;
		color: white;
		cursor: pointer;
		border: 1px solid #ffffff;
	}
		
</style>