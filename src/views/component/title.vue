<template>
	<div class="title">
		{{title}}
		<Button @click='refreshEvent' class='re-btn' type="info" icon="refresh">刷新</Button>
	</div>
</template>
<script>
	export default {
		name:'subTitle',
	    data(){
	    	return{
	    		title:sessionStorage.getItem("title")?sessionStorage.getItem("title"):this.$store.state.subtitle
	    	}
	    },
	    methods:{
	    	refreshEvent(){
	    		this.$router.go(0);  
	    	}
	    },
	    created(){
	    	
	    }
	}
</script>
<style scoped>
	.title{
		width: 100%;
		height: 50px;
		background: #fff;
		padding: 15px;
		margin-bottom: 15px;
		color: #464c5b;
		font-size: 14px;
		font-weight: bold;
	}
	.re-btn{
		float: right;
		position: relative;
		bottom: 10px;
	}
</style>