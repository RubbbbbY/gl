<style scoped>
	.adv-main{
		width: 100%;
	}
	.card{
		width: 100%;
		margin-bottom: 15px;
        padding: 15px;

	}
    .main-card{
        width: 100%;
    }
    .main-in{
        width: 100%;
        padding: 15px;
    }
    .r-color{
    	color: red;
    }
</style>
<template>
	<div class="adv-main">
		<sub-title></sub-title>
		<div class="main-in">
			<Card class='card'>
    	        <p slot="title">
    	            <Icon type="clipboard"></Icon>
    	            筛选查询
    	        </p>
    	        <div slot="extra">
                     <Button-group>
                        <Button type="ghost">查询结果</Button>
                    </Button-group>
    	        </div>
    	        <Row>
    		        <i-col span="8">广告名称：<i-input  placeholder="广告名称" style="width: 200px"></i-input> </i-col>
    		        <i-col span="8">
    		        	广告位置：
    		        	<Select clearable style="width:200px">
                            <Option value="1">app首页轮播</Option>
                    	</Select>
    			    </i-col>
    		        <i-col span="8">
    		        	到期时间：
    		        	<Select clearable  style="width:200px">
                            <Option value="a">1天内</Option>
                            <Option value="b">3天内</Option>
                            <Option value="b">1周内</Option>
                    	</Select>
    		        </i-col>
    		    </Row>
    	    </Card>
    	    <Card class='card'>
    	    	<p slot='title'>
    	    		<Icon type="clipboard"></Icon>
    	    		数据列表
    	    	</p>
    	    	<div slot='extra'>
                   <Button type="primary" @click='adv=true' icon='plus-round'>添加广告</Button>
                    <Select clearable placeholder='显示条数' style="width:100px">
                            <Option value="c">选中用户</Option>
                            <Option value="d">全部用户</Option>
                    </Select>
                    <Select clearable placeholder='排序方式' style="width:100px">
                            <Option value="e">选中用户</Option>
                            <Option value="f">全部用户</Option>
                    </Select>
    	    	</div>
    	    	<p>
    	    		<i-table ref="selection" border :columns="columns4" :data="data1"></i-table>
    	    	</p>
                <Row style='margin-top:15px'>
                    <i-col span="7">
                        <Checkbox @on-change='checkAll' label="twitter">
                            <span>全选</span>
                        </Checkbox>
                        <Select placement='top' clearable placeholder='批量操作' style="width:100px">
                                <Option value="q">启用</Option>
                                <Option value="t">停用</Option>
                                <Option value="s">删除</Option>
                        </Select>
                        <Button type="info">确定</Button>
                    </i-col>
                    <i-col span="17">
                       
                       <div style="float:right"><Page :total="total" :page-size='pageSize' :current='current' @on-change='setPage' show-elevator></Page></div>
                       <!-- <div style="float:right;position:relative;right:15px;top:10px">共<span>10</span>页/<span>100</span>条数据 </div> -->
                    </i-col>
                </Row>
    	    </Card>
    	    <Modal
                v-model="adv"
                title="添加广告"
                :loading="loading"
                :mask-closable="mask"
                >
                <Form ref="formItem" :model="formItem" :rules='ruleAdv' :label-width="90" >
			       <FormItem label="广告名称：" prop="name">
			            <Input  v-model="formItem.name" placeholder="名称"></Input>
			        </FormItem>
					 <Alert type="warning" show-icon>广告名称只是作为辨别多个广告条目之用，并不显示在广告中</Alert>
			        <FormItem label="广告位置：" prop="local">
			            <Select style="width:185px" v-model="formItem.local">
			                <Option value="beijing">app首页轮播</Option>
			            </Select>
			        </FormItem>

			        <FormItem label="开始时间：" prop="startTime">
			            <DatePicker type="date" placeholder="请选择时间" v-model="formItem.startTime"></DatePicker>
			        </FormItem>
			        <FormItem label="到期时间：" required>
			            <DatePicker type="date" placeholder="请选择时间" v-model="formItem.endTime"></DatePicker>
			        </FormItem>
			        <FormItem label="上/下线：">
			            <i-switch v-model="formItem.status" size="large">
					        <span slot="open">ON</span>
					        <span slot="close">OFF</span>
					    </i-switch>
			        </FormItem>
			        <FormItem label="广告图片：" required>
			            <Upload action="//jsonplaceholder.typicode.com/posts/">
					        <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
					    </Upload>
			        </FormItem>
			        <Alert type="warning">只能上传jpg/png格式文件，文件不能超过50kb</Alert>
			        <FormItem label="广告链接：" required>
			            <Input v-model="formItem.url" placeholder="链接"></Input>
			        </FormItem>
			         <FormItem label="广告备注：">
			            <Input v-model="formItem.content" type="textarea" :rows="4" placeholder="请输入内容"></Input>
			        </FormItem>
		        </Form>
                <div slot="footer">
                    <Button type="primary" size="large" :loading="loading" @click="addAdv('formItem')">提交</Button>
                    <Button type="ghost" size="large">取消</Button>
                </div>
            </Modal>
		</div>
	</div>
