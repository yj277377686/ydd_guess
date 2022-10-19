<template>
	<view class="contents">
		<view class="aboutUs">
			 <view class="xyContent"><rich-text :nodes="xyContent"></rich-text></view>
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
				xyContent:''
			}
		},
		mixins: [],
		onShow() {
			this.getfwxy()
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad() {
			
		},
		methods: {
			getfwxy(){
				let that=this;
				post('Policy/service/',{}).then(res=>{
					let xyContent = res.data;
					this.xyContent=xyContent
				})
			},
	    }
	}
</script>

<style>
	.contents{
		width: 100%;
	}
	.aboutUs{
		font-size: 28rpx;
		color: #222222;
		line-height: 40rpx;
		padding: 30rpx 40rpx;
	}
</style>