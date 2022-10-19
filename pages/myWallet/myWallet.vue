
<template>
	<view class="contents">
		<view class="walletBg">
			<view class="walletBox">
				<view class="walletTop ui-cell">
					<view class="leftTop">
						<view class="ltTl">账户余额(元)</view><view class="ltTlt">{{user_money}}</view>
					</view>
					<view class="gowithDrawal ui-cell" @tap="goBldetail">明细</view>
				</view>
				<view class="walletNav ui-cell">
					<view class="walletItem"><view class="itemTl">累计收入(元)</view><view class="itemDl">{{sr_money}}</view></view>
					<view class="shux"></view>
					<view class="walletItem"><view class="itemTl">累计提现(元)</view><view class="itemDl">{{tx_money}}</view></view>
					<view class="shux"></view>
					<view class="walletItem"><view class="itemTl">累计消费(元)</view><view class="itemDl">{{xf_money}}</view></view>
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
	.gowithDrawal{
		width: 180rpx;
		height: 68rpx;
		border-radius: 34rpx;
		background-color: #fff;
		font-size: 30rpx;
		color: #00012E;
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
		padding: 40rpx 40rpx 0 40rpx;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}
	.walletBox{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
		background: url('/static/img/myye.png') no-repeat left top;
		background-size: 100% 100%;
	}
	.walletBg{
		width: 100%;
		height: 362rpx;
		background: linear-gradient(90deg, #00012E 0%, #002C76 100%);
		box-shadow: 0px 20px 30px 1px rgba(64,233,158,0.16);
		border-radius: 20rpx;
		position: relative;
		margin-bottom: 50rpx;
	}
	.contents{
		width: 100%;
		height: 100vh;
		background-color: #fff;
		padding: 30rpx;
	}
</style>