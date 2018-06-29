<template>

	<div class="av-main">
		<sub-title></sub-title>
		<div class="main-in">
			<Card :bordered="false">
				<div slot="title">
					<Row>
						<Col span="12"> 访问情况分析
						</Col>
						<Col span="2">
						</Col>
						<Col span="9">
						<Date-picker type="daterange" @on-change="changeDate" :options="options2" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
						</Col>
					</Row>
				</div>
				<div class="av-echart">
					<div id="main" style="width: 1000px;height:400px;margin: 0 auto;"></div>
				</div>
			</Card>
			<vital-list></vital-list>
		</div>
	</div>
</template>

<script>
	import vitalList from './component/vitalList.vue'
	import subTitle from '../../component/title.vue'
	import echarts from 'echarts';
	import qs from 'qs';
	export default {
		components: {
			vitalList,
			subTitle
	    },
		data() {
			return {
				options2: {
					shortcuts: [{
							text: '最近7天',
							value() {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
								return [start, end];
							}
						},
						{
							text: '最近30天',
							value() {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
								return [start, end];
							}
						},
						{
							text: '最近90天',
							value() {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
								return [start, end];
							}
						}
					]
				}

			}
		},
		methods: {
			changeDate(event){
				console.log(event)
				let start = event[0];
				let end = event[1];
				this.setDate(start,end);
			},
			getToday() {
				const vDate = new Date();
				return vDate.getFullYear() + "-" + (vDate.getMonth() + 1) + "-" + vDate.getDate()
			},
			getOP(data1,data2,dataX){
				// 基于准备好的dom，初始化echarts实例
					var myChart = echarts.init(document.getElementById('main'));
					// 绘制图表
					var op1 = {
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: ['浏览次数（PV）', '独立访客（UV）']
						},
						xAxis: [{
							type: 'category',
							data: dataX,
							nameLocation:"start"
							
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
								name: '浏览次数（PV）',
								type: 'line',
								data: data1
							},
							{
								name: '独立访客（UV）',
								type: 'line',
								data: data2
							}
						]
					}
					myChart.setOption(op1);
					this.$Message.info('刷新成功！');
			},
			setDate(startDate,endDate){
				this.$Loading.start();
				let vm =this;
				this.$http.post(this.API.getCountData, qs.stringify({
						url: "index",
						startDate: startDate,
						endDate: endDate
					}))
					.then(function(res) {
						vm.$Loading.finish();
						let data1=[];
						let data2=[];
						let dataX = [];
						let rs = res.data.data;
						if(rs!=''){
							console.log(rs);
							for(let i = 0; i < rs.length; i++) {
								dataX.push(rs[i].time);
								data1.push(rs[i].pv)
								data2.push(rs[i].uv)
							}
							console.log(dataX + "text")
							vm.getOP(data1,data2,dataX)
						}else{
							vm.$Notice.warning({
			                    title:'提醒',
			                    desc:'当前时间暂无数据！'
			                });
						}
						
					})
					.catch(function(error) {
						vm.$Loading.error();
						vm.$Notice.error({
			                    title:'提醒',
			                    desc:'服务器异常，请求失败！',
			                    duration:0
			                });
					});
			}
		},
		mounted() {
			const vm = this;
			this.setDate(vm.getToday(),vm.getToday())
		}
	}
</script>

<style scoped>
	.av-main {
		width: 100%;
		overflow: hidden;
	}
	
	.av-echart {
		width: 100%;
	}
	.main-in{
		width: 100%;
		padding: 15px;
	}
</style>