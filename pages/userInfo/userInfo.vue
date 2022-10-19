<template>
	<view class="contents">
		<view class="collectiondlBox ui-cell" v-if="dlflag">
			<view class="deleteBox">
				 <view class="deleteTitle">注销账号将清空所有数据</view>
				 <view class="deleteTitle">是否确认注销</view>
				 <view class="colsetBox ui-cell">
					 <view class="cancelBtn ui-cell" @tap="cancel()">取消</view>
					 <view class="deleteBtn ui-cell" @tap="deletes()">确定注销</view>
				 </view>
			</view>
		</view>
		<view class="editBox ui-cell" v-if="editflag">
			 <view class="editContent">
				 <view class="titles">{{titles}}</view>
				 <view class="editItem ui-cell" v-if="nickflag">
					 <view class="itemTitles">昵称</view>
					 <input type="text" placeholder="请输入新的昵称" class="editInput" @input="changeNick">
				 </view>
				 <view class="editItem ui-cell" v-if="ageflag">
					 <view class="itemTitle">年龄</view>
					 <input type="text" placeholder="请输入年龄" class="editInput" @input="changeAge">
				 </view>
				 <view class="markSure ui-cell" @tap="markSure()">确定</view>
				 <view class="cloeseImg" @tap="closeEdit"><image src="/static/img/cls.png" ></image></view>
			 </view>
		</view>
		<view class="userImg ui-cell">
			<image :src="avatar" class="uimg"></image>
			<view class="upImg" @tap="uploadImg">更新头像</view>
		</view>
		<view class="userItem ui-cell" @tap="editNick">
			<view class="itemTitle">昵称</view>
			<view class="itemValue" v-if="nickname!=''">{{nickname}}</view>
			<view class="noValue" v-else>未设置</view>
			<image src="/static/img/right.png" class="rightImg"></image>
		</view>
		<view class="userItem ui-cell">
			<view class="itemTitle">手机号</view>
			<view class="itemValue" v-if="mobile!=''">{{mobile}}</view>
		</view>
		<view class="bbcode">当前版本V1.0.0</view>
		<view class="loginOut ui-cell" @tap="loginOut">退出登录</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { post } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	export default {
		data () {
			return {
				is_bind_wachat:0,
				titles:'',
				index:0,
				avatar:'',
				nickname:'',
				age:'',
				sex:0,
				aera :'',
				gender:'',
				mobile:'',
				userInfo:[],
				arrays:[{idx:1,val:'男'},{idx:2,val:'女'}],
				multiIndex: [0, 0, 0],
				aera: '',
				addressData: {
				    name: '',
				    phone: '',
				    address: ''
				},
				editflag:false,
				nickflag:false,
				ageflag:false,
				nicks:'',
				ages:'',
				dlflag:false,
				user_avatar:''
			}
		},
		mixins: [],
		onShow() {
			if(!uni.getStorageSync('tokens')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				this.getuserinfo()
			}
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad() {
		},
		methods: {
			uploadImg(){
			  let self = this
			  uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认都有
				sourceType: ['album', 'camera'], //从相册选择
				success(res) {
					const tempFilePaths = res.tempFilePaths
				 	self.upload(tempFilePaths)
				 }
			  })
			},
			upload(tempFilePaths) {
				let self = this
				uni.showLoading({
					title:'上传中...'
				})
				uni.uploadFile({
				 url: 'https://ydd.huangguaxiong.cn/api/file/formimage', 
				 filePath: tempFilePaths[0],
				 name: 'file',
				 formData: {
					 name:'头像'
				 },
				 success: (res) => {
				  let sult=	 JSON.parse(res.data);
				  if(status==1){
					  self.avatar=tempFilePaths[0];
					  self.user_avatar=sult.data.base_url;
				  }
				  uni.hideLoading();
				  self.updateInfo('avatar',sult.data.base_url);
				  uni.showToast({
					  title: '上传成功！',
					  icon: 'none',
				  });
				 },
				 fail() {
					 uni.showToast({
						 title: '上传失败！',
						 icon: 'none',
					 });
				 }
			  });
			},
			cancel(){
				this.dlflag=false
			},
			deletes(){
				this.cancelCode()
			},
			//注销账号
			cancelCode(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				post('Account/clearAccount',{},token).then(res=>{
					if(res.code==1){
						uni.removeStorageSync('tokens');
						uni.removeStorageSync('uid');
						uni.removeStorageSync('useInfo');
						uni.redirectTo({
							url:'/pages/login/login'
						})
					}else{
						that.dlflag=false;
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				})
			},
			//退出登录
			loginOut(){
				uni.removeStorageSync('tokens');
				uni.removeStorageSync('uid');
				uni.removeStorageSync('useInfo');
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			showtoast(){
				this.dlflag=true;
			},
			//确定修改
			markSure(){
				if(this.ageflag){
					let age=this.ages;
					this.updateInfo('age',age)
				}else if(this.nickflag){
					let nick=this.nicks;
					this.updateInfo('nickname',nick)
				}
			},
			changeAge(e){
				this.ages=e.target.value;
			},
			changeNick(e){
				this.nicks=e.target.value;
			},
			gofw(){
				uni.navigateTo({
					url:'/pages/fuwu/fuwu'
				})
			},
			goys(){
				uni.navigateTo({
					url:'/pages/yinsi/yinsi'
				})
			},
			goabout(){
				uni.navigateTo({
					url:'/pages/aboutus/aboutus'
				})
			},
			//关闭
			closeEdit(){
				this.editflag=false;
				this.ageflag=false;
				this.nickflag=false;
				this.ages='';
				this.nicks='';
			},
			//修改年龄
			editAge(){
				this.editflag=true;
				this.ageflag=true;
				this.titles='填写年龄';
			},
			//设置昵称
			editNick(){
				this.editflag=true;
				this.nickflag=true;
				this.titles='修改用户名';
			},
			//获取个人信息
			getuserinfo(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				post('user/info/',{},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.userInfo=res.data;
						that.avatar=res.data.avatar;
						that.nickname=res.data.nickname;
						that.mobile=res.data.mobile;
						that.is_bind_wachat=res.data.is_bind_wachat;
						if(res.data.sex==0){
							that.gender=''
						}else if(res.data.sex==1){
							that.gender='男'
						}else{
							that.gender='女'
						}
						if(res.data.area){
							console.log(111);
							that.aera=res.data.area;
						}
						if(res.data.age>0){
							that.age=res.data.age;
						}
					}
				})
			},
			//更新个人设置
			updateInfo(field,value){
				let that=this;
				let token=uni.getStorageSync('tokens');
				post('user/setInfo',{field:field,value:value},token).then(res=>{
					console.log(res);
					if(res.code==1){
						this.editflag=false;
						this.ageflag=false;
						this.nickflag=false;
						uni.showToast({
							icon:'none',
							title:'修改成功!'
						})
						that.getuserinfo();
					}
				})
			},
			//选择性别
			bindPickerChange(e){
				 let index = e.detail.value;
				 this.sex=this.arrays[index].idx;
				 this.gender=this.arrays[index].val;
				 this.updateInfo('sex',this.sex);
			}
	    }
	}
