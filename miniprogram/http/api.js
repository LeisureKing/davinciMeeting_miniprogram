
//引入封装的reuest请求
const { request } = require('./request.js')

//基于业务封装的接口
module.exports={

	/* 轮播图 */
	getDepartments:()=>{
		return request('department','post',"");
	},
	/* 封装商品列表的方法 */
	getGoodsList:()=>{
		return request('要请求的路径','请求方式|GET|POST',{要携带的参数},是否添加子域名 |true|false);
	},
	/* 添加商品收藏 */
	addGoodsFav: (goodsId, token)=>{
		return request('要请求的路径', 'POST', { goodsId:goodsId, token:token},true);
	},
	/* 获取商品的分类 */
	getGoodsCate:()=>{
		return request('要请求的路径','GET',{},true);
  },
  /* 登录 */
  dologin:(code)=>{
    return request('login','POST',code);
  },
	/* 更新用户信息 */
  updateInfo:(data) => {
    return request('updateInfo','POST',data);
	},
	/* 获取指定id的会议 */
	getMeeting:(id) => {
		return request('meeting/'+id,'GET','');
	},
	/* 获取会议室 */
	getRooms:() => {
		return request('rooms','GET')
	},
	/* 获取指定日期的所有会议 */
	getMeetings:(data) => {
		return request('meetings','GET',data)
	},
	/* 添加会议 */
	addMeeting:(data) => {
		return request('addMeeting','POST',data)
	},
	/* 获取未审批会议 */
	getNonCheckMeeting:() => {
		return request('getNonCheckMeeting','GET')
	},
	/* 获取已审批的会议 */
	getCheckedMeeting:() => {
		return request('getCheckedMeeting','GET')
	},
	/* 审批会议 */
	checkMeeting:(data) => {
		return request('checkMeeting','POST',data)
	},
	/* 获取我发布的会议 */
	getMyMeeting:(token) => {
		return request('getMyMeeting/'+token,'GET')
	},
	/* 获取我的订阅会议 */
	getMySubscribeMeeting:(token) => {
		return request('getMySubscribeMeeting/'+token,'GET')
	},
	/* 发起订阅 */
	addSubscribe:(data) => {
		return request('addSubscribe','POST',data)
	},
	/* 取消我发起的会议 */
	cancelMeeting:(data) => {
		return request('cancelMeeting','POST',data)
	}
}