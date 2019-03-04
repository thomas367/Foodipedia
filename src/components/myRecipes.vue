<template>
	<b-container>
		<div class="recipe" v-for="recipe in recipes">
			<div class="recipe_card col-4" @click="showRecipe(recipe.recipe_id)">
				<div class="image">
					<b-img :src="recipe.img_path" height="300" width="300"/>
				</div>
				<div class="recipeName">
					<label for="recipe_name">Recipe</label>
					<p>{{recipe.recipe_name}}</p>
				</div>
				<div class="row">
					<div class="cuisine">
						<label for="cuisine">Cuisine</label>
						<p>{{recipe.cuisine}}</p>
					</div>
					<div class="category">
						<label for="category">Category</label>
						<p>{{recipe.category}}</p>
					</div>
				</div>			
 			</div>
		</div>
		<router-link to="/recipeForm" tag="button">Add recipe</router-link>
	</b-container>
</template>

<script>
	import axios from 'axios'
	import store from '@/store'

	export default {
		data(){
			return{
				recipes:[]
			}
		},
		created() {
			this.getRecipes()
		},
		methods: {
		/*	
			// transfer to showRecipe component 
			   and show recipe data with specific id.
			showRecipe(id){
				return '/showRecipe/'+id
			},
		*/
			getRecipes(){
				const token = localStorage.getItem('token');
				axios.get('/myRecipes', {
					headers:{
						'Authorization': 'Bearer' + token
					}
				})
				.then(response =>{
					//console.log(response);
					this.recipes = response.data;
				})
				.catch(error =>{
					if(error.response.status === 401){
						console.log('You are an unauthorized user.')
					}
				});
			}
		}	
	}
</script>

<style scoped lang="scss">
	@import "../styles.scss"; 

	.recipe_card{
		margin: 6px;
		padding: 4px;
		border: 1px solid #cccccc;

		.image{
			text-align: center;

		}
		
		.recipeName{
			text-align: center;

		}

		label{
			font-weight: bold;
		}

		.tags{
			text-align: center;

			.cuisine{
				p{
					background-color: red;
					border-radius: 10px;
					padding: 3px, 6px, 3px, 6px;
					color: white;
				}
			}

			.category{
				p{
					background-color: green;
					border-radius: 10px;
					padding: 3px, 6px, 3px, 6px;
					color: white;
				}
			}
		}

	}

	button{
		background-color: $colorLightBlack;
		padding: 9px;
		margin: 0 13px;
		border: 1px solid #ffffff;
		text-decoration: none;
		color: white;
	}
	
</style>