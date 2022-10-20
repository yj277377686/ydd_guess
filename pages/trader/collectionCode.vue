<template>
    <view class="collectionCode">
        <view class="collectionCodeBox">
            <view class="content">
                <view class="title">支付宝收款码</view>
                <view class="codeValue">
                    <view class="money">￥1.00</view>
                    <view class="img">
                        <image src="/static/img/code.jpg"></image>
                    </view>
                    <view class="name">支付宝昵称 （**名）</view>

                    <view class="status">订单提交成功，等待用户扫描...</view>
                </view>
            </view>

            <view class="footer">
                <view class="btn">支付完成</view>
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
.collectionCode {
    background-color: #DF3927;

    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;

    .collectionCodeBox {
        padding: 35rpx 25rpx;

    }

    .content {
        background-color: #fff;
        border-radius: 10rpx;

        .title {
            height: 80rpx;
            background-color: #F5F5F5;
            font-size: 14px;
            display: flex;
            align-items: center;
            padding-left: 25rpx;
            color: #DF3927;
            border-radius: 10rpx;

        }

        .codeValue {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .money {
                font-weight: 700;
                margin-top: 60rpx;
                font-size: 24px;
            }

            .img {
                width: 250rpx;
                height: 250rpx;
                margin-top: 30rpx;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .name {
                margin: 30rpx 0;
            }

            .status {
                padding: 40rpx 0 90rpx 0;
                border-top: 1px solid #DDDDDD;
            }
        }
    }

    .footer {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 100rpx;

        .btn {
            width: 94%;
            height: 90rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff;
            color: #DF3927;
            border-radius: 180rpx;
            font-weight: 700;
        }
    }
}
</style>