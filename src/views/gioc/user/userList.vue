<style scoped>
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
</style>
<template>
    
	<div class="user-main">
        <sub-title></sub-title>
        <div class="main-in">
    		<Card class='card'>
    	        <p slot="title">
    	            <Icon type="clipboard"></Icon>
    	            筛选查询
    	        </p>
    	        <div slot="extra">
                     <Button-group>
                        <Button type="info" @click='mibao=true'>重置密码</Button>
                        <Button type="ghost">查询结果</Button>
                        <Button type="ghost" @click='modal1 = true'>高级筛选</Button>
                    </Button-group>
    	        </div>
    	        <Row>
    		        <i-col span="8">用户账号：<i-input  placeholder="用户ID/账号" style="width: 200px"></i-input> </i-col>
    		        <i-col span="8">
    		        	用户姓名：<i-input  placeholder="用户昵称" style="width: 200px"></i-input>
    			    </i-col>
    		        <i-col span="8">
    		        	所在学校：<i-input  placeholder="学校" style="width: 200px"></i-input>
    		        </i-col>
    		    </Row>
    	    </Card>
    	    <Card class='card'>
    	    	<p slot='title'>
    	    		<Icon type="clipboard"></Icon>
    	    		数据列表
    	    	</p>
    	    	<div slot='extra'>
                   
                    <Select @on-change='setTap' clearable placeholder='设置标签' style="width:100px">
                            <Option value="c">选中用户</Option>
                            <Option value="d">全部用户</Option>
                    </Select>
                    <Select clearable placeholder='到出数据' style="width:100px">
                            <Option value="e">选中用户</Option>
                            <Option value="f">全部用户</Option>
                    </Select>
                    <Cascader @on-change='APPchangeVal' trigger='hover' placeholder='APP推送' style='float:right;margin-left:5px' :data="data" v-model="value1"></Cascader>
    	    	</div>
    	    	<p>
    	    		<i-table ref="selection"  :columns="columns4" :data="data1"></i-table>
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
            
            <!-- 检索框 -->
            <Modal
                v-model="modal1"
                title="高级检索"
                @on-ok="ok"
                ok-text="检索"
                cancel-text="重置"
                @on-cancel="cancel">
                <Row>
                    <i-col span="12">用户账号：<i-input  placeholder="用户ID/账号" style="width: 150px"></i-input> </i-col>
                    <i-col span="12">
                        用户姓名：<i-input  placeholder="用户昵称" style="width: 150px"></i-input>
                    </i-col>
                </Row>
                <br>
                <Row>
                    <i-col span="12">专业：&nbsp;&nbsp;<i-input  placeholder="专业" style="width: 150px;margin-left: 17px;"></i-input> </i-col>
                    <i-col span="12">
                        
                        用户类别：<Select clearable style="width:150px">
                            <Option value="4"  selected = "selected">全部</Option>
                            <Option value="1">校内老师</Option>
                            <Option value="2">校外老师</Option>
                            <Option value="3">学生</Option>
                        </Select>
                    </i-col>
                </Row>
                <br>
                <Row>
                    <i-col span="12">所在学校：<i-input  placeholder="学校" style="width: 150px"></i-input> </i-col>
                    <i-col span="12">
                        标签：<i-input  placeholder="标签名称" style="width: 150px;margin-left: 23px;"></i-input>
                    </i-col>
                </Row>
            </Modal>
            <!-- 添加标签框 -->
            <Modal
                v-model="modal2"
                title="设置标签"
                @on-ok="tapOk"
                >
                <Checkbox-group v-model='BoxVal' on-change='checkBoxVal'>
                    <Checkbox label="香蕉"></Checkbox>
                    <Checkbox label="苹果"></Checkbox>
                    <Checkbox label="西瓜"></Checkbox>
                    <Checkbox label="西瓜"></Checkbox>
                    <Checkbox label="西瓜"></Checkbox>
                    <Checkbox label="西瓜"></Checkbox>
                </Checkbox-group>
            </Modal>
             <!-- 重置密保 -->
            <Modal
                v-model="mibao"
                title="重置密码跟密保"
                :mask-closable="mask"
                >
                <Form ref="formItem" :model="formItem" :rules='changePwd' :label-width="120" >
                    <FormItem label="账号：" prop="loginName">
                            <Input  v-model="formItem.loginName" placeholder="账号"></Input>
                    </FormItem>

                    <FormItem label="学校：" prop="schoolId">
                        <Select clearable filterable v-model="formItem.schoolId">
                            <Option v-for="(item,index) in schools"  :value="item.id" :key="index">{{item.customerName}}</Option>
                        </Select>
                    </FormItem>

                    <FormItem label="是否清空问题">
                        <i-switch v-model="formItem.isClean"></i-switch>
                    </FormItem>

                    <FormItem label="密码：" prop="pwd">
                            <Input  v-model="formItem.pwd" placeholder="密码"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" size="large" @click="changePwdAdmin('formItem')" :loading="modal_loading" >确定</Button>
                    <Button type="ghost" @click="cancel2" size="large">取消</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
    import qs from 'qs';
    import subTitle from '../../component/title.vue';
	export default {
		name:'userList',
        components: {
            subTitle
        },
		data () {
            return {
                mask:false,
                schools:[],
                changePwd:{
                    loginName:[{ required: true, message: '账号不能为空！', trigger: 'blur' }],
                    pwd:[{ required: true, message: '密码不能为空！', trigger: 'blur' }],
                },
                formItem:{
                    loginName:"",
                    isClean:true,
                    schoolId:"",
                    pwd:""
                },
                BoxVal:[],
                modal_loading:false,
                title:this.$store.state.subtitle,
                modal1:false,   
                modal2:false,
                mibao:false,
                total:100,
                pageSize:7,
                current:1,
                value1: [],
                data: [{
                    value: 'select',
                    label: '选中用户',
                    children: [
                        {
                            value: 'link',
                            label: 'APP推送（链接）'
                        },
                        {
                            value: 'active',
                            label: 'APP推送（活动）'
                        }
                    ]
                }, {
                    value: 'all',
                    label: '全部用户',
                    children: [
                                 {
                                    value: 'link2',
                                    label: 'APP推送（链接）'
                                },
                                {
                                    value: 'active2',
                                    label: 'APP推送（活动）'
                                }
                            ]
                }],
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户ID',
                        align: 'center',
                        key: 'userId'
                    },
                    {
                        title: '用户账号',
                        align: 'center',
                        key: 'login'
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'personName'
                    },
                    {
                        title: '所在学校',
                        align: 'center',
                        key: 'customerName'
                    },
                    {
                        title: '用户类型',
                        align: 'center',
                        key: 'userType'
                    },
                    {
                        title: '账户启用状态',
                        align: 'center',
                        key: 'name',
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
            cancel2(){
                this.mibao=false;
                this.formItem={
                    loginName:"",
                    isClean:true,
                    schoolId:"",
                    pwd:""
                }
            },
            changePwdAdmin(name){
                 this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.API.changePwdAdmin,qs.stringify(this.formItem))
                        .then( res => {
                            this.$Message.success('Success!');
                            console.log(this.formItem)
                        })
                        .catch(error => {

                        })
                        
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            tapOk(){
                alert(this.BoxVal)
            },
            APPchangeVal(val,data){
                if (data[1].value=='active2') {
                    alert(1)
                }
            },
            setTap(val){
                this.modal2=true;
            },
            checkAll(e){
                if (e) {
                    this.$refs.selection.selectAll(true);
                }else {
                    this.$refs.selection.selectAll(false);
                }
            },
            setPage(page){
                this.getUserList(page)
            },
            getUserList(page){
                const vm = this;
                this.$Loading.start();
                this.$http.post(vm.API.getUserData,qs.stringify({
                    page:page,
                    size:7
                }))
                    .then(function(res) {
                        vm.$Loading.finish();
                        vm.total = res.data.data.page.allPage;
                        vm.pageSize = res.data.data.page.pageSize;
                        vm.current = res.data.data.page.nowPage;
                        var proveList = res.data.data.data;
                        vm.data1 = proveList;
                    })
                    .catch(function(error) {
                        vm.$Loading.error();
                    });
            },
            ok () {
                this.$Message.info('点击了确定');
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
        created(){
            this.getUserList(1);
             this.$http.post(this.API.getSchoolList)
                 .then(res=>{
                    console.log(res);

                    this.schools = res.data.data;
                 })
        }
	}
</script>