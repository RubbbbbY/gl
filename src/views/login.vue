<style lang="less" scoped>
    @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card :bordered="true" style='width: 350px;margin: 0 auto;background-color:rgba(255,255,255,0.8)'>
                <p slot="title">
                	登录
                </p>
                <div class="form-con">
                	<Input v-model="user" placeholder="账号" style="width: 100%;margin-bottom: 15px;"></Input>
                	<Input v-model="pwd" placeholder="密码" style="width: 100%;margin-bottom: 15px;"></Input>
                	<Button @click="loginSubmit" type="success" long>Go!</Button>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
	import qs from 'qs';
    export default {
        data () {
            return {
            	user:'',
            	pwd:''
            }
        },
        methods: {
        	loginSubmit(){
        		if(this.user!='dekang') return this.$Message.error('账号或者密码错误！');
        		if(this.pwd!='dekang123') return this.$Message.error('账号或者密码错误！');
        		let vm = this;
    	    	this.$http.post(vm.API.login,qs.stringify({
    						user:vm.user,	
    						pwd:vm.pwd
    					}))
    					.then(function(res) {
    						if(res.data.data==true){
    							vm.$router.push({
    		                        name: 'home_index'
    		                    });
    						}
    					})
    					.catch(function(error) {
    					});
        	}
        },
        created(){
        	
        }
    };
</script>

<style>

</style>
