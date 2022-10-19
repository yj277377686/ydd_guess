<template>
	<view class="contents">
		<view class="guessList">
			<view class="guessItem" v-for="(item , index) in guessData" :key="index">
				<view class="itemtitle">竞猜题目: {{item.title}}</view>
				<view class="itemtitle" v-if="item.answer=='ta'">我竞猜的答案: A</view>
				<view class="itemtitle" v-if="item.answer=='tb'">我竞猜的答案: B</view>
				<view class="itemtitle" v-if="item.answer=='tc'">我竞猜的答案: C</view>
				<view class="itemtitle" v-if="item.answer=='td'">我竞猜的答案: D</view>
				<view class="itemtitle" style="color: #23C77E;" v-if="item.is_right==1">恭喜回答正确</view>
				<view class="itemtitle" style="color: #e4393c;" v-if="item.is_right==2">很遗憾回答错误</view>
				<view class="itemtitle">我押注的竞猜币: {{item.b}}</view>
				<view class="itemtitle">我获得的竞猜币: {{item.get_b}}</view>
				<view class="itemtitle"  v-if="item.is_settle==0">结算状态 ：未结算</view>
				<view class="itemtitle"  v-if="item.is_settle==1">结算状态 ：已结算</view>
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
				guessData:[]
			}
		},
		mixins: [],
		onShow() {  
			this.getmyguess();
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
			getmyguess(){
				let that=this;
				let token=uni.getStorageSync('tokens');
				get('user/getanswerlog',{page:1,limit:100000},token).then(res=>{
					console.log(res);
					if(res.code==1){
						that.guessData=res.data;
					}
				})
			}
	    }
	}
</script>

<style>
	.itemtitle{
		font-size: 28rpx;
		line-height: 40rpx;
	}
	.guessItem{
		width: 100%;
		height: auto;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 30rpx;
	}
	.guessList{
		width: 100%;
		height: auto;
		padding: 30rpx;
	}
	.contents{
		width: 100%;
		min-height: 100vh;
		background-color:#00012E;
	}
</style>