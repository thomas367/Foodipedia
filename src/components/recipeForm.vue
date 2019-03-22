<template>
	<div id="recipeform">
		<div class="recipe-form">
			<div v-if="recipe[0]">
				<!-- Edit mode -->
				<b-form @submit.prevent="editRecipe">
					<!-- Image section -->	
					<div class="row">
						<div class="image hidden">
							<div class="input" :class="{invalid: errors.has('image') || validatedErrors.image}">
								<label for="image">Image</label>
								<b-form-file id="image" placeholder="Choose an image..." accept="image/*" @change="onImageSelect($event)" data-vv-name="image" v-validate="'required'"/>
								<div id="preview">
								    <b-img v-if="url" :src="url" height="150" width="150"/>
								</div>
								<span class="formErrorsMessages"><br/>{{ errors.first('image') }}</span>
								<span v-if="validatedErrors.image" class="formErrorsMessages">{{validatedErrors.image[0]}}</span>
							</div>
						</div>
					</div>
					<!-- Recipe name section -->
					<div class="row">
						<div class="recipeName">
							<div class="input" :class="{invalid: errors.has('recipe name') || validatedErrors.recipe_name}">
								<label for="recipe_name">Recipe name</label>
								<b-form-input type="text" id="recipe_name" v-model="recipe[0].recipe_name" data-vv-name="recipe name" v-validate="'required'"/>
								<span class="formErrorsMessages"><br/>{{ errors.first('recipe name') }}</span>
								<span v-if="validatedErrors.recipe_name" class="formErrorsMessages">{{validatedErrors.recipe_name[0]}}</span>
							</div>
						</div>
					</div>
					<!-- Cuisine and Category section -->
					<div class="row">
						<div class="cuisine">
							<div class="input" :class="{invalid: validatedErrors.cuisine}">
								<label for="cuisine">Cuisine</label>
								<b-form-select id="cuisine" v-model="recipe[0].cuisine" data-vv-name="cuisine" v-validate="'required'">
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
						</div>
						<div class="category">
							<div class="input" :class="{invalid: validatedErrors.category}">
								<label for="category">Category</label>
								<b-form-select id="category" v-model="recipe[0].category" data-vv-name="category" v-validate="'required'">
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
									<option value="Grill">Grill</option>
									<option value="Baking">Baking</option>
									<option value="Snacks">Snacks</option>
									<option value="Appertisers">Appertisers</option>
								</b-form-select>
							</div>
						</div>
						<span v-if="validatedErrors.cuisine" class="formErrorsMessages">{{validatedErrors.cuisine[0]}}</span>
						<span v-if="validatedErrors.category" class="formErrorsMessages">{{validatedErrors.category[0]}}</span>
					</div>
					<!-- Direction section -->
					<div class="row">
						<div class="description">
							<div class="input" :class="{invalid: errors.has('directions') || validatedErrors.directions}">
								<label for="directions">Directions</label>
								<b-form-textarea class="textarea" rows="3" max-rows="6" v-model="recipe[0].directions" data-vv-name="directions" v-validate="'required'"/>
								<span class="formErrorsMessages"><br/>{{ errors.first('directions') }}</span>
								<span v-if="validatedErrors.directions" class="formErrorsMessages">{{validatedErrors.directions[0]}}</span>
							</div>
						</div>
					</div>
					<!-- Ingredients section -->					
					<div class="row">
						<div class="ingredients">
							<b-button id="add" type="button" size="sm" @click="onAddIngredient">Add ingredients</b-button> 
							<div class="ingredients-list">
								<div class="input" v-for="(ingredient, index) in ingredientsList" :class="{invalid: errors.has('ingredient'+index) || errors.has('quantity'+index)}">
									<div class="row">
										<div class="ingredient">
											<label :for="ingredient">Ingredient</label> 
											<b-form-input type="text" id="ingredient" v-model="ingredient.ingredient_name" :data-vv-name="'ingredient'+index" v-validate="'required'"/>
										</div>
										<div class="space">&nbsp;</div>
										<div class="quantity">
											<label :for="ingredient">Quantity</label> 
											<b-form-input type="text" id="quantity" v-model="ingredient.quantity" :data-vv-name="'quantity'+index" v-validate="'required'"/>
			              				</div>
			              				<div class="space">&nbsp;</div>
			              				<div class="removeBtn">
			              					<b-button id="remove" @click="onDeleteIngredient(index, ingredient.ingredient_id)" type="button" size="sm">X</b-button>
			              				</div>
			              			</div>
			              			<span class="formErrorsMessages"><br/>{{ errors.first('ingredient') || errors.first('quantity') }}</span>
		              			</div> 
							</div>
						</div>
					</div>		
					<div class="row">
						<div class="submit">
							<b-button type="submit" :disabled="errors.any()">Submit</b-button>
						</div>
					</div>
				</b-form>
			</div>
			<div v-else>
				<!-- Create mode -->
				<b-form @submit.prevent="createRecipe">
					<!-- Image section -->	
					<div class="row">
						<div class="image">
							<div class="input" :class="{invalid: errors.has('image') || validatedErrors.image}">
								<label for="image">Image</label>
								<b-form-file id="image" placeholder="Choose an image..." accept="image/*" @change="onImageSelect($event)" data-vv-name="image" v-validate="'required'"/>
								<div id="preview">
								    <b-img v-if="url" :src="url" height="150" width="150"/>
								</div>
								<span class="formErrorsMessages"><br/>{{ errors.first('image') }}</span>
								<span v-if="validatedErrors.image" class="formErrorsMessages">{{validatedErrors.image[0]}}</span>
							</div>
						</div>
					</div>
					<!-- Recipe name section -->
					<div class="row">
						<div class="recipeName">
							<div class="input" :class="{invalid: errors.has('recipe name') || validatedErrors.recipe_name}">
								<label for="recipe_name">Recipe name</label>
								<b-form-input type="text" id="recipe_name" v-model="recipe_name" data-vv-name="recipe name" v-validate="'required'"/>
								<span class="formErrorsMessages"><br/>{{ errors.first('recipe name') }}</span>
								<span v-if="validatedErrors.recipe_name" class="formErrorsMessages">{{validatedErrors.recipe_name[0]}}</span>
							</div>
						</div>
					</div>
					<!-- Cuisine and Category section -->
					<div class="row">
						<div class="cuisine">
							<div class="input" :class="{invalid: errors.has('cuisine') || validatedErrors.cuisine}">
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
						</div>
						<div class="category">
							<div class="input" :class="{invalid: errors.has('category') || validatedErrors.category}">
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
									<option value="Grill">Grill</option>
									<option value="Baking">Baking</option>
									<option value="Snacks">Snacks</option>
									<option value="Appertisers">Appertisers</option>
								</b-form-select>
							</div>
						</div>
						<span class="formErrorsMessages"><br/>{{ errors.first('cuisine') || errors.first('category') }}</span>
						<span v-if="validatedErrors.cuisine" class="formErrorsMessages">{{validatedErrors.cuisine[0]}}</span>
						<span v-if="validatedErrors.category" class="formErrorsMessages">{{validatedErrors.category[0]}}</span>
					</div>
					<!-- Direction section -->
					<div class="row">
						<div class="description">
							<div class="input" :class="{invalid: errors.has('directions') || validatedErrors.directions}">
								<label for="directions">Directions</label>
								<b-form-textarea class="textarea" rows="3" max-rows="6" v-model="directions" data-vv-name="directions" v-validate="'required'"/>
								<span class="formErrorsMessages"><br/>{{ errors.first('directions') }}</span>
								<span v-if="validatedErrors.directions" class="formErrorsMessages">{{validatedErrors.directions[0]}}</span>
							</div>
						</div>
					</div>
					<!-- Ingredients section -->					
					<div class="row">
						<div class="ingredients">
							<b-button id="add" type="button" size="sm" @click="onAddIngredient">Add ingredients</b-button> 
							<div class="ingredients-list">
								<div class="input" v-for="(ingredient, index) in ingredientsList" :class="{invalid: errors.has('ingredient'+index) || errors.has('quantity'+index)}">
									<div class="row">
										<div v-if="ingredient.ingredient_id">
											<b-form-input type="hidden" v-model="ingredient.ingredient_id"/>
										</div>
										<div class="ingredient">
											<label :for="ingredient">Ingredient</label> 
											<b-form-input type="text" id="ingredient" v-model="ingredient.ingredient_name" :data-vv-name="'ingredient'+index" v-validate="'required'"/>
										</div>
										<div class="space">&nbsp;</div>
										<div class="quantity">
											<label :for="ingredient">Quantity</label> 
											<b-form-input type="text" id="quantity" v-model="ingredient.quantity" :data-vv-name="'quantity'+index" v-validate="'required'"/>
			              				</div>
			              				<div class="space">&nbsp;</div>
			              				<div class="removeBtn">
			              					<b-button id="remove" @click="onDeleteIngredient(index, ingredient.ingredient_id)" type="button" size="sm">X</b-button>
			              				</div>
			              			</div>
			              			<span class="formErrorsMessages"><br/>{{ errors.first('ingredient') || errors.first('quantity') }}</span>
		              			</div> 
							</div>
						</div>
					</div>		
					<div class="row">
						<div class="submit">
							<b-button type="submit" :disabled="errors.any() || !isComplete">Submit</b-button>
						</div>
					</div>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import router from '@/router'

	export default{
		/* recipe id (for edit recipe)  */
		props: ['id'],
		data: function(){
			return {
				recipeId: this.id,
				recipe: [],
				url: null,
				recipe_name: '',
				cuisine: '',
				category: '',
				directions: '',
				image: null,
				ingredientsList: [],
				validatedErrors: []
			}
		},
		/* Check if all the fields are submitted */
		computed: {
			isComplete: function(){
				return this.recipe_name && this.cuisine && this.category && this.directions && this.image && this.ingredientsList.length > 0
			}
		},
		/* Gets the recipe data with 
		 * the specific recipeId 
		 * to edit the recipe.
		 *
		 * Execute only on edit mode.
		 */
		created(){
			if(this.recipeId){
				this.getRecipeData(this.recipeId)
			}
		},
		methods: {
			/* Add ingredient */
			onAddIngredient: function() {
		        this.ingredientsList.push({
		        	ingredient: '',
		        	quantity: ''
		        })  
		    },
		    /* Remove ingredient */
		    onDeleteIngredient: function(index, ingredientId=null) {
		        this.ingredientsList.splice(index, 1)
		        if(ingredientId != null){
		        	this.deleteIngredient(ingredientId);
		        }
		    },
		    /* Delete ingredient from database (edit mode) */
		    deleteIngredient: function(id){
		    	const token = localStorage.getItem('token');
				axios.post('/deleteIngredient/' + id, null,{
					headers: {
						'Authorization': 'Bearer' + token
					}
				})
				.then(response =>{
					if(response.data.success === true){
						this.$toasted.show('Ingredient deleted successfully.',{
							theme: 'bubble',
							position: 'bottom-right',
							duration: 1500,
							type: 'success'
						})
					}
				})
		    },
			/* Get image from input and preview action */
			onImageSelect: function(event){
				this.image = event.target.files[0];
				this.url = URL.createObjectURL(this.image);
			},
			/* Get recipe data to populate the form. */
			getRecipeData: function(recipeId){
				axios.get('/getRecipeData/'+recipeId)
				.then(response => {
					this.recipe = response.data.recipe;
					this.ingredientsList = response.data.ingredients;
				})
			},
		    /* Submit recipe action */
			createRecipe: function(){
				const formData = new FormData();
				formData.append('recipe_name', this.recipe_name);
				formData.append('cuisine', this.cuisine);
				formData.append('category', this.category);
				formData.append('directions', this.directions);
				formData.append('image', this.image);
				formData.append('ingredient', this.ingredientsList.map(ingredient => ingredient.ingredient_name));
				formData.append('quantity', this.ingredientsList.map(ingredient => ingredient.quantity));
				
				const token = localStorage.getItem('token');
				axios.post('/storeRecipe',formData,{
					headers: {
						'Authorization': 'Bearer' + token,
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(response =>{
					if(response.data.success === true){
						this.$swal.fire({
						  	text: "Your recipe has been saved.",
						  	type: 'success',
						  	confirmButtonColor: '#3085d6',
						  	confirmButtonText: 'OK!'
							}).then((result) => {
						  		router.replace('/myRecipes')
						})
					}
					else if(response.data.success === false){
						this.validatedErrors = response.data.error
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
						  		router.replace('/myRecipes')
						})
					}
				});	
			},
			/* Edit recipe */
			editRecipe: function(){
				const formData = new FormData();
				formData.append('recipe_name', this.recipe[0].recipe_name);
				formData.append('cuisine', this.recipe[0].cuisine);
				formData.append('category', this.recipe[0].category);
				formData.append('directions', this.recipe[0].directions);
				formData.append('ingredientId', this.ingredientsList.map(ingredient => ingredient.ingredient_id));
				formData.append('ingredient', this.ingredientsList.map(ingredient => ingredient.ingredient_name));
				formData.append('quantity', this.ingredientsList.map(ingredient => ingredient.quantity));
				if(this.image){
					formData.append('image', this.image);
				}
		
				const token = localStorage.getItem('token');
				axios.post('/updateRecipes/'+this.recipeId, formData,{
					headers: {
						'Authorization': 'Bearer' + token,
						'Content-Type': 'multipart/form-data'
					}
				})
				.then(response =>{
					if(response.data.success === true){
						this.$swal.fire({
						  	text: "Your recipe has been saved.",
						  	type: 'success',
						  	confirmButtonColor: '#3085d6',
						  	confirmButtonText: 'OK!'
							}).then((result) => {
						  		router.replace('/myRecipes')
						})
					}
					else if(response.data.success === false){
						this.validatedErrors = response.data.error
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
						  		router.replace('/myRecipes')
						})
					}
					else if(error.response.status === 400){
						this.$swal.fire({
						  	text: "Error occured.",
						  	type: 'warning',
						  	confirmButtonColor: '#3085d6',
						  	confirmButtonText: 'OK!'
							}).then((result) => {
						  		router.replace('/myRecipes')
						})
					}
				});  
			}
		}
	}
