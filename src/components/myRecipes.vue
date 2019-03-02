<template>
	<router-link to="/recipeForm" tag="button">Add recipe</router-link>
</template>

<script>
	import axios from 'axios'
	import store from '@/store'

	export default {
		beforeMount() {
			this.getRecipes()
		},
		methods: {
			getRecipes(){
				const token = localStorage.getItem('token');
				axios.get('http://localhost:8000/api/myRecipes',{
					headers:{
						'Authorization': 'Bearer' + token
					}
				})
				.then(response =>{
					console.log(response);
				})
				.catch(error =>{
					if(error.response.status === 401){
						console.log('You are an unauthorized user.')
					}
				});
			}
		}	
	}
</script>

<style scoped lang="scss">
	@import "../styles.scss"; 

	button{
		background-color: $colorLightBlack;
		padding: 9px;
		margin: 0 13px;
		border: 1px solid #ffffff;
		text-decoration: none;
		color: white;
	}
	
</style>