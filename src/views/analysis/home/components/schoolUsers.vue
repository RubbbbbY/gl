<template>
	<div class="su-mian">
		<Card style="overflow: hidden;">
			<div slot="title">
				<Row>
					<Col span="4">学校用户（PC）</Col>
					<Col span="4">
					<!--<Cascader :data="data" change-on-select></Cascader>-->
					</Col>
					<Col span="8" offset="10">
					<Input placeholder="请输入..." style="width: 200px"></Input>
					<Button type="primary">搜索</Button>
					</Col>
				</Row>
			</div>
			<div>
				<div  style="width: 100%;text-align: right;padding: 15px;font-size: 14px;font-weight: bold;">用户总量：{{count}}</div>
				<Table :columns="columns1" :data="data1"></Table>
				<Page @on-change="getPage" class="posi" :page-size="pageSize" :total="total" :current="vCurrent"></Page>
			</div>
		</Card>
	</div>
</template>

<script>
	import qs from 'qs';
	export default {
		name: "schoolUsers",
		data() {
			return {
				count:0,

				columns1: [{
						title: '省份',
						key: 'province'
					},
					{
						title: '城市',
						key: 'city'
					},
					{
						title: '学校',
						key: 'schoolName'
					},
					{
						title: '教职工',
						key: 'teacher'
					},
					{
						title: '学生',
						key: 'student'
					},
					{
						title: '总用户',
						key: 'allUser'
					}
				],
				data1: [],
				vCurrent:0,
				total:0,
				pageSize:0
			}
		},
		methods: {

			httpServe(page){
				this.$Loading.start();
				var vm = this;
				this.$http.post(vm.API.getSchoolData, qs.stringify({
						page:page,
						size: 7
					}))
					.then(function(res) {
						vm.count=vm.$store.state.allUsre;
						vm.$Loading.finish();
						console.log(res);
						vm.data1 = res.data.data.data;
						vm.vCurrent = parseInt(res.data.data.page.nowPage);
						vm.total = parseInt(res.data.data.page.total);
						vm.pageSize = parseInt(res.data.data.page.pageSize);
						
					})
					.catch(function(error) {
						vm.$Loading.error();
					});
			},
			getPage(page){
				this.httpServe(page)
			}
		},
		created() {
			this.httpServe(1);
		}
	}
</script>

<style scoped>
	.su-mian {
		width: 100%;
		overflow: hidden;
	}
	
	.posi {
		position: relative;
		float: right;
		margin: 10px 0;
	}
</style>