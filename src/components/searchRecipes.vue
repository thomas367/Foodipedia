<template>
	<div class="container-fluid">
		<div class="row">
			<div v-if="recipes.length > 0">
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
			<div v-else-if="recipes === -1">
				<div class="message">
					<p>There isn't any recipe with this word.</p>
					<p>Please check if you typed the word correctly or try with another one.</p>
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
					const result = response.data.length;
					if(result > 0){
						this.recipes = response.data;		
					}
					else if(result === 0){
						this.recipes = -1;
					}

				})
				.catch(error =>{
					if(error.response.status === 500){ 
						this.$swal.fire({
						  	text: "Something wrong has happened.\n Please again.",
						  	type: 'warning',
						  	confirmButtonColor: '#3085d6',
						  	confirmButtonText: 'OK!'
							}).then((result) => {
						  		router.replace('/')
						})
					}
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

	.message{
		@include absolute-center(50%, 50%);
		font-family: $font;
		font-size: 24px;
		color: $colorPetrol;

		@include mq-mobile {
			font-size: 18px;
		}

		@include mq-tablet {
			font-size: 24px;
		}

	}
</style>