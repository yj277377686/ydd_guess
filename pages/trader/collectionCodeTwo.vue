<template>
    <view class="collectionCodeTwo">
        <view class="li">
            <view class="title">微信收款码</view>
            <view class="img">
                <image src="/static/img/codeTwo.jpg"></image>
            </view>
        </view>
        <view class="li">
            <view class="title">支付宝收款码</view>
            <view class="img">
                <image src="/static/img/codeTwo.jpg"></image>
            </view>
        </view>
    </view>
</template>


<script>
export default {
    data() {
        return {

            value: ''
        };
    },
    onLoad() { },
    methods: {

    }
};
</script>



<style lang="scss">
.collectionCodeTwo {
    padding: 35rpx;

    .li {
        margin-top: 40rpx;

        .title {
            margin: 20rpx 0;
            font-weight: 700;
        }

        .img {
            width: 100%;
            height: 400rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>