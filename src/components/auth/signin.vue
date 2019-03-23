<template>
	<div id="signin">
		<div class="signin-form">
			<b-form @submit.prevent="onSubmit">
				<div class="input" :class="{invalid: errors.has('username') || validatedErrors.username}">
					<label for="username">Username</label>
					<b-form-input type="text" id="username" v-model="username" data-vv-name="username" v-validate="'required'"/>
					<span class="formErrorsMessages"><br/>{{ errors.first('username') }}</span>
					<span v-if="validatedErrors.username" class="formErrorsMessages">{{validatedErrors.username[0]}}</span>
				</div>
				
				<div class="input" :class="{invalid: errors.has('password') || validatedErrors.password}">
					<label for="password">Password</label>
					<b-form-input type="password" id="password" v-model="password" data-vv-name="password" v-validate="'required'"/>
					<span class="formErrorsMessages"><br/>{{ errors.first('password') }}</span>
					<span v-if="validatedErrors.password" class="formErrorsMessages">{{validatedErrors.password[0]}}</span>
				</div>
				<span v-if="validatedErrors.error" class="formErrorsMessages">{{validatedErrors.error}}<br/></span>
				<div class="submit">
					<b-button type="submit" :disabled="errors.any() || !isComplete">Submit</b-button>
				</div>
			</b-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		data: function(){
			return {
				username: '',
				password: '',
				validatedErrors: []
			}
		},
		computed: {
			isComplete: function(){
				return this.username && this.password
			}
		},
		methods: {
			/* Submit data */
			onSubmit: function(){
				const formData = {
					username: this.username,
					password: this.password
				}
			  	axios.post('/login', formData)
			  	.then(response => {
			        if(response.data.success === true){
			        	const payload = {
			        		token: response.data.token,
			        		expiresIn: response.data.expiresIn
			        	} 
			        	this.$store.dispatch('setUserState', payload)
			        }
			        else if(response.data.success === false){
			          	this.validatedErrors = response.data.error
			        }
			  	})
			    .catch(error => {
			        if(error.response.status === 404){
			        	this.validatedErrors = error.response.data
			        }
			        else if(error.response.status === 500){
			        	this.validatedErrors = error.response.data
			        }
			    });
			}
		}
	}
</script>


<style scoped lang="scss">

@import "../../styles.scss";

	.signin-form{
		width: 400px;
		margin: 30px auto;
		border: 1px solid $borderLine;
		padding: 20px;
		box-shadow: 0 2px 3px $borderLine;

		@include mq-mobile {
			width: 300px;
		}

		@include mq-tablet {
			width: 400px;
		}

	}

	.input{
		margin: 10px auto;
		font-family: $font;

		label{
			display: block;
			margin-bottom: 6px;
			color: $colorLightBlack;
		}

		input{
			font: inherit;
			width: 150px;
			padding: 6px 12px;
			border-sizing: border-box;
			border: 1px solid $colorLightBlack;
		}

	}
	
	.submit{
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