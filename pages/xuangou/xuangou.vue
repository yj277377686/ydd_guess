
<template>
	<view class="contents">
		 <view class="room_head">
		 	<view class="room_Title ui-cell"><image src="/static/img/left.png" class='left_img' @tap="go_index"></image>交易区</view>
		 </view>
		 <view class="navBox ui-cell">
			 <view class="navItem ui-cell" :class="{'active': indexs == 1}" @tap="changeNav(1)">买币</view><view class="navItem ui-cell" :class="{'active': indexs == 2}" @tap="changeNav(2)">卖币</view>
		 </view>
		 <view class="productList" v-if="indexs==1">
			<scroll-view scroll-y="true" class="scroll-Y">	 
				<view class="playSale">
					<view class="dealSale ui-cell">交易规则</view>
					<view class="saleDetail">
						1、玩法介绍玩法介绍玩法介绍玩，法介绍玩法介绍玩法介绍玩法介绍玩，法介绍玩法介，绍玩法介绍玩法介绍玩法介绍玩法介绍。
					</view>	
					<view class="saleDetail">
						2、玩法介绍玩法介绍玩法介绍玩，法介绍玩法介绍玩法介绍玩法介绍玩，法介绍玩法介。
					</view>	
				</view> 
				<view class="traderList">
					 <view class="traderItem ui-cell">
						 <view class="onbm">01</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>
					 <view class="traderItem ui-cell">
						 <view class="onbm">02</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>
					 <view class="traderItem ui-cell">
						 <view class="onbm">03</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>
					 <view class="traderItem ui-cell">
						 <view class="onbm">04</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>
					 <view class="traderItem ui-cell">
						 <view class="onbm">05</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>																	
				</view>
			</scroll-view>	
		 </view> 
	     <view class="productList" v-if="indexs==2"> 
		    <scroll-view scroll-y="true" class="scroll-Y">	 
				 <view class="playSale">
					<view class="dealSale ui-cell">交易规则</view>
					<view class="saleDetail">
						1、玩法介绍玩法介绍玩法介绍玩，法介绍玩法介绍玩法介绍玩法介绍玩，法介绍玩法介，绍玩法介绍玩法介绍玩法介绍玩法介绍。
					</view>	
					<view class="saleDetail">
						2、玩法介绍玩法介绍玩法介绍玩，法介绍玩法介绍玩法介绍玩法介绍玩，法介绍玩法介。
					</view>	
				 </view> 
				 <view class="traderList">
					 <view class="traderItemTwo ui-cell">
						 <view class="onbm">01</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>				 
					 <view class="traderItemTwo ui-cell">
						 <view class="onbm">02</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>				 
					 <view class="traderItemTwo ui-cell">
						 <view class="onbm">03</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>				 
					 <view class="traderItemTwo ui-cell">
						 <view class="onbm">04</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>				 
					 <view class="traderItemTwo ui-cell">
						 <view class="onbm">05</view> 
						 <view class="tmsgLeft">
							 <view class="traderName">交易员昵称</view>
							 <view class="dealMoney ui-cell"><text>100-300</text>RB</view>
						 </view>
						 <view class="tmsgRight ui-cell">
							 <view class="buyrb">购买</view>
							 <view class="unit">竞猜币</view>
						 </view>
					 </view>	
				 </view> 	 
			</scroll-view>		 
		 </view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { get, post } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	const app = getApp();
	export default {
		data () {
			return {
				indexs:1,
				actives:-1,
			}
		},
		mixins: [],
		onShow() {  
			if(uni.getStorageSync('tokens')){
				
			}else{
				uni.showModal({
					title: '温馨提示',
					content: '登录体验更多功能',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:'/pages/login/login'
							})
						} else if (res.cancel) {
							uni.navigateTo({
								url:'/pages/index/index'
							})
						}
					}
				});
			}
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
			if(getApp().globalData.indexq){
				this.indexs=getApp().globalData.indexq
			}
		},
		methods: {
			go_index(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			changeNav(index){
				this.indexs=index
			}
	    }
	}
</script>

<style>
	.tmsgRight{
		padding-right: 110rpx;
		flex-direction: column;
		justify-content: center;
	}
	.unit{
		font-size: 24rpx;
		color: #fff;
		opacity: 0.6;
	}
	.buyrb{
		font-size: 30rpx;
		color: #fff;
		font-weight: 600;
		margin-bottom: 10rpx;
	}
	.dealMoney text{
		font-size: 40rpx;
		color: #fff;
		font-weight: 600;
		margin-right: 10rpx;
	}	
	.dealMoney{
		font-size: 26rpx;
		padding-left: 60rpx;
		color: #B0ADAD;
	}
	.traderName{
		font-size: 30rpx;
		color: #fff;
		padding-left: 100rpx;
		margin-bottom: 10rpx;
	}
	.onbm{
		font-size: 40rpx;
		color: #fff;
		font-weight: 600;
		position: absolute;
		left: 20rpx;
		top: 20rpx;
	}
	.traderItemTwo{
		width: 100%;
		height: 220rpx;
		background: url('/static/img/gmm.png') no-repeat left top;
		background-size: 100% 100%;
		position: relative;
		justify-content: space-between;
		margin-bottom: 32rpx;
	}
	.traderItem{
		width: 100%;
		height: 220rpx;
		background: url('/static/img/gm.png') no-repeat left top;
		background-size: 100% 100%;
		position: relative;
		justify-content: space-between;
		margin-bottom: 32rpx;
	}
	.traderList{
		width: 100%;
		height: auto;
		margin-top: 48rpx;
	}
	.saleDetail{
		width: 100%;
		height: auto;
		padding-left: 40rpx;
		font-size: 26rpx;
		color: #222;
		line-height: 40rpx;
		margin-bottom: 30rpx;
	}
	.dealSale{
		width: 220rpx;
		height: 64rpx;
		justify-content: center;
		background: #DF3927;
		font-size: 30rpx;
		color: #fff;
		box-shadow: 0px 2rpx 4rpx 0px rgba(123,17,6,1);
		border-radius: 0px 32rpx 32rpx 0px;
		margin-bottom: 30rpx;
	}
	.playSale{
		width: 100%;
		height: auto;
		background-color: #fff;
		box-shadow: 0px 0px 12rpx 0px rgba(0,0,0,0.16);
		border-radius: 16rpx;
		padding: 40rpx 40rpx 40rpx 0;
	}
	.productList{
		width: 100%;
		height: auto;
		padding: 0 32rpx;
		margin-top: 20rpx;
	}
	.navItem.active{
		color: #DF3927;
		font-weight: 700;
	}
	.navItem{
		width: 50%;
		height: 88rpx;
		justify-content: center;
		font-size: 32rpx;
		color: #222;
		font-weight: 500;
	}
	.navBox{
		width: 100%;
		height: 88rpx;
		justify-content: space-between;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
	}
</style>