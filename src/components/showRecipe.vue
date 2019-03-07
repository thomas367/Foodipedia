<template>
	<b-container>
		<div class="recipe_card" v-if="recipe[0]">
			<!-- Image section -->
			<div class="image">
				<b-img :src="recipe[0].img_path" height="300" width="300"/>
			</div>
				<!-- Ingredients section -->
			<div class="ingredients">	
				<div class="titles row">
					<label for="ingredient_name">Ingredient</label>
					<label for="quantity">Quantity</label>
				</div>
				<div class="ingredients_list" v-for="ingredient in ingredients">
					<div class="row">
						<p>{{ingredient.ingredient_name}}</p>
						<p>{{ingredient.quantity}}</p>
					</div>
				</div>
			</div>
			<!-- Recipe name section -->
			<div class="recipeName">
				<label for="recipe_name">Recipe</label>
				<p>{{recipe[0].recipe_name}}</p>
			</div>
			<!-- Tags section -->
			<div class="tags row">
				<div class="cuisine">
					<label for="cuisine">Cuisine</label>
					<p>{{recipe[0].cuisine}}</p>
				</div>
				<div class="category">
					<label for="category">Category</label>
					<p>{{recipe[0].category}}</p>
				</div>
			</div>
			<!-- Directions section -->
			<div class="directions">
				<label for="directions">Directions</label>
				<p>{{recipe[0].directions}}</p>
			</div>			
 		</div>
	</b-container>
</template>

<script>
	import axios from 'axios'

	export default {
		props: ['$route.params.id'],
		data(){
			return{
				recipeId: this.$route.params.id,
				recipe: [],
				ingredients: []
			}
		},
		created(){
			this.getRecipeData()
		},
		methods: {
			getRecipeData(){
				axios.get('/showRecipe/'+this.recipeId)
				.then(response =>{
					this.recipe = response.data.recipe;
					this.ingredients = response.data.ingredients;
				})
				.catch(error =>{
					console.log(error.response);
					/*
					 * 1. Sweetalert message recipe don't exist.
					 * 2. Redirection to welcome page.
					 */
				});
			}
		}
	}
</script>

<style>
	
</style>