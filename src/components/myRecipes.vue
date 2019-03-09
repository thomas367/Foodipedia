<template>
	<div class="wrapper">
		<div class="row">	
			<div class="recipe clearfix" v-for="recipe in recipes">
				<div class="recipe_card" @click="showRecipe(recipe.recipe_id)">
					<!-- Image section -->
					<div class="image">
						<b-img :src="recipe.img_path" height="300" width="300"/>
					</div>
					<!-- Recipe name section -->
					<div class="recipeName">
						<label for="recipe_name">Recipe</label>
						<p>{{recipe.recipe_name}}</p>
					</div>
					<!-- Tags section -->
					<div class="tags row">
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
		</div>	
		<router-link to="/recipeForm" tag="button">Add recipe</router-link>
	</div>	
</template>

<script>
	import axios from 'axios'

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
			/* Route to showRecipe component with 
			 * a specific id.
			 */
			showRecipe(recipeId){
				this.$router.push({
					name: 'showRecipe',
					params: {
						id: recipeId
					}
				})
			},
			/* Get recipes of the connected user */
			getRecipes(){
				const token = localStorage.getItem('token');
				axios.get('/myRecipes', {
					headers:{
						'Authorization': 'Bearer' + token
					}
				})
				.then(response =>{
					this.recipes = response.data;
				});
			}
		}	
	}
</script>

<style scoped lang="scss">

@import "../styles.scss"; 
	
	.recipe{
		margin-top: 2rem;
        margin-bottom: 1rem;
        margin-left: 3rem;
	}

	.recipe_card{
		margin: 6px;
		padding: 5px;
		border: 1px solid $borderLine;
		width: 310px;
		
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
				position: relative;
				left: 10%;
				p{
					background-color: red;
					border-radius: 10px;
					padding: 3px, 6px, 3px, 6px;
					color: white;

				}
			}

			.category{
				position: relative;
				left: 50%;
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