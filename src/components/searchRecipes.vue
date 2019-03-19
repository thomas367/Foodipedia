<template>
	<div class="container-fluid">
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
	</div>
</template>

<script>
	import axios from 'axios'

	export default {
		props: ['keyword'],
		data: function(){
			return {
				recipes: [],
				query: this.keyword	
			}
		},
		watch: {
			keyword(){
				this.query = this.keyword
				this.getRecipes(this.query)
			}	
		},
		created() {
			this.getRecipes(this.query)
		},
		methods: {	
			/* Route to showRecipe component 
			 * with a specific id.
			 */
			showRecipe: function(recipeId){
				this.$router.push({
					name: 'showRecipe',
					params: {
						id: recipeId
					}
				})
			},
			/* Get recipes */
			getRecipes: function(query){
				axios.get('/searchRecipes/'+query)
				.then(response =>{
					console.log(response);
					this.recipes = response.data;
				})
				.catch(error =>{
					console.log(error.response);
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
		font-family: $font;
		
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
					background-color: blue;
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
</style>