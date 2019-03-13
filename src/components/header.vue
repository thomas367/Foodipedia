<template>
	<header class="main-header">		
		<b-navbar toggleable="lg" type="dark" class="navbarCollapsed">  
			<b-navbar-brand class="logo-name">
				<router-link to='/'>Foodipedia</router-link>  
			</b-navbar-brand>
			<b-navbar-toggle target="nav_collapse"/>
			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav class="ml-auto">
			        <b-nav-form>
			          <b-form-input size="md" class="mr-sm-2 searchbar" type="text" placeholder="Search..." />
			          <b-button size="md" class="my-2 my-sm-0" type="submit">Search</b-button>
			        </b-nav-form>
			    </b-navbar-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item v-if="!auth">
						<router-link to="/signin" tag="button">Sign In</router-link>  
					</b-nav-item>
					<b-nav-item v-if="!auth">
						<router-link to="/signup" tag="button">Sign Up</router-link>  
					</b-nav-item>
					<b-nav-item v-if="auth">
						<router-link to="/myRecipes" tag="button">My recipes</router-link>
					</b-nav-item>
					<b-nav-item v-if="auth">
						<button @click="onLogout" class="logout">Logout</button>
					</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
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
			/*
			 * TODO: Add Search action.
			 */
		}
	}
</script>

<style scoped lang="scss">

@import "../styles.scss";

	.main-header{
		background-color: $colorLightBlack;
		
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

	.navbarCollapsed{
		background-color: $colorLightBlack;

	}

	.searchbar{
		width: 220px;
	}
				
	button{
		background-color: transparent;
		padding: 9px;
		margin: 0 13px;
		border: 1px solid #ffffff;
		text-decoration: none;
		color: white;
		border-radius: 10px;
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