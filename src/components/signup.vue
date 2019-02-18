<template>
	<div id="signup">
		<div class="signup-form">
			<form @submit.prevent="onSubmit">
		        
		        <div class="input">
		          <label for="username">Username</label>
		          <input type="text" id="text" v-model="username">
		        </div>

		        <div class="input">
		          <label for="password">Password</label>
		          <input type="password" id="password" v-model="password">
		        </div>
        
		        <div class="input">
		          <label for="confirm-password">Confirm Password</label>
		          <input type="password" id="confirm-password" v-model="confirmPassword">
		        </div>
		        
		        <div class="submit">
		          <button type="submit">Submit</button>
		        </div>
      		</form>
		</div>
	</div>
</template>



<style scoped lang="scss">
	.signup-form {
	    width: 400px;
	    margin: 30px auto;
	    border: 1px solid #eeeeee;
	    padding: 20px;
	    box-shadow: 0 2px 3px #cccccc;
	  }

	.input {
		margin: 10px auto;

	    label {
		    display: block;
		    color: #4e4e4e;
		    margin-bottom: 6px;
		}
	

 		input {
    		font: inherit;
    		width: 100%;
    		padding: 6px 12px;
    		box-sizing: border-box;
    		border: 1px solid #cccccc;
  		}

  		input:focus {
    		outline: none;
    		border: 1px solid #521751;
    		background-color: #eeeeee;
  		}
	}

	.input.inline label {
    	display: inline;
  	}

  	.input.inline input {
    	width: auto;
  	} 

	.submit {
		button {
	    	border: 1px solid #f6bc07;
	    	color: #521751;
	    	padding: 10px 20px;
	    	font: inherit;
	    	cursor: pointer;
	  	}

	  	button:hover, button:active {
	  		background-color: #f6bc07;
	    	color: white;
	  	}

	  	.submit button[disabled], .submit button[disabled]:hover, .submit button[disabled]:active {
	  		border: 1px solid #cccccc;
	    	background-color: transparent;
	    	color: #cccccc;
	    	cursor: not-allowed;
		}
  	}
</style>