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
			this.getyszc();
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad() {
			
		},
		methods: {
			getyszc(){
				let that=this;
				post('Policy/aboutus/',{}).then(res=>{
					console.log(res);
					let xyContent = res.data.replace(/\<img/gi, '<img style="max-width:100%!important;height:auto"');;
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