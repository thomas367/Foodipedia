<template>
	<div class="recipe_card" v-if="recipe[0]">
		<!-- Image section -->
		<div class="image">
			<b-img :src="recipe[0].img_path" height="300" width="300"/>
		</div>
		<!-- Ingredients section -->
		<div class="ingredients">	
			<div class="titles row">
				<label id="ingredient" for="ingredient_name">Ingredient</label>
				<label id="quantity" for="quantity">Quantity</label>
			</div>
			<div class="ingredients_list" v-for="ingredient in ingredients">
				<div class="list row">
					<p id="ingredient">{{ingredient.ingredient_name}}</p>
					<p id="quantity">{{ingredient.quantity}}</p>
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
</template>

<script>
	import axios from 'axios'
	import router from '@/router'

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
					if(error.response.status === 404){
						this.$swal.fire({
							text: "This recipe don't exists.",
							type: 'error',
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

	.recipe_card {
		margin-top: 2rem;
		text-align: center;

		.titles{
			margin-top: 1rem;
			font-weight: bold;
			justify-content: center;

		}

		.list{
			justify-content: center;
		}

		#ingredient{
			margin-right: 0.5rem;
			text-align: center;
		}

		#quantity{
			margin-left: 0.5 rem;
			text-align: center;
		}
	}
	
</style>