
<template>
	<view class="contents">
		<view class="walletHead">
			<view class="room_head">
				<view class="room_Title ui-cell"><image src="/static/img/left.png" class='left_img' @tap="go_index"></image>我的钱包</view>
			</view>
		</view>
		<view class="walletBg">
			<view class="walletBox">
				<view class="walletTop ui-cell">
					<view class="leftTop">
						<view class="ltTl">竞猜币</view><view class="ltTlt">{{user_money}}</view>
					</view>
					<view class="gowithDrawal ui-cell" @tap="goBldetail">兑换<image src="/static/img/dh1.png"></image></view>
				</view>
				<view class="bqline"></view>
				<view class="walletNav ui-cell">
					<view class="yjBox">
						<view class="yjTitle ui-cell">佣金币</view>
						<view class="yjboxBt ui-cell">8000 <text>可兑8000竞猜币</text></view>
					</view>
					<view class="yjBox">
						<view class="yjTitle ui-cell">累计收益</view>
						<view class="yjboxBt ui-cell">890224 <text>竞猜币</text></view>
					</view>
				</view>
			</view>
			<view class="wenxinBox">
				<view class="wxTitle">温馨提示:</view>
				<view class="wxTitle">1、100竞猜币可兑换1元</view>
			    <view class="wxTitle">2、竞猜币提现请去交易区售卖即可到账</view>
			</view>
			<view class="dhDetail">
				<view class="dhtitle">兑换明细</view>
				<view class="dhlist">
					<view class="dhItem">
						<view class="itemTop ui-cell">
							<view class="itemTitle">720佣金币兑换720竞猜币</view>
							<view class="itemState">已到账</view>
						</view>
						<view class="dhTime">2021/08/20  14:13:09</view>
					</view>
					<view class="dhItem">
						<view class="itemTop ui-cell">
							<view class="itemTitle">720佣金币兑换720竞猜币</view>
							<view class="itemState">已到账</view>
						</view>
						<view class="dhTime">2021/08/20  14:13:09</view>
					</view>
					<view class="dhItem">
						<view class="itemTop ui-cell">
							<view class="itemTitle">720佣金币兑换720竞猜币</view>
							<view class="itemState">已到账</view>
						</view>
						<view class="dhTime">2021/08/20  14:13:09</view>
					</view>
				</view>
			</view>
		</view>
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
				user_money:0,
				xf_money:0,
				tx_money:0,
				sr_money:0
			}
		},
		mixins: [],
		onShow() {
			if(!uni.getStorageSync('tokens')){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			}else{
				this.getmyWallet()
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
			//余额转账
			gozz(){
				uni.navigateTo({
					url:'/pages/balanceZz/balanceZz'
				})	
			},
			//转账记录
			gozzRecord(){
				uni.navigateTo({
					url:'/pages/zzrecord/zzrecord'
				})
			},
			//提现记录
			goRecord(){
				uni.navigateTo({
					url:'/pages/withdrawalRecord/withdrawalRecord'
				})
			},
			goBldetail(){
				uni.navigateTo({
					url:'/pages/balanceDetail/balanceDetail'
				})
			},
			//我的钱包
			getmyWallet(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				post('user/myWallet',{},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.user_money=res.data.user_money;
						that.xf_money=res.data.total_order_amount;
						that.sr_money=res.data.total_withdraw_amount;
						that.tx_money=res.data.open_racharge
					}
				})
			},
			//去提现
			gowithDrawal(){
				uni.navigateTo({
					url:'/pages/withDrawal/withDrawal'
				})
			}
	    }
	}
</script>

<style>
	.dhTime{
		font-size: 24rpx;
		color: #999999;
	}
	.itemState{
		font-size: 26rpx;
		color: #DF3927;
		font-weight: 700;
	}
	.itemTitle{
		font-size: 30rpx;
		color: #333333;
		font-weight: 700;
	}
	.itemTop{
		width: 100%;
		justify-content: space-between;
		margin-bottom: 10rpx;
	}
	.dhItem:last-child{
		border-bottom: none;
	}
	.dhItem{
		width: 100%;
		height: auto;
		padding: 40rpx 50rpx;
		border-bottom: 1rpx solid #979797;
	}
	.dhlist{
		width: 100%;
		height: auto;
		padding-bottom: 50rpx;
	}
	.dhtitle{
		width: 100%;
		padding-left: 50rpx;
		font-size: 32rpx;
		color: #222222;
		font-weight: 700;
	}
	.wxTitle{
		margin-bottom: 8rpx;
	}
	.wenxinBox{
		width: 100%;
		padding: 0 60rpx;
		font: 26rpx;
		color: #888888;
		line-height: 40rpx;
		margin-bottom: 68rpx;
	}
	.yjboxBt text{
		font-size: 24rpx;
		margin-left: 10rpx;
		opacity: 0.8;
	}
	.yjboxBt{
		width: 100%;
		font-size: 36rpx;
		color: #fff;
	}
	.yjTitle{
		height: 30rpx;
		border-left: 10rpx solid #fff;
		padding-left: 20rpx;
		font-size: 28rpx;
		font-weight: 700;
		color: #fff;
		margin-bottom: 10rpx;
	}
	.yjBox{
		width: 50%;
		height: auto;
		padding-left: 30rpx;
	}
	.bqline{
		width: 560rpx;
		height: 1px;
		background-color: #fff;
		margin:0 auto;
		opacity: 0.4;
		margin-bottom: 20rpx;
	}
	.walletHead{
		width: 100%;
		height: 360rpx;
		background-color: #DF3927;
	}
	.setTl{
		font-size: 28rpx;
		color: #333333;
		font-weight: 700;
	}
	.setImgs{
		width: 80rpx;
		height: 80rpx;
		margin-bottom: 18rpx;
	}
	.settingItem{
		width: 25%;
		height: auto;
		flex-direction: column;
		justify-content: center;
	}
	.walletSeting{
		width: 100%;
		height: auto;
		justify-content: space-between;
	}
	.itemDl{
		font-size: 36rpx;
		color: #fff;
	}
	.itemTl{
		font-size: 28rpx;
		color: #fff;
		margin-bottom: 18rpx;
	}
	.shux{
		width: 4rpx;
		height: 40rpx;
		background-color: #fff;
	}
	.walletNav{
		width: 100%;
		height: auto;
		padding: 0 40rpx;
		justify-content: space-between
	}
	.gowithDrawal image{
		width: 36rpx;
		height: 36rpx;
		margin-left: 10rpx;
	}
	.gowithDrawal{
		font-size: 30rpx;
		color: #fff;
		justify-content: center;
		font-weight: 600;
	}
	.ltTlt{
		font-size: 70rpx;
		font-weight: 700;
		color: #fff;
	}
	.ltTl{
		font-size: 32rpx;
		color: #fff;
		margin-bottom: 20rpx;
	}
	.leftTop{
		flex: 1;
	}
	.walletTop{
		width: 100%;
		height: auto;
		padding: 40rpx 60rpx 0 80rpx;
		justify-content: space-between;
		margin-bottom: 16rpx;
	}
	.walletBox{
		width: 706rpx;
		height: 362rpx;
		border-radius: 20rpx;
		background: url('/static/img/qbbg.png') no-repeat left top;
		background-size: 100% 100%;
		position: absolute;
		left: 30rpx;
		top: -190rpx;
	}
	.walletBg{
		width: 100%;
		height: auto;
		border-radius: 20rpx;
		position: relative;
		margin-bottom: 50rpx;
		padding-top: 200rpx;
	}
	.contents{
		width: 100%;
		height: 100vh;
		background-color: #fff;
	}
</style>