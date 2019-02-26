<template>
	<div id="recipeform">
		<div class="recipe-form">
			<b-form @submit.prevent="onSubmit">
				<!-- Image section -->
				
				<div class="input" :class="{invalid: errors.has('image')}">
					<label for="image">Image</label>
					<b-form-file id=image placeholder="Choose an image..." accept="image/*" @change="onImageSelect($event)" data-vv-name="image" v-validate="'required'"/>
					<div id="preview">
					    <b-img v-if="url" :src="url" height="150" width="150"/>
					</div>
					<span class="formErrorsMessages"><br/>{{ errors.first('image') }}</span>
				</div>
	
				<!-- Recipe name section -->
				<div class="input" :class="{invalid: errors.has('recipe name')}">
					<label for="recipe_name">Recipe name</label>
					<b-form-input type="text" id="recipe_name" v-model="recipe_name" data-vv-name="recipe name" v-validate="'required|alpha'"/>
					<span class="formErrorsMessages"><br/>{{ errors.first('recipe name') }}</span>
				</div>
				<!-- Cuisine and Category section -->
				<div class="row">
					<div class="input" :class="{invalid: errors.has('cuisine')}">
						<label for="cuisine">Cuisine</label>
						<b-form-select id="cuisine" v-model="cuisine" data-vv-name="cuisine" v-validate="'required'">
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
						</b-form-select>
					</div>
					<div class="input" :class="{invalid: errors.has('category')}">
						<label for="category">Category</label>
						<b-form-select id="category" v-model="category" data-vv-name="category" v-validate="'required'">
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
						</b-form-select>
					</div>
					<span class="formErrorsMessages"><br/>{{ errors.first('cuisine') || errors.first('category') }}</span>
				</div>
				<!-- Direction section -->
				<div class="input" :class="{invalid: errors.has('directions')}">
					<label for="directions">Directions</label>
					<b-form-textarea class="textarea" rows="3" max-rows="6" v-model="directions" data-vv-name="directions" v-validate="'required'"/>
					<span class="formErrorsMessages"><br/>{{ errors.first('directions') }}</span>
				</div>
				<!-- Ingredients section -->				
			<!--	
				<div class="ingredients">
					<b-button type="button" @click="onAddIngredient">Add ingredients</b-button> 
					<div class="ingredients-list">
						<div class="input" v-for="(ingredientInput, index) in ingredientInputs" :key="ingredientInput.id" :class="{invalid: errors.has('ingredient')}">
							<label :for="ingredientInput.id">Ingredient</label> 
							<b-form-input type="text" :id="ingredientInput.id" v-model="ingredientInput.value" data-vv-name="ingredient" v-validate="'required'"/>
							<label :for="ingredientInput.id">Quantity</label> 
							<b-form-input type="text" :id="ingredientInput.id" v-model="ingredientInput.value" data-vv-name="ingredient" v-validate="'required'"/>
              				<b-button @click="onDeleteIngredient(ingredientInput.id)" type="button">X</b-button> 
              				<span class="formErrorsMessages"><br/>{{ errors.first('ingredient') }}</span>
              			</div> 
					</div>
				</div> 
			-->
				<div class="submit">
					<b-button type="submit" :disabled="errors.any() || !isComplete">Submit</b-button>
				</div>
			</b-form>
		</div>
	</div>
</template>

<script>
	import store from '@/store'
	import axios from 'axios'

	export default{
		data(){
			return{
				url: null,
				recipe_name: '',
				cuisine: '',
				category: '',
				directions: '',
				image: null,
				ingredientInputs: []
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
			
		    /* Submit recipe action */
			onSubmit(){
				const formData = {
					recipe_name: this.recipe_name,
					cuisine: this.cuisine,
					category: this.category,
					directions: this.directions,
					image: this.image
					//ingredients: this.ingredientInputs.map(ingredient => ingredient.value)
				}
				console.log(formData);
			/*	
				const token = localStorage.getItem('token');
				axios.post('http://localhost:8000/api/storeRecipe',formData,{
					headers: {
						'Authorization': 'Bearer' + token
					}
				})
				.then(response =>{
					console.log(response);
				})
				.catch(error =>{
					console.log(error.response);
				})
			*/	
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