</script>

<style scoped lang="scss">

@import "../styles.scss";

	.recipe-form{
		width: 500px;
		margin: 30px auto;
		border: 1px solid $borderLine;
		padding: 20px;
		box-shadow: 0, 2px, 3px $borderLine;

		@include mq-mobile {
			width: 300px;
		}

		@include mq-tablet {
			width: 500px;
		}
	}

	.image, .recipeName, .cuisine, .category, .description, .ingredients, .ingredients-list, .submit{
		padding-left: 12px;
	}

	.input{
		margin: 10px auto;
		font-family: $font;

		label{
			display: block;
			margin-bottom: 6px;
			color: $colorLightBlack;
		}
		
		#image{
			width: 400px;
		}

		#recipe_name {
			width: 400px;
			padding: 6px 12px;
			font: inherit;
			border-sizing: border-box;
			border: 1px solid $colorLightBlack;

			@include mq-mobile {
				width: 250px;
			}

			@include mq-tablet {
				width: 400px;
			}
		}

		#cuisine, #category {
			width: 190px;
			padding: 6px 12px;
			font: inherit;
			border-sizing: border-box;
			border: 1px solid $colorLightBlack;
		}

		.textarea {
			width: 400px;
			height: 90px;
			padding: 6px 12px;
			font: inherit;
			border-sizing: border-box;
			border: 1px solid $colorLightBlack;

			@include mq-mobile {
				width: 250px;
			}

			@include mq-tablet {
				width: 400px;
			}
		}
	
		.input select {
		   border: 1px solid $borderLine;
		   font: inherit;
		}

		#preview {
		  	display: flex;
		  	justify-content: left;
		}
	}
		
	.ingredients{
		font-family: $font;

		.removeBtn{
			padding-top: 32px;

			#remove{
				background-color: $colorPetrol;
				color: $colorLightOrange;
				font: inherit;
			}
		}

		#add{
			font: inherit;
			background-color: $colorPetrol;
			color: $colorLightOrange;
		}

		.ingredient input, .quantity input {
			border-sizing: border-box;
			border: 1px solid $colorLightBlack;
			font: inherit;
		}

	}	

	.submit{
		margin-top: 20px;
		font-family: $font;

		button{
			border: 1px solid $colorLightOrange;
			color: $colorLightOrange;
			padding: 10px 20px;
			border-radius: 10px;
			cursor: pointer;
			background-color: $colorPetrol;
		}

		button:hover, button:active{
			background-color: $colorLightCream;
			color: $colorLightBlack;
			border: 1px solid $colorPetrol;
		}

		button[disabled], button[disabled]:hover, button[disabled]:active{
			border: 1px solid $borderLine;
			background-color: transparent;
			color: #cccccc;
			cursor: not-allowed;
		}
	}
</style>