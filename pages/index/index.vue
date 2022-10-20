<template>
	<view class="contents">
		<view class="rightBoxs">
			<!-- 普通弹窗 -->
			<uni-popup ref="popup" background-color="#fff" @change="change">
				<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
					<view class="userBoxs ui-cell">
						<view class="userImg"><image :src="users.avatar"></image></view>
						<view class="userMsg ui-cell">
							<view class="username" style="color: #222;font-weight: 700;">{{users.nickname}}</view>
							<view class="userLv" style="color: #222;opacity: 0.7;">普通会员</view>
						</view>
					</view>
					<view class="navList">
						<view class="navItem ui-cell"  v-for="(item,index) in navBox" :key="index" @tap="goDetail(item.url)">
							 <image :src="item.icon" class="navImg"></image>
							 <view class="navTitle">{{item.title}}</view>
							 <image src="/static/img/index_r.png" class="index_rimg"></image>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="topBoxs">
			<view class="userBox ui-cell" @tap="toggle('left')">
				<view class="userImg"><image :src="users.avatar"></image></view>
				<view class="userMsg ui-cell">
					<view class="username">{{users.nickname}}</view>
					<view class="userLv">普通会员</view>
				</view>
				<view class="userMoney">
					<view class="jcbMoney ui-cell"><text>竞猜币：</text>{{users.user_money}}</view>
					<view class="jcbMoney ui-cell"><text>佣金币：</text>{{users.earnings}}</view>
				</view>
			</view>
			<view class="swiperBox">
				<view class="sliderBox">
					<swiper class="swiper" circular  :autoplay="true"	:duration="500" interval='3000'>
						<swiper-item v-for="(item, index) in banners" :key="index" >
							<view class="swiper-item uni-bg-red"><image :src="item.image"></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="pageBody">
			<view class="msgBoxs ui-cell">
				<image src="../../static/img/msgt.png" class="msgt"></image>
				<view class="lines ui-cell">|</view>
				<view class="msgSlider">
					<swiper class="swipermsg" circular   :autoplay="true" vertical="true"	:duration="500" interval='1500'>
						<swiper-item v-for="(item, index) in noticeList" :key="index" >
							<view class="msgItem uni-bg-red ui-nowrap-1">{{item.title}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="answerBox">
			<view class="answerTitle">答题竞猜</view>
			<view class="roomItems room_one ui-cell" @tap="goroomList(1)">
				<view class="roomName color_hei">体验区</view>
				<view class="roomMsg color_hei ope">免费体验一次答题</view>
				<image src="/static/img/right_red.png" class="rightImg"></image>
			</view>
			<view class="roomItems room_two ui-cell" @tap="goroomList(2)">
				<view class="roomName color_hei">初级区</view>
				<view class="roomMsg color_hei ope">竞猜币：100-1000</view>
				<image src="/static/img/right_red.png" class="rightImg"></image>
			</view>
			<view class="roomItems room_three ui-cell" @tap="goroomList(3)">
				<view class="roomName color_bai">竞技区</view>
				<view class="roomMsg color_bai ope">竞猜币：1000-50000</view>
				<image src="/static/img/right_bai.png" class="rightImg"></image>
			</view>
			<view class="roomItems room_four ui-cell" @tap="goroomList(4)">
				<view class="roomName color_bai">高级区</view>
				<view class="roomMsg color_bai ope">竞猜币：50000-100000</view>
				<image src="/static/img/right_bai.png" class="rightImg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { post,get } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	export default {
		data () {
			return {
				type: 'center',
				users:[],
				banners:[],
				noticeList:[],
				navBox:[{title:'个人资料',icon:'/static/img/index_img1.png',url:'/pages/userInfo/userInfo'},
				        {title:'交易区',icon:'/static/img/index_img2.png',url:'/pages/xuangou/xuangou'},
						{title:'我的钱包',icon:'/static/img/index_img3.png',url:'/pages/myWallet/myWallet'},
						{title:'推广中心',icon:'/static/img/index_img4.png',url:'/pages/distribution/distribution'},
						{title:'反馈',icon:'/static/img/index_img5.png',url:'/pages/feedBack/feedBack'},
						{title:'交易员',icon:'/static/img/index_img6.png',url:'/pages/trader/index'},]
			}
		},
		mixins: [],
		onShow() {  
			if(uni.getStorageSync('tokens')){
				this.getuserInfo()
			}else{
				uni.showModal({
					title: '温馨提示',
					content: '需要登录才能体验哦~',
					showCancel:false,
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:'/pages/login/login'
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
			
		},
		onUnload() {
			 
		},
		methods: {
			goDetail(url){
				uni.navigateTo({
					url:url
				})
			},
			getuserInfo(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				get('index/lists',{},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.users=res.data.userinfo;
						that.banners=res.data.bannerlist;
						that.noticeList=res.data.noticelist
					}
				})
			},
			goroomList(index){
				if(index==1){
					uni.navigateTo({
						url:'/pages/room_ty/room_ty'
					})
				}else if(index==2){
					uni.navigateTo({
						url:'/pages/room_cj/room_cj'
					})
				}else if(index==3){
					uni.navigateTo({
						url:'/pages/room_jj/room_jj'
					})
				}else if(index==4){
					uni.navigateTo({
						url:'/pages/room_gj/room_gj'
					})
				}
			},
			change(e) {
				console.log('当前模式：' + e.type + ',状态：' + e.show);
			},
			toggle(type) {
				this.type = type
				// open 方法传入参数 等同在 uni-popup 组件上绑定 type属性
				this.$refs.popup.open(type)
			},
	    }
	}
</script>

<style>
	.index_rimg{
		width: 14rpx;
		height: 24rpx;
	}
	.navTitle{
		flex: 1;
		font-size: 28rpx;
		color: #222;
	}
	.navImg{
		width: 42rpx;
		height: 42rpx;
		margin-right: 30rpx;
	}
	.navItem{
		width: 100%;
		height: auto;
		padding: 40rpx 0;
		justify-content: space-between;
	}
	.userBoxs{
		width: 100%;
		padding-bottom: 30rpx;
		border-bottom: 1px solid #eee;
	}
	.popup-content{
		width: 580rpx;
		height: auto;
		padding: 60rpx 40rpx 0 40rpx;
	}
	.answerTitle{
		width: 100%;
		height: auto;
		padding: 40rpx 0;
		font-size: 32rpx;
		color: #222222;
		font-weight: 700;
	}
	.answerBox{
		width: 100%;
		height: auto;
		padding: 0 32rpx;
	}
	.lines{
		color: #aaa;
		height: 30rpx;
	}
	.msgItem{
		font-size: 28rpx;
		color: #85819B;
	}
	.swipermsg{
		height: 60rpx;
		line-height: 68rpx;
	}
	.msgSlider{
		flex: 1;
		height: 60rpx;
		line-height: 68rpx;
		margin:0 20rpx;
	}
	.msgt{
		width: 90rpx;
		height: 30rpx;
		margin-right: 30rpx;
		padding-top: 6rpx;
	}
	.msgBoxs{
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		justify-content: space-between;
		border-bottom: 1px solid #eee;
	}
	.pageBody{
		width: 100%;
		height: auto;
		padding:0 48rpx;
		margin-top: 100rpx;
	}
	.swiper{
		border-radius: 20rpx !important;
		transform: translateY(0);
		overflow: hidden;
		height: 380rpx;
	}
	.swiper-item image{
		border-radius: 20rpx;
	}
	.swiper-item{
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.sliderBox{
		width: 100%;
		height: 380rpx;
		border-radius: 20rpx;
		overflow: hidden;
	}
	.swiperBox{
		width: 100%;
		height: 380rpx;
		padding: 0 32rpx;
		border-radius: 20rpx;
		overflow: hidden;
		position: absolute;
		left: 0;
		bottom: -80rpx;
	}
	.jcbMoney text{
		width: 130rpx;
		text-align: right;
	}
	.jcbMoney{
		font-size: 28rpx;
		color: #fff;
	}
	.userLv{
		font-size: 26rpx;
		color: #fff;
		opacity: 0.7;
	}
	.username{
		font-size: 30rpx;
		color: #fff;
	}
	.userMsg{
		flex: 1;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
	}
	.userImg image{
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
	.userImg{
		width: 90rpx;
		height: 90rpx;
		margin-right: 30rpx;
		border-radius: 100%;
	}
	.userBox{
		width: 100%;
		height: auto;
		padding: 60rpx 40rpx 0 40rpx;
		justify-content: space-between;
	}
	.topBoxs{
		width: 100%;
		height: 540rpx;
		background: url('/static/img/indextop.png') no-repeat left top;
		background-size: 100% 100%;
		position: relative;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
	}
</style>