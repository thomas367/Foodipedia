<template>
		
</template>

<script>
	import axios from 'axios'

	export default {
		beforeMount() {
			this.getRecipes()
		},
		methods: {
			getRecipes(){
				axios.get('http://localhost:8000/api/recipes')
				.then(response =>{
					console.log(response);
				})
				.catch(error =>{
					console.log(error.response);
				});
			}
		}	
	}
</script>

<style scoped lang="scss">

</style>