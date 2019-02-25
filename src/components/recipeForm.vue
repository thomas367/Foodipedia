<template>
	<div id="recipeform">
		<div class="recipe-form">
			<form @submit.prevent="onSubmit">
				<div class="input" :class="{invalid: errors.has('recipe name')}">
					<label for="recipe_name">Recipe name</label>
					<input type="text" id="recipe_name" v-model="recipe_name" data-vv-name="recipe name" v-validate="'required|alpha'">
					<span class="formErrorsMessages"><br/>{{ errors.first('recipe name') }}</span>
				</div>
				<div class="row">
					<div class="input" :class="{invalid: errors.has('cuisine')}">
						<label for="cuisine">Cuisine</label>
						<select id="cuisine" v-model="cuisine" data-vv-name="cuisine" v-validate="'required'">
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
					<div class="input" :class="{invalid: errors.has('category')}">
						<label for="category">Category</label>
						<select id="category" v-model="category" data-vv-name="category" v-validate="'required'">
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
					<span class="formErrorsMessages"><br/>{{ errors.first('cuisine') || errors.first('category') }}</span>
				</div>
				<div class="input" :class="{invalid: errors.has('directions')}">
					<label for="directions">Directions</label>
					<textarea class="textarea" v-model="directions" data-vv-name="directions" v-validate="'required'"></textarea>
					<span class="formErrorsMessages"><br/>{{ errors.first('directions') }}</span>
				</div>
				
				<div class="input" :class="{invalid: errors.has('image')}">
					<label for="image">Image</label>
					<input type="file" id=image @change="onImageSelect($event)" data-vv-name="image" v-validate="'required|ext:jpeg,jpg,bmp,gif,png|size:600'">
					<div id="preview">
					    <img v-if="url" :src="url" height="150" width="150"/>
					</div>
					<span class="formErrorsMessages"><br/>{{ errors.first('image') }}</span>
				</div>
				
			<!--	<div class="ingredients">
					<button type="button" @click="onAddIngredient">Add ingredients</button> 
					<div class="ingredients-list">
						<div class="input" v-for="(ingredientInput, index) in ingredientInputs" :class="{invalid: errors.has('ingredient')}">
							<label :for="ingredientInput.id">Ingredient</label> 
							<input type="text" :id="ingredientInput.id" v-model="ingredientInput.value" data-vv-name="ingredient" v-validate="'required'">
							<label :for="ingredientInput.id">Quantity</label> 
							<input type="text" :id="ingredientInput.id" v-model="ingredientInput.value" data-vv-name="ingredient" v-validate="'required'">
              				<button @click="onDeleteIngredient(ingredientInput.id)" type="button">X</button> 
              				<span class="formErrorsMessages"><br/>{{ errors.first('ingredient') }}</span>
              			</div> 
					</div>
				</div> -->
				<div class="submit">
					<button type="submit" :disabled="errors.any() || !isComplete">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import store from '@/store'
	export default{
		data(){
			return{
				url: null,
				recipe_name: '',
				cuisine: '',
				category: '',
				directions: '',
				image: ''
				//ingredientInputs: []
			}
		},
		computed: {
			isComplete(){
				return this.recipe_name && this.cuisine && this.category && this.directions && this.image
			}
		},
		methods: {
		/*	
			// Add ingredient
			onAddIngredient () {
		        const newIngredient = {
		          	id: Math.random() * Math.random() * 1000,
		          	value: ''
		        }
		        this.ingredientInputs.push(newIngredient)
		    },
		    // Remove ingredient
		    onDeleteIngredient (id) {
		        this.ingredientInputs = this.ingredientInputs.filter(ingredient => ingredient.id !== id)
		    },
		*/
			/* Get image from input */
			onImageSelect(event){
				this.image = event.target.files[0];
				this.url = URL.createObjectURL(this.image);
			},
			
		    /* Submit data */
			onSubmit(){
				const formData = {
					recipe_name: this.recipe_name,
					cuisine: this.cuisine,
					category: this.category,
					directions: this.directions,
					image: this.image
					//ingredients: this.ingredientInputs.map(ingredient => ingredient.value),
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

		#recipe_name {
			width: 150px;
			padding: 6px 12px;
			font: inherit;
			border-sizing: border-box;
			border: 1px solid $colorLightGrey;
		}

		#cuisine, #category {
			width: 150px;
			padding: 6px 12px;
			font: inherit;
			border-sizing: border-box;
			border: 1px solid $colorLightGrey;
		}

		.textarea {
			width: 350px;
			height: 90px;
			padding: 6px 12px;
			font: inherit;
			border-sizing: border-box;
			border: 1px solid $colorLightGrey;
		}

		input:focus, textarea:focus, select:focus{
			outline: none;
			border: 1px solid $colorLightGrey;
			background-color: #ffffff;
		}

		.input select {
		   border: 1px solid #cccccc;
		   font: inherit;
		}

		#preview {
		  	display: flex;
		  	justify-content: left;
		  	//align-items: center;
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