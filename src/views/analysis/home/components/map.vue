<template>
	<div class="map-main">
		<div style="width:550px;height: 400px;margin: 0 auto;" id="home_page_map"></div>
	</div>
</template>

<script>
	import qs from 'qs';
	import echarts from 'echarts';
	export default {
		name: "homeMap",
		methods: {
			getProvDataAll() {
				let vm = this;
				let mapData=[]
				let mapData2=[]
				this.$http.post(vm.API.getProvDataAll)
					.then(function(res) {
						console.log(res);
						let list = res.data.data.data;
						for(var i = 0; i < list.length; i++) {
							vm.$store.state.allUsre+=list[i].userNumber;
							mapData.push({
								name: list[i].province,
								value: list[i].userNumber
							});
							mapData2.push({
								name: list[i].province,
								value: list[i].schoolNumber
							})
						}
						vm.initMap(mapData,mapData2)
					})
					.catch(function(error) {
						vm.$Loading.error();
					});
			},
			initMap(mapData,mapData2) {
				var map = echarts.init(document.getElementById('home_page_map'));
				const chinaJson = require('../map-data/china.json');
				echarts.registerMap('china', chinaJson);
				let option = {
					tooltip: {
						trigger: 'item'
					},
					series: [{
						name: '用户总量',
						type: 'map',
						mapType: 'china',
						formatter: '{b},{a}',
						itemStyle: {
							normal: {
								label: {
									show: true,
								}
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						data: mapData
					},
					{
						name: '学校接入数',
						type: 'map',
						mapType: 'china',
						formatter: '{b},{a}',
						roam: true,
						itemStyle: {
							normal: {
								label: {
									show: true,
								}
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						data: mapData2
					}]
				};
				map.setOption(option)
			}
		},
	created() {
		this.getProvDataAll()
	}
}
</script>

<style scoped>
	.map-main {
		width: 100%;
	}
</style>