<template>
	<div id="signin">
		<div class="signin-form">
			<b-form @submit.prevent="onSubmit">
				<div class="input" :class="{invalid: errors.has('username')}">
					<label for="username">Username</label>
					<b-form-input type="text" id="username" v-model="username"  v-validate="'required'"/>
					<span class="formErrorsMessages"><br/>{{ errors.first('username') }}</span>
				</div>
				
				<div class="input" :class="{invalid: errors.has('password')}">
					<label for="password">Password</label>
					<b-form-input type="password" id="password" v-model="password"  v-validate="'required'"/>
					<span class="formErrorsMessages"><br/>{{ errors.first('password') }}</span>
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
			return {
				username: '',
				password: ''
			}
		},
		computed: {
			isComplete(){
				return this.username && this.password
			}
		},
		methods: {
			/* Submit data */
			onSubmit(){
				const formData = {
					username: this.username,
					password: this.password
				}
			  	axios.post('/login', formData)
			  	.then(response => {
			        if(response.data.success === true){
			        	const token = response.data.token
			        	this.$store.dispatch('setUserState', token)
			        }
			        else if(response.data.success === false){
			          /* 
			           * 1. Toastr message to submit the form correctly.
			           * 
			           */
			        }
			  	})
			    .catch(error => {
			        console.log(error.response);
			        if(error.response.status === 404){

			        }
			        else if(error.response.status === 500){

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
		box-shadow: 0, 2px, 3px #cccccc;

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