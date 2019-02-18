<template>
	<header class="main-header">
		<div class="row">
			<div class="col-xs-2 logo-name">
				<router-link to='/'>Foodipedia</router-link>
			</div>
			<div class="offset-xs-4 col-xs-2 searchbar">
				<input class="search-input" type="text" placeholder="Search...">
	            <a href="#" class="search-icon"><i class="icon ion-md-search"></i></a>
			</div>
		</div>
		<nav>
			<ul>
				<li>
					<router-link to="/signin">Sign In</router-link>
				</li>
				<li>
					<router-link to="/signup">Sign Up</router-link>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style scoped lang="scss">
	.main-header{
		height: 56px;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		align-items: center;
		background-color: #f6bc07;
		padding: 0 20px;
	}

	.logo-name{
		font-weight: bold;
		color: white;
		font-size: 32px;
		font-family: Lato;
		a{
			text-decoration: none;	
			color: white;
		}
	}

	.logo-name:hover, .logo-name:active{
		color: white;
	}

	.searchbar{
		margin-bottom: auto;
	    margin-top: auto;
	    height: 52px;
	    background-color: #ffffff;
	    border-radius: 15px;
	    padding: 10px;
	    display: inline-block;

	    .search-input{
	    	color: black;
		    border: 0;
		    outline: 0;
		    background: none;
		    padding: 0 10px;
		    width: 120px;
		    line-height: 37px;
		    transition: width 0.4s linear;
	    }

	    .search-icon{
	    	height: 37px;
		    width: 37px;
		    float: right;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    border-radius: 15%;
		    background: #9c9c9c;
    		color: #f6bc07;
	    }
	}

	nav{
		height: 100%
	}
	
	ul{
		list-style: none;
		padding: 0;
		margin: 0;
		height: 100%;
		display: flex;
		flex-flow: row;
		align-items: center;
	}
	
	li{
		margin: 0 16px;
		padding: 9px;
		border: 1px solid #ffffff;
		
		a{
			text-decoration: none;
			color: white;
		}

		a:hover, a:active{
			color: #fa923f;
		}
	}
	
</style>