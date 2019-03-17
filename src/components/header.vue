<template>
	<header class="main-header">		
		<b-navbar toggleable="lg" type="dark" class="navbarCollapsed">  
			<b-navbar-brand class="logo-name">
			<!--	<img src="../assets/favicon.png" alt=""/> -->
				<router-link to='/'>Foodipedia</router-link>  
			</b-navbar-brand>
			<b-navbar-toggle target="nav_collapse"  class="toggle"/>
			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav class="ml-auto">
			        <b-nav-form @submit.prevent="onSearch">
			        	<div class="input" :class="{invalid: errors.has('search')}">
			          		<b-form-input size="md" class="mr-sm-2 searchbar" type="text" placeholder="Search..." v-model="search"  data-vv-name="search" v-validate="'required'"/>
			          		<b-button size="md" class="my-2 my-sm-0" type="submit" >Search</b-button>
			          	</div>
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
		data(){
			return{
				search: ''
			}
		},
		computed: {
			auth(){
				return this.$store.getters.isAuthenticated
			}
		},
		methods: {
			onLogout(){
				this.$store.dispatch('logout')
			},
			onSearch(){
				const formData = {
					search: this.search
				}
				this.$router.push({
					name: 'searchRecipes',
					params: {
						keyword: this.search
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">

@import "../styles.scss";

	.main-header{
		background-color: $colorLightBlack;
		height: 76px;

	}

	.logo-name{
		font-weight: bold;
		color: white;
		font-size: 32px;
		font-family: $font;
		
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
		font-family: $font;

		@include mq-mobile {
			width: 180px;
		}

		@include mq-tablet {
			width: 220px;
		}
	}
	
	.toggle{
		color: white;
		background-color: transparent;
	}

	.toggle:hover, .toggle:active{
		color: white;
		background-color: transparent;
	}

	button{
		background-color: transparent;
		padding: 9px;
		margin: 0 13px;
		border: 1px solid #ffffff;
		text-decoration: none;
		font-family: $font;
		color: white;
		border-radius: 10px;
	}

	button:hover, button:active{
		color: $colorLightBlack;
		background-color: $colorLightGrey;
		border: 1px solid $colorLightBlack;
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