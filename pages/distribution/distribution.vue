
<template>
	<view class="contents">
		<view class="editBox ui-cell" v-if="editflag">
			 <view class="editContent">
				 <view class="titles">填写邀请码</view>
				 <view class="editItem ui-cell">
					 <input type="text" placeholder="请输入邀请码" class="editInput" @input="changeCode">
				 </view>
				 <view class="markSure ui-cell" @tap="markSure">确定</view>
				 <view class="cloeseImg" @tap="closeEdit"><image src="/static/img/cl.png" ></image></view>
			 </view>
		</view>
		 <view class="distTop">
			 <view class="room_heads">
			 	<view class="room_Title ui-cell"><image src="/static/img/left.png" class='left_img' @tap="go_index" style="left: 0;"></image>推广中心</view>
			 </view>
			 <view class="distUserMsg ui-cell">
				 <view class="userImgs"><image :src="userData.avatar"></image><view class="disLv ui-cell">{{disData.level_name}}</view></view>
				 <view class="userMsg ui-cell">
					 <view class="username">{{userData.nickname}}</view>
					 <view class="userDis ui-cell" v-if="userData.first_leader==0">
						 <view class="topDis">上级分销商：无</view>
						 <image src="/static/img/bje.png" class="bjeImg" @tap="editTop"></image>
					 </view>
					 <view class="userDis ui-cell" v-else>
						 <view class="topDis">上级分销商：{{disData.leader.nickname}}</view>
					 </view>
				 </view>
			 </view>
		 </view>
		 <view class="commissionBg">
			 <view class="commissionContent">
				 <view class="commissionBox">
					 <view class="cboxTop"><view class="ctopTl">当前佣金</view><view class="ctopMn ui-cell"><text>￥</text><view class="comMoney">{{userData.earnings}}</view></view></view>
					 <view class="profitBox ui-cell">
						 <view class="profitItem"><view class="proItmeTl">今日预估收益</view><view class="proMoney">￥{{disData.today_earnings}}</view></view>
						 <view class="shuxy"></view>
						 <view class="profitItem"><view class="proItmeTl">本月预估收益</view><view class="proMoney">￥{{disData.month_earnings}}</view></view>
						 <view class="shuxy"></view>
						 <view class="profitItem"><view class="proItmeTl">累计获得收益</view><view class="proMoney">￥{{disData.history_earnings}}</view></view>
					 </view>
					 <!-- <view class="ruleBox ui-cell" @tap="gorule">分销规则</view> -->
				 </view>
				 <view class="teamBox ui-cell">
					 <view class="teamItem ui-cell">
						 <image src="/static/img/team1.png" class="teamImg" style="width: 66rpx;height: 54rpx;"></image>
						 <view class="teamRight ui-cell" @tap="gofans">
							 <view class="rigTl">我的团队</view>
							 <view class="rigBl ui-cell">
								 <view class="teamNbm ui-cell">{{disData.fans}}<text>人</text></view>
								 <image src="/static/img/left1.png" class="rigBimg"></image>
							 </view>
						 </view>
					 </view>
					 <view class="shuxy" style="margin-right: 50rpx;"></view>
					 <view class="teamItem ui-cell">
						 <image src="/static/img/team2.png" class="teamImg"></image>
						 <view class="teamRight ui-cell">
							 <view class="rigTl">我的邀请码</view>
							 <view class="rigBl ui-cell">
								 <view class="teamCode">{{userData.distribution_code}}</view>
								 <image src="/static/img/copy.png" class="rigBimg" @tap="onCopy"></image>
							 </view>
						 </view>
					 </view>
				 </view>
				 <view class="toolBox">
					 <view class="orderTop ui-cell" style="padding: 30rpx 0 10rpx 0;">
					 	<view class="topTitle">常用功能</view>
					 </view>
					 <view class="toolList ui-cell">
					 	<view class="toolItem ui-cell" v-for="(item, index) in toolList" :key="index" @tap="gotool(index)">
					 		<image :src="item.img" class="orderIco"></image>
					 		<view class="orderTitle">{{item.title}}</view>
					 	</view>
					 </view>
				 </view>
			 </view>
		 </view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { get,post } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	import {copy} from '@/utils/tools'
	export default {
		data () {
			return {
				disData:[],
				userData:[],
				toolList:[{title:'佣金明细',img:'/static/img/fx2.png',url:'/pages/commissionDetail/commissionDetail'},
					      {title:'推广海报',img:'/static/img/fx3.png',url:'/pages/sharePoster/sharePoster'}],	
				editflag:false,
				invitationCode:''		  
			}
		},
		mixins: [],
		onShow() {  
			this.getdisData();
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
		},
		methods: {
			go_index(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			markSure(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				if(!that.invitationCode){
					uni.showToast({
						icon:'none',
						title:'请填写邀请码'
					})
				}else{
					post('Distribution/code',{code:that.invitationCode},token).then(res=>{
						console.log(res);
						if(res.code==1){
							that.editflag=false;
							that.getdisData();
						}else{
							uni.showToast({
								icon:'none',
								title:res.msg
							})
						}
					})
				}
			},
			editTop(){
				this.editflag=true;
			},
			//关闭
			closeEdit(){
				this.editflag=false;
			},
			changeCode(e){
				this.invitationCode=e.target.value;
			},
			gofans(){
				uni.navigateTo({
					url:'/pages/myfans/myfans'
				})
			},
			onCopy(){
				copy(this.userData.distribution_code)
			},
			gorule(){
				uni.navigateTo({
					url:'/pages/distrule/distrule'
				})
			},
			gotool(index){
				let url=this.toolList[index].url;
				uni.navigateTo({
					url:url
				})
			},
			getdisData(){
				let that=this;
				let token = uni.getStorageSync('tokens');
				get('Distribution/index',{},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.disData=res.data;
						that.userData=res.data.user;
					}
				})
			}
	    }
	}
