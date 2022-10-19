
<template>
	<view class="contents">
		 <view class="zxcontent">
			 <rich-text :nodes="contents"></rich-text>
		 </view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { get } from '../../utils/http.js';
	import filtersMixin from '../../common/mixins/filters.js';
	import Vue from '../../utils/vue.min.js';
	export default {
		data () {
			return {
				contents:''
			}
		},
		mixins: [],
		onShow() {  
			this.getmsgData();
		},
		created () {
		},
		//下拉刷新
		onPullDownRefresh() {
		},
		onLoad(options) {
		},
		methods: {
			getmsgData(){
				let that=this;
				get('Policy/afterSale',{}).then(res=>{
					console.log(res);
					if(res.code==1){
						that.contents=res.data.replace(/\<img/gi, '<img style="max-width:100%!important;height:auto"');
					}else{
						uni.showToast({
							icon:'error',
							title:res.msg
						})
					}
				})
			}
	    }
	}
</script>

<style>
	.contents{
		width: 100%;
		min-height: 100vh;
		padding: 40rpx;
	}
</style>