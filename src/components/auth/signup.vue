<template>
	<div id="signup">
		<div class="signup-form">
			<b-form @submit.prevent="onSubmit">    
		        <div class="input" :class="{invalid: errors.has('username')}">
		          	<label for="username">Username</label>
		          	<b-form-input type="text" id="username" v-model="username" data-vv-name="username" v-validate="'required|min:6'"/>
		          	<span class="formErrorsMessages"><br/>{{ errors.first('username') }}</span>
		        </div>

		        <div class="input" :class="{invalid: errors.has('password')}">
		          	<label for="password">Password</label>
		          	<b-form-input type="password" id="password" v-model="password" data-vv-name="password" v-validate="'required|min:6'" ref="password"/>
		          	<span class="formErrorsMessages"><br/>{{ errors.first('password') }}</span>
		        </div>
        
		        <div class="input" :class="{invalid: errors.has('confirm password')}">
		          	<label for="confirm-password">Confirm Password</label>
		          	<b-form-input type="password" id="confirm-password" v-model="password_confirmation" data-vv-name="confirm password" v-validate="'required|confirmed:password'"/>
		          	<span class="formErrorsMessages"><br/>{{ errors.first('confirm password') }}</span>
		        </div>
		        
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
		data(){
			return{
				username: '',
				password: '',
				password_confirmation: ''
			}
		},
		computed: {
			isComplete(){
				return this.username && this.password && this.password_confirmation
			}
		},
		methods: {
			onSubmit() {
				const formData = {
					username: this.username,
					password: this.password,
					password_confirmation: this.password_confirmation
				}
				axios.post('/register', formData)
			  	.then(response => {
			        if(response.data.success === true){
			        	const token = response.data.token
			        	this.$store.dispatch('setUserState', token)
			        }
			        else if(response.data.success === false){
			          /* 
			           * 1. Toastr message to submit the form correctly.
			           *                 OR
			           * 2. 2. Toastr message username exists.
			           */
			        }
			  	})
			    .catch(error => {
			        console.log(error.response);
			    });
			}	
		}
	}
</script>


<style scoped lang="scss">

@import "../../styles.scss";

	.signup-form {
	    width: 400px;
	    margin: 30px auto;
	    border: 1px solid $borderLine;
	    padding: 20px;
	    box-shadow: 0 2px 3px $borderLine;
	  }

	.input{
		margin: 10px auto;

		label{
			display: block;
			margin-bottom: 6px;
			color: #4e4e4e;
		}

		input{
			font: inherit;
			width: 150px;
			padding: 6px 12px;
			border-sizing: border-box;
			border: 1px solid $colorLightGrey;
		}

	}

	.input.inline label {
    	display: inline;
  	}

  	.input.inline input {
    	width: auto;
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
			border: 1px solid $borderLine;
			background-color: transparent;
			color: #cccccc;
			cursor: not-allowed;
		}
  	}
</style>