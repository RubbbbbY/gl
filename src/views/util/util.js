export default{
	install(Vue,options){
		var  serveUrl = "http://gzdk.gzisp.net:8082";
		 // let serveUrl = "http://192.168.188.94:8082";

		Vue.prototype.schoolCount=0;

		Vue.prototype.API = {
			//登录
			login:serveUrl+"/count/login",
			//首页pv数据接口
			getTodayData:serveUrl+"/count/getTodayData",
			//学校用户
			getSchoolData:serveUrl+"/count/getSchoolData",
			//省份列表
			getProvData:serveUrl+"/count/getProvData",
			getProvDataAll:serveUrl+"/count/getProvDataAll",
			//访问量分析
			getCountData:serveUrl+"/count/getCountData",
			//活跃度
			getVitalList:serveUrl+"/count/getVitalList",
			//用户列表
			getUserData:serveUrl+'/count/getUserData',
			//广告列表
			getAdvertList:serveUrl+'/advert/getAdvertList', 
			//添加广告
			saveAdvert:serveUrl+'/advert/saveAdvert' ,
			//学校列表
			getSchoolList:serveUrl+'/api/getSchoolList' ,
			//重新配置密保
			changePwdAdmin:serveUrl+'/wode/changePwdAdmin' ,
		}
		//获取当天日期 2017-11-7
		Vue.prototype.getToday = function() {
				let vDate = new Date();
				return vDate.getFullYear() + "-" + (vDate.getMonth() + 1) + "-" + vDate.getDate()
			}
  	}
}