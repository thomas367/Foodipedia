<template>
	<div id="recipeform">
		<div class="recipe-form">
			<form @submit.prevent="onSubmit">
			<!--	<div class="input"  :class="{invalid: $v.recipe_name.$error}"> -->
				<div class="input">
					<label for="recipe_name">Recipe name</label>
				<!--	<input type="text" id="recipe_name" @blur="$v.recipe_name.$touch()" v-model="recipe_name"> -->
					<input type="text" id="recipe_name" v-model="recipe_name">
				</div>
				<div class="row">
					<div class="input">
						<label for="cuisine">Cuisine</label>
						<select id="cuisine" v-model="cuisine">
							<option value="Greek">Greek</option>
							<option value="Mexican">Mexican</option>
							<option value="British">British</option>
							<option value="Italian">Italian</option>
							<option value="French">French</option>
							<option value="Japanese">Japanese</option>
							<option value="Chinese">Chinese</option>
							<option value="Maroccan">Maroccan</option>
							<option value="Thai">Thai</option>
							<option value="Peruvian">Peruvian</option>
						</select>
					</div>
					<div class="input">
						<label for="category">Category</label>
						<select id="category" v-model="category">
							<option value="Breakfast">Breakfast</option>
							<option value="Brunch">Brunch</option>
							<option value="Lunch">Lunch</option>
							<option value="Dinner">Dinner</option>
							<option value="Salads">Salads</option>
							<option value="Soups">Soups</option>
							<option value="Meat">Meat</option>
							<option value="Seafood">Seafood</option>
							<option value="Vegeterian">Vegeterian</option>
							<option value="Drinks">Drinks</option>
							<option value="Desserts">Desserts</option>
							<option value="Baking">Baking</option>
							<option value="Snacks">Snacks</option>
							<option value="Appertisers">Appertisers</option>
						</select>
					</div>
				</div>
				<div class="input">
					<label for="directions">Directions</label>
				<!--	<input type="text" id="recipe_name" @blur="$v.recipe_name.$touch()" v-model="recipe_name"> -->
					<textarea class="textarea" v-model="directions"></textarea>
				</div>
				<!--
				<div class="input">
					<label for="image">Image</label>
					<input type="file" v-model="image">
				</div>
				-->
				<div class="ingredients">
				<!--	<button type="button">Add ingredients</button> -->
					<div class="ingredients-list">

					</div>
				</div>
				<div class="submit">
				<!--	<button type="submit" :disabled="$v.$invalid">Submit</button> -->
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				recipe_name: '',
				cuisine: '',
				category: '',
				directions: ''
			}
		},
		methods: {
			onSubmit(){
				const formData = {
					recipe_name: this.recipe_name,
					cuisine: this.cuisine,
					category: this.category,
					directions: this.directions
				}
				console.log(formData);
			}
		}
	}
</script>

<style scoped lang="scss">

@import "../styles.scss";

	.recipe-form{
		width: 400px;
		margin: 30px auto;
		border: 1px solid #cccccc;
		padding: 20px;
		box-shadow: 0, 2px, 3px #cccccc;
	}

	.input{
		margin: 10px auto;

		label{
			display: block;
			margin-bottom: 6px;
			color: #4e4e4e;
		}

		input, select, textarea{
			font: inherit;
			width: 150px;
			padding: 6px 12px;
			border-sizing: border-box;
			border: 1px solid $colorLightGrey;
		}

		input:focus, textarea:focus, select:focus{
			outline: none;
			border: 1px solid $colorLightGrey;
			background-color: #ffffff;
		}

		.input select {
		   border: 1px solid #ccc;
		   font: inherit;
		}
	}

	.submit{
			
		button{
			border: 1px solid $colorLightGrey;
			color: #ffffff;
			padding: 10px 20px;
			font: inherit;
			border-radius: 10px;
			cursor: pointer;
			background-color: $colorLightGrey;
		}

		button:hover, button:active{
			background-color: #ffffff;
			color: $colorLightGrey;
		}

		button[disabled], button[disabled]:hover, button[disabled]:active{
			border: 1px solid #cccccc;
			background-color: transparent;
			color: #cccccc;
			cursor: not-allowed;
		}
	}

</style>