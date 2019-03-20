<template>
	<header class="main-header">		
		<b-navbar toggleable="md" type="dark" class="navbarCollapsed">  
			<b-navbar-brand to='/'>
		   		<div class="logo"></div>
			</b-navbar-brand>
			<b-navbar-toggle target="nav_collapse" class="toggle"/>
			<b-collapse is-nav id="nav_collapse">
				<b-navbar-nav class="ml-auto row">
			        <b-nav-form @submit.prevent="onSearch">
			        	<div class="input" :class="{invalid: errors.has('search')}">
			          		<b-form-input size="md" class="mr-sm-2 searchbar" type="text" placeholder="Search..." v-model="search"  data-vv-name="search" v-validate="'required'"/>
			          		<button size="md" class="my-2 my-sm-0" type="submit" >Search</button>
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
					search: this.search.trim()
				}
				if(this.search === ''){
					this.$swal.fire({
						text: "Please fulfill the field.",
						type: 'info',
						confirmButtonColor: '#3085d6',
						confirmButtonText: 'OK!'
					})
				}
				else{
					this.$router.push({
						name: 'searchRecipes',
						params: {
							keyword: this.search
						}
					});
				}
			}
		}
	}
</script>

<style scoped lang="scss">

@import "../styles.scss";

	.main-header{
		background-color: $colorPetrol;
	
	}

	.logo{
		width: 185px;
		height: 70px;
		background: url(../assets/favicon.png) center center no-repeat;
		background-size: cover;
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
		color: $colorLightOrange;
		background-color: $colorPetrol;
	}

	.toggle:hover, .toggle:active{
		color: $colorLightOrange;
		background-color: $colorPetrol;
	}

	button{
		background-color: $colorPetrol;
		padding: 9px;
		margin: 0 13px;
		border: 1px solid $colorLightOrange;
		text-decoration: none;
		font-family: $font;
		color: $colorLightOrange;
		border-radius: 10px;
	}

	button:hover, button:active{
		color: $colorLightBlack;
		background-color: $colorLightCream;
	
	}		
</style>