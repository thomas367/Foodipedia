<template>
	<header class="main-header">
		<div class="logo-name">
			<router-link to='/'>Foodipedia</router-link>
		</div>
		<div class="searchbar">
			<input class="search-input" type="text" placeholder="Search...">
            <a href="#" class="search-icon"><i class="icon ion-md-search"></i></a>
		</div>
		<nav>

		</nav>
	</header>
</template>

<style lang="scss">
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
	    background-color: #353b48;
	    border-radius: 30px;
	    padding: 10px;

	    .search-input{
	    	color: white;
		    border: 0;
		    outline: 0;
		    background: none;
		    padding: 0 10px;
		    width: 100px;
		    line-height: 40px;
		    transition: width 0.4s linear;
	    }

	    .search-icon{
	    	height: 36px;
		    width: 36px;
		    float: right;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    border-radius: 50%;
		    background: white;
    		color: #e74c3c;
	    }
	}
	
</style>