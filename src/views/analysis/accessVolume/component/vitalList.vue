<template>
	<div class="av-main">
		<Card :bordered="false" style='margin-top: 15px;'>
			<div slot="title">
				<Row>
					<Col span="12"> 活跃学校排行榜
					</Col>
					<Col span="2">
					</Col>
					<Col span="9">
					<Date-picker @on-change='changeDate' type="daterange" :options="options2" placement="bottom-end" placeholder="选择日期" style="width: 200px"></Date-picker>
					</Col>
				</Row>
			</div>
			<div class="av-echart">
				<Table :columns="columns5" :data="data5" height="400"></Table>
			</div>
		</Card>
		</div>
</template>

<script>
	import qs from 'qs';
	export default {
		name: "vitalList",
		data() {
			return {
				vCurrent: 0,
				total: 0,
				pageSize: 0,
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
				},
				columns5: [{
						title: '学校',
						key: 'schoolName'
					},
					{
						title: '总用户量',
						key: 'number'
					},
					{
						title: 'UV（次）',
						key: 'uv',
						sortable: true
					},
					{
						title: 'PV（次）',
						key: 'pv',
						sortable: true
					},
					{
						title: '人均UV（次）',
						key: 'avgUv'
					},{
						title: '人均PV（次）',
						key: 'avgPv'
					}
				],
				data5: []
			}
		},
		methods: {
			changeDate(item){
				this.getVitalList(item[0],item[1])
			},
			getVitalList(start,end) {
				this.$Loading.start();
				var vm = this;
				this.$http.post(vm.API.getVitalList, qs.stringify({
						url: 'index',
						startDate: start,
						endDate: end
					}))
					.then(function(res) {
						vm.$Loading.finish();
						console.log(res);
						vm.data5 = res.data.data;
						vm.vCurrent = parseInt(res.data.data.page.nowPage);
						vm.total = parseInt(res.data.data.page.total);
						vm.pageSize = parseInt(res.data.data.page.pageSize);
					})
					.catch(function(error) {
						vm.$Loading.error();
					});
			}
		},
		created(){
			this.getVitalList(this.getToday(),this.getToday());
		}
	}
</script>

<style scoped="scoped">
	.v-main {
		width: 100%;
	}
	.av-echart {
		width: 100%;
	}
	.av-main {
		width: 100%;
		overflow: hidden;
	}
</style>