</script>

<style>
	.room_heads{
		margin-bottom: 50rpx;
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
		background: linear-gradient(87deg, #29DB58 0%, #23C77E 100%);
		box-shadow: 0px 20px 30px 1px rgba(64,233,158,0.16);
	}
	.editInput{
		flex: 1;
		height: 50rpx;
		font-size: 30rpx;
		color: #1E1E31;
		text-align: center;
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
		padding-bottom: 10rpx;
		border-bottom: 1px solid #e6e6e6;
		margin-bottom: 70rpx;
	}
	.titles{
		width: 100%;
		text-align: center;
		color: #23C77E;
		font-size: 34rpx;
		margin-bottom: 70rpx;
		font-weight: 700;
	}
	.editContent{
		width: 600rpx;
		height: 520rpx;
		background: url('/static/img/info.png') no-repeat left top;
		background-size: 100% 100%;
		padding: 0 60rpx;
		padding-top: 100rpx;
		position: relative;
	}
	.editBox{
		width: 100%;
		height: 100vh;
		background-color: rgba(0,0,0,0.5);
	    position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		flex-direction: column;
		justify-content: center;
	}
	.orderTitle{
	    font-size: 28rpx;
	    color: #333333;
	    font-weight: 700;
	}
	.orderIco {
	    width: 110rpx;
	    height: 110rpx;
	    margin-bottom: 10rpx;
	}
	.toolItem {
	    width: 25%;
	    flex-direction: column;
	    justify-content: center;
	}
	.toolList{
	    width: 100%;
	    height: auto;
	    flex-wrap: wrap;
	    margin-top: 20rpx;
	}
	.topTitle{
	    font-size: 30rpx;
	    color: #1E1E31;
	    font-weight: 700;
	}
	.orderTop{
	    width: 100%;
	}
	.toolBox{
	    width: 100%;
	    height: auto;
	    border-radius: 16rpx;
	    background-color: #fff;
	}
	.rigBimg{
		width: 32rpx;
		height: 32rpx;
	}
	.teamCode{
		font-size: 32rpx;
		color: #222;
		margin-right: 40rpx;
	}
	.teamNbm text{
		font-size: 28rpx;
		color: #666666;
		font-weight: 500;
	}
	.teamNbm{
		font-size: 32rpx;
		color: #222222;
		margin-right: 40rpx;
		align-items: baseline;
		font-weight: 700;
	}
	.rigBl{
		width: 100%;
		justify-content: flex-start;
	}
	.rigTl{
		font-size: 30rpx;
		color: #222222;
	}
	.teamRight{
		flex: 1;
		flex-direction: column;
		height: 70rpx;
		justify-content:space-between;
		align-items: flex-start;
	}
	.teamImg{
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}
	.teamItem{
		width: 50%;
		height: auto;
		justify-content: flex-start;
	}
	.teamBox{
		width: 100%;
		height: auto;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		justify-content: space-between;
		background: url('/static/img/team.png') no-repeat left top;
		background-size: 100% 100%;
	}
	.ruleBox{
		width: 160rpx;
		height: 60rpx;
		background-color: #F6F6F6;
		border-radius: 30px 0px 0px 30px;
		font-size: 26rpx;
		color: #666666;
		justify-content: center;
		position: absolute;
		right: 0;
		top: 30rpx;
	}
	.shuxy{
		height: 50rpx;
		width: 1px;
		background-color: #999;
	}
	.proMoney{
		font-size: 34rpx;
		color: #333333;
	}
	.proItmeTl{
		font-size: 28rpx;
		color: #444444;
		margin-bottom: 16rpx;
	}
	.profitBox{
		width: 100%;
		height: auto;
		justify-content: space-between;
	}
	.ctopMn text{
		font-size: 40rpx;
	}
	.ctopMn{
		font-size: 68rpx;
		color: #101010;
		font-weight: 700;
		align-items: baseline;
	}
	.ctopTl{
		font-size: 30rpx;
		color: #000;
		margin-bottom: 30rpx;
	}
	.cboxTop{
		width: 100%;
		margin-bottom: 80rpx;
	}
	.commissionBox{
		width: 100%;
		height: auto;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 30rpx;
		position: relative;
		margin-bottom: 40rpx;
		box-shadow: 0px 0px 16px 0px rgba(34,34,34,0.1);
	}
	.commissionContent{
		width: 100%;
		height: auto;
		padding: 30rpx;
		position: absolute;
		top: -160rpx;
		left: 0rpx;
	}
	.commissionBg{
		width: 100%;
		height: auto;
		position: relative;
	}
	.disLv{
		width: 130rpx;
		font-size: 24rpx;
		height: 40rpx;
		background-color: #FCDA38;
		color: #222;
		border-radius: 20rpx;
		position: absolute;
		left: 0;
		bottom: 0;
		justify-content: center;
	}
	.bjeImg{
		width: 30rpx;
		height: 30rpx;
	}
	.topDis{
		font-size: 24rpx;
		color: #fff;
		margin-right: 40rpx;
	}
	.username{
		font-size: 32rpx;
		color: #fff;
		font-weight: 700;
		margin-bottom: 20rpx;
	}
	.userMsg{
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}
	.userImgs image{
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
	}
	.userImgs{
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		margin-right: 30rpx;
		position: relative;
	}
	.distTop{
		width: 100%;
		height: 476rpx;
		background: url('/static/img/fxbg.png') no-repeat left top;
		background-size: 100% 100%;
		padding:60rpx 40rpx 40rpx 40rpx;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color: #fff;
	}
</style>