<template>
	<div id="signin">
		<div class="signin-form">
			<b-form @submit.prevent="onSubmit">
				<div class="input" :class="{invalid: errors.has('username')}">
					<label for="username">Username</label>
					<b-form-input type="text" id="username" v-model="username" data-vv-name="username" v-validate="'required'"/>
					<span class="formErrorsMessages"><br/>{{ errors.first('username') }}</span>
				</div>
				
				<div class="input" :class="{invalid: errors.has('password')}">
					<label for="password">Password</label>
					<b-form-input type="password" id="password" v-model="password" data-vv-name="password" v-validate="'required'"/>
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
				this.$store.dispatch('login', {username: formData.username, password: formData.password})
			}
		}
	}
</script>


<style scoped lang="scss">

@import "../../styles.scss";

	.signin-form{
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

		input{
			font: inherit;
			width: 150px;
			padding: 6px 12px;
			border-sizing: border-box;
			border: 1px solid $colorLightGrey;
		}

		input:focus{
			outline: none;
			border: 1px solid $colorLightGrey;
			background-color: #ffffff;
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