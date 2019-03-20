<template>
	<div class="container-fluid">
		<div class="row">	
			<div class="recipe clearfix" v-for="(recipe, index) in recipes">
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
					<!-- Recipe action icons -->
					<div class="icons row">	
						<span class="icon ion-md-create edit" @click.stop="editRecipe(recipe.recipe_id)"></span>
						<span class="icon ion-ios-trash delete" @click.stop="deleteRecipe(recipe.recipe_id, index)"></span>
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
		data: function(){
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
			showRecipe: function(recipeId){
				this.$router.push({
					name: 'showRecipe',
					params: {
						id: recipeId
					}
				})
			},
			/* Edit recipe */
			editRecipe: function(recipeId){
			/*	
				this.$router.push({
					name: 'recipeForm',
					params: {
						id: recipeId
					}
				})
				*/
			},
			/* Delete recipe */
			deleteRecipe: function(recipeId, index){
				this.$swal.fire({
					text: "Are you sure?\n Do you want to delete this recipe?",
					type: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#ff0000',
					confirmButtonText: 'OK!'
				}).then((result) => {
					if(result.value){
						const token = localStorage.getItem('token');
						axios.post('/deleteRecipes/' + recipeId, null,{
							headers: {
								'Authorization': 'Bearer' + token
							}
						})
						.then(response =>{
							if(response.data.success === true){
								this.recipes.splice(index, 1)
								this.$toasted.show('Recipe deleted successfully.',{
									theme: 'bubble',
									position: 'bottom-right',
									duration: 1500,
									type: 'success'
								})
							}
						})
						.catch(error =>{
							if(error.response.status === 400){
								this.$swal.fire({
									text: "Error occured!\n Recipe could not found.",
									type: 'info',	
									confirmButtonColor: '#3085d6',
									confirmButtonText: 'OK!'
								});
							}
							else if(error.response.status === 500){
								this.$swal.fire({
									text: "Error occured!\n Recipe could not deleted.",
									type: 'info',	
									confirmButtonColor: '#3085d6',
									confirmButtonText: 'OK!'
								});
							}
						});
					}
				})
			},
			/* Get recipes of the connected user */
			getRecipes: function(){
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

		.icons{
			text-align: center;
			font-size: 28px;

			.edit{
				position: relative;
				left: 15%;
				color: $colorLightBlue;
			}

			.delete{
				position: relative;
				left: 70%;
				color: $colorRed;
			}
		}

	}

	button{
		background-color: $colorPetrol;
		padding: 9px;
		margin: 0 13px;
		border: 1px solid $colorLightOrange;
		text-decoration: none;
		color: $colorLightOrange;
		border-radius: 10px;
		font-family: $font;
	}
	
</style>