</template>
<script>
	import qs from 'qs';
    import subTitle from '../../component/title.vue';
	export default {
		name:'advert',
        components: {
            subTitle
        },
		data () {
			return{
                ruleAdv:{
                    name:[{ required: true, message: '广告名称不能为空！', trigger: 'blur' }],
                    local:[{required:true,message:"请选择广告位置！",trigger:'change'}],
                    startTime:[{required: true, type: 'date', message: 'Please select the date', trigger: 'change' }]
                },
                loading:false,
                mask:false,
				formItem: {
                    name: '',
                    url: '',
                    local: '',
                    status: false,
                    startTime:'',
                    endTime: '',
                    content: ''
                },
				adv:false,
				total:100,
                pageSize:7,
                current:1, 
				columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '编号',
                        align: 'center',
                        key: 'id'
                    },
                    {
                        title: '广告名称',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '广告位置',
                        align: 'center',
                        key: 'local'
                    },
                    {
                        title: '开始时间',
                        align: 'center',
                        width:150,
                        key: 'createdTime'
                    },
                    {
                        title: '结束时间',
                        align: 'center',
                        width:150,
                        key: 'endTime'
                    },
                    {
                        title: '上线/下线',
                        align: 'center',
                        key: 'status',
                        render:(h,params) => {
                            return h('div',[
                                h('i-switch',{
                                    props: {
                                        size: 'large',
                                        value:true
                                    },
                                })
                            ])
                        }
                    },
                    {
                        title: '点击次数',
                        align: 'center',
                        key: 'count'
                    },
                    {
                        title: '生成订单',
                        align: 'center',
                        key: 'userType'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '置顶'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: []
			}
		},
		methods:{
			checkAll(e){
                if (e) {
                    this.$refs.selection.selectAll(true);
                }else {
                    this.$refs.selection.selectAll(false);
                }
            },
            addAdv(name){
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(typeof this.formItem.startTime)
                        this.formItem.startTime = new Date(this.formItem.startTime)
                        this.$Message.success('Success!');
                        console.log(this.formItem)
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            setPage(page){
                this.getAdvertList(page)
            },
            getAdvertList(page){
                const vm = this;
                this.$Loading.start();
                this.$http.post(vm.API.getAdvertList,qs.stringify({
                    page:page,
                    size:7
                }))
                    .then(function(res) {
                        console.log(res)
                        vm.$Loading.finish();
                        if (res.data.data&&res.data.data!='') {
	                        vm.total = res.data.data.page.allPage;
	                        vm.pageSize = res.data.data.page.pageSize;
	                        vm.current = res.data.data.page.nowPage;
	                        var proveList = res.data.data.data;
	                        vm.data1 = proveList;
                       }
                    })
                    .catch(function(error) {
                        vm.$Loading.error();
                    });
            },
            saveAdvert(){
                const vm = this;
                this.$Loading.start();
                let a = vm.getToday(vm.formItem.startTime);
                let b = vm.getToday(vm.formItem.endTime);
                this.formItem.startTime = a
                this.formItem.endTime = "2017-12-11";
                console.log(vm.formItem); return;
                this.$http.post(vm.API.getAdvertList,qs.stringify(vm.formItem))
                    .then(function(res) {
                        console.log(res)
                        vm.$Loading.finish();
                        if (res.data.data&&res.data.data!='') {
                            vm.total = res.data.data.page.allPage;
                            vm.pageSize = res.data.data.page.pageSize;
                            vm.current = res.data.data.page.nowPage;
                            var proveList = res.data.data.data;
                            vm.data1 = proveList;
                       }
                    })
                    .catch(function(error) {
                        vm.$Loading.error();
                    });
            }
		},
		created(){
            this.getAdvertList(1)
        }
	}
</script>