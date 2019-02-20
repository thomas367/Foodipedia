<template>
	<div id="signin">
		<div class="signin-form">
			<form @submit.prevent="onSubmit">
				<div class="input">
					<label for="username">Username</label>
					<input type="text" id="username" v-model="username">
				</div>
				<div class="input">
					<label for="password">Password</label>
					<input type="password" id="password" v-model="password">
				</div>
				<div class="submit">
					<button type="submit">Submit</button>
				</div>
			</form>
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
		methods: {
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
			border: 1px solid #ffffff;
			background-color: transparent;
			color: #ffffff;
			cursor: not-allowed;
		}
	}
</style>