</script>

<style>
	.deleteBtn{
		width: 184rpx;
		height: 66rpx;
		color: #fff;
		font-size: 28rpx;
		font-weight: 700;
		border-radius: 33rpx;
		justify-content: center;
		align-items: center;
		background: linear-gradient(90deg, #29DB58 0%, #23C77E 100%);
		box-shadow: 0px 20px 30px 1px rgba(64,233,158,0.16);
	}
	.cancelBtn{
		width: 184rpx;
		height: 66rpx;
		color: #222222;
		font-size: 28rpx;
		font-weight: 700;
		border-radius: 33rpx;
		margin-right: 50rpx;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		border:1px solid #A3A4B2;
	}
	.colsetBox{
		width: 100%;
		height: auto;
		justify-content: center;
		margin-top: 50rpx;
	}
	.deleteTitle{
		width: 100%;
		text-align: center;
		color: #444457;
		font-size: 30rpx;
		line-height: 50rpx;
	}
	.deleteBox{
		width: 510rpx;
		height: 420rpx;
		background: url('../../static/img/tast.png') no-repeat left top ;
		background-size: 100% 100%;
		padding-top: 130rpx;
	}
	.collectiondlBox{
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
		background-color: rgba(0,0,0,0.5);
		align-items: center;
		justify-content: center;
	}
	.cloeseImg{
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		right: 60rpx;
		top: 60rpx;
	}
	.markSure{
		width: 100%;
		height: 76rpx;
		border-radius: 38rpx;
		justify-content: center;
		color: #fff;
		background: #002C76;
		box-shadow: 0px 5rpx 10rpx 1rpx #002C76;
	}
	.editInput{
		flex: 1;
		font-size: 30rpx;
		color: #1E1E31;
		
	}
	.itemTitles{
		font-size: 30rpx;
		color: #1E1E31;
		font-weight: 500;
		margin-right: 20rpx;
	}
	.editItem{
		width: 100%;
		height: auto;
		justify-content: flex-start;
		padding-bottom: 30rpx;
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 70rpx;
	}
	.titles{
		width: 100%;
		text-align: center;
		color: #002C76;
		font-size: 34rpx;
		margin-bottom: 70rpx;
		font-weight: 700;
	}
	.editContent{
		width: 600rpx;
		height: 520rpx;
		background-color: #fff;
		padding: 0 60rpx;
		padding-top: 100rpx;
		position: relative;
		border-radius: 16rpx;
	}
	.editBox{
		width: 100%;
		height: 100vh;
		background-color: rgba(0,0,0,0.5);
        position: fixed;
		left: 0;
		top: 0;
		z-index: 99999;
		flex-direction: column;
		justify-content: center;
	}
	.cancellation{
		width: 94%;
		height: 80rpx;
		justify-content: center;
		border-radius: 40rpx;
		color: #615F6D;
		background-color: #fff;
		font-size: 32rpx;
		margin: 0 auto;
		border: 1px solid #615F6D;
	}
	.loginOut{
		width: 94%;
		height: 80rpx;
		justify-content: center;
		border-radius: 40rpx;
		color: #DF3927 ;
		font-size: 32rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		background: #fff ;
		border: 2px solid #DF3927 ;
		font-weight: 700;
	}
	.bbcode{
		font-size: 28rpx;
		color: #9C99AC;
		width: 100%;
		text-align: center;
		margin-top: 50rpx;
		margin-bottom: 100rpx;
	}
	.rightImg{
		width: 13rpx;
		height: 22rpx;
	}
	.noValue{
		flex: 1;
		font-size: 30rpx;
		color: #9C99AC;
		font-weight: 700;
		text-align: left;
	}
	.itemValue{
		flex: 1;
		font-size: 30rpx;
		color: #1E1E31;
		font-weight: 700;
		text-align: left;
	}
	.itemTitle{
		width: 180rpx;
		font-size: 30rpx;
		color: #1E1E31;
		font-weight: 500;
	}
	.userItem{
		width: 100%;
		height: auto;
		justify-content: space-between;
		padding: 30rpx;
		border-bottom: 1px solid #f8f8f8;
	}
	.upImg{
		font-size: 26rpx;
		color: #9C99AC;
	}
	.uimg{
		width: 140rpx;
		height: 140rpx;
		margin-bottom: 20rpx;
		background-color: #f8f8f8;
		border-radius: 50%;
	}
	.userImg{
		width: 100%;
		height: auto;
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
	}
	.contents{
		width: 100%;
		padding-bottom: 50rpx;
	}
	.hx{
		width: 100%;
		height: 20rpx;
		background-color: #f6f6f6;
	}
	.bindwechat{
		padding: 10rpx 30rpx;
		color: #23C77E;
		font-size: 28rpx;
		border-radius: 50rpx;
		border: 1px solid #23C77E;
	}
</style>