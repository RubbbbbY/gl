<style scoped>
	html,body {
	    margin: 0;
	    padding: 0;
	    
	}
	.layout {
		
		width: 100%;
		overflow: hidden;
	}
	.layout-logo {
		width: 100px;
		height: 30px;
		background: #5b6270;
		border-radius: 3px;
		float: left;
		position: relative;
		top: 15px;
		left: 20px;
	}
	
	.layout-nav {
		width: 420px;
		margin: 0 auto;
	}
	
	.nav-top {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 333;
	}
	
	.side-bar {
		width: 180px;
		height: 100%;
		position: fixed;
		top: 60px;
		z-index: 1999;
	}
	
	.side-main {
		height: 100%;
	}
	
	.item-sub {
		width: 100%;
		padding-left: 180px;
		position: absolute;
		top: 60px;
		background: #f5f7f9;
	}
	
	.layout-breadcrumb {
		padding: 10px 15px 0;
	}
	
	.sub-mian {
		width: 100%;
		/*padding: 15px;*/
	}
	.sub-mian{
		width: 100%;
	}
	.logo{
		line-height: 30px;
		color: #FFFFFF;
		font-weight: bold;
		width: 120px;
		
	}
	.logo img{
		width: 30px;
		vertical-align: middle;
	}
</style>
<template>
	<div class="layout">
		<div class="nav-top">
			<Menu mode="horizontal" theme="dark" :active-name="currentPageName">
				<div class="layout-logo logo">
					<img src='../img/app_icon.png' alt="" /> 运营管理后台
				</div>
				<div class="layout-nav">
					<Menu-item v-for="(item, index) in menu" :name="item.active" @click.native="getMenu(item,index)">
						<Icon type="ios-navigate"></Icon>
						{{item.name}}
					</Menu-item>
				</div>
			</Menu>
		</div>
		<div class="side-bar">
			<Menu class="side-main" width="180px" theme="dark" :active-name="courr">
				<Menu-group v-for="(item,index) in sideItems" :title="item.groupName">
					<Menu-item @click.native="getSideMenu(sub,index)" v-for="(sub,index) in item.groupArr" :name="sub.active">
						<Icon type="document-text"></Icon>
						{{sub.subName}}
					</Menu-item>
				</Menu-group>
			</Menu>
		</div>
		<div class="item-sub">
			<!-- <div class="layout-breadcrumb">
				<Breadcrumb>
					<Breadcrumb-item>{{subtitle}}</Breadcrumb-item>
				</Breadcrumb>
			</div> -->
			<div class="sub-mian">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	import memuData from './analysis/json-data/menu-data.js';
	export default {
		data() {
			return {
				currentPageName:parseInt(this.$store.state.currentPageName),
				menu: memuData,
				sideItems:JSON.parse(sessionStorage.getItem("subObj"))?JSON.parse(sessionStorage.getItem("subObj")):memuData[0].item,
				courr:parseInt(sessionStorage.getItem("courr"))?parseInt(sessionStorage.getItem("courr")):1
				//subtitle:"应用概览"
			}
		},
		methods: {
			getMenu(item, index) {
				this.sideItems = item.item;
				this.currentPageName = item.active;
				var obj =JSON.stringify(item.item)
				this.$store.state.subObj = obj;
				sessionStorage.setItem("active", item.active);
				this.courr = 0;
				sessionStorage.setItem("subObj", obj);
			},
			getSideMenu(sub, index) {
				this.$store.state.subtitle = sub.subName
				sessionStorage.setItem("title", sub.subName);
				sessionStorage.setItem("courr", sub.active);
				this.courr = parseInt(sessionStorage.getItem("courr"))
				this.$router.push({
                    name: sub.subRouter
                });
			}
		},
		mounted(){

		}
	}
</script>