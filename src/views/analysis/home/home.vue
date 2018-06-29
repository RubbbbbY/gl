<style>
	@import "./home.less";
	.mian-in{
        width: 100%;
        padding: 15px;
    }
</style>
<template>
	<div class="home-main">
		<sub-title></sub-title>
		<div class="mian-in">
			<div class="h_todayData">
				<Row>
					<Col class="data_title colW" span="4">
					<p>今日数据 <span class="phone-l">（APP）</span></p>
					</Col>
					<Col class="colW" span="10">
					<Row>
						<Col class="lih" span="8"> 登录总人数
						<div class="d_titel">{{info.uv}}</div>
						</Col>
						<Col class="lih" span="8"> 用户浏览量
						<div class="d_titel">{{info.pv}}</div>
						</Col>
						<!--<Col class="lih" span="8"> 用户平均停留时长
						<div class="d_titel">5'</div>
						</Col>-->
					</Row>
					</Col>
					<Col class="colW" span="8" offset="2">
					<Row :gutter="16">
						<Col span="12">
						<div class="d_card">
							接入学校总数
							<div class="d_titel_card">{{info.usedSchool}}</div>
						</div>
						</Col>
						<Col span="12">
						<div class="d_card" style="background:darkturquoise;">
							总用户量
							<div class="d_titel_card">{{info.userSize}}</div>
						</div>
						</Col>
					</Row>
					</Col>
				</Row>
			</div>
			<div class="fenbu">
				<Card style="width:100%">
					<p slot="title">
						<Icon type="ios-film-outline"></Icon>
						用户分布（PC）
					</p>
					<div class="province-data">
						<div class="province-list">
							<Table :columns="columns1" :data="tableData"></Table>
							 <div style="float: right;margin-top: 15px;">
					            <Page @on-change="getPage" class="posi" :page-size="pageSize" :total="total" :current="vCurrent"></Page>
					        </div>
						</div>
						<div class="data-map">
							<!--<div id="mapMain" style="margin: 0 auto;width: 600px;height: 500px;"></div>-->
							<home-map></home-map>
						</div>
					</div>
				</Card>
			</div>
			<div class="user-list">
				<school-users></school-users>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';
	import echarts from 'echarts';
	import schoolUsers from './components/schoolUsers.vue';
	import subTitle from '../../component/title.vue';
	import homeMap from './components/map.vue';
	export default {
		components: {
			schoolUsers,
			homeMap,
			subTitle
	    },
		data() {
			return {
				info: "",
				columns1: [{
						title: '省份',
						key: 'province'
					},
					{
						title: '接入学校数',
						key: 'schoolNumber'
					},
					{
						title: '用户数量',
						key: 'userNumber'
					}
				],
				tableData:[],
				vCurrent:0,
				total:0,
				pageSize:0
			}
		},
		methods: {
			getProvData(page){
				const vm = this;
				this.$http.post(vm.API.getProvData,qs.stringify({
					page:page,
					size:7
				}))
				.then(function(res) {
					console.log(res);
					var proveList = res.data.data.data;
					vm.tableData = proveList;
						vm.vCurrent = parseInt(res.data.data.page.nowPage);
						vm.total = parseInt(res.data.data.page.total);
						vm.pageSize = parseInt(res.data.data.page.pageSize);
				})
				.catch(function(error) {
					vm.$Loading.error();
				});
			},
			getTodayData(){
				const vm = this;
				this.$Loading.start();
				this.$http.post(vm.API.getTodayData)
					.then(function(res) {
						vm.$Loading.finish();
						vm.info = res.data.data;
					})
					.catch(function(error) {
						vm.$Loading.error();
					});
			},
			getPage(page){
				this.getProvData(page)
			}
		},
		created(){
			this.getProvData(1);
			this.getTodayData();
		},
		mounted() {
			// 基于准备好的dom，初始化echarts实例
//			var mapChart = echarts.init(document.getElementById('mapMain'));
//			const chinaJson = require('./map-data/china.json');
//			echarts.registerMap('china', chinaJson);
				
		}
	}
</script>