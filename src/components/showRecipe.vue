<template>
	<div class="recipe_card" v-if="recipe[0]">
		<!-- Image section -->
		<div class="image">
			<b-img :src="recipe[0].img_path" height="300" width="300"/>
		</div>
		<!-- Ingredients section -->
			<table class="ingredients table-bordered">
				<thead>
					<tr>
						<th>Ingredient</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="ingredient in ingredients">
						<td>{{ingredient.ingredient_name}}</td>
						<td>{{ingredient.quantity}}</td>
					</tr>
				</tbody>
			</table>
			
		<!-- Recipe name section -->
		<div class="recipeName">
			<label class="recipe_name">Recipe</label>
			<p>{{recipe[0].recipe_name}}</p>
		</div>
		<!-- Tags section -->
		<div class="tags row">
			<div class="cuisine">
				<label id="cuisineTitle">Cuisine</label>
				<p>{{recipe[0].cuisine}}</p>
			</div>
			<div class="category">
				<label id="categoryTitle">Category</label>
				<p>{{recipe[0].category}}</p>
			</div>
		</div>
		<!-- Directions section -->
		<div class="directions">
			<label id="directionsTitle">Directions</label>
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
		font-family: $font;

		.titles{
			margin-top: 1rem;
			font-weight: bold;
			justify-content: center;

		}

		.ingredients{
			margin-top: 2rem;
			margin-left: auto;
			margin-right: auto;
			width: 350px;

			@include mq-mobile {
				width: 280px;
			}

			@include mq-tablet {
				width: 350px;
			}
		}

		.recipeName{
			margin-top: 1rem;

			.recipe_name{
				font-weight: bold;
			}
		}

		.tags{
			justify-content: center;
			margin-top: 1rem;

			.cuisine{
				margin-right: 0.5rem;

				#cuisineTitle{
					font-weight: bold;
				}

			}

			.category{
				margin-left: 0.5rem;

				#categoryTitle{
					font-weight: bold;
				}
			}
		}

		.directions{
			margin-top: 1rem;
			padding-right: 50px;
			padding-left: 50px;

			@include mq-mobile {
				padding-right: 20px;
				padding-left: 20px;
			}

			@include mq-tablet {
				padding-right: 50px;
				padding-left: 50px;
			}			

			#directionsTitle{
				font-weight: bold;
			} 
		}
	}
	
</style>