<template>
    <view class="buyCoins">
        <!-- <image class="logo" src="/static/logo.png"></image> -->
        <!-- 竞猜部分 -->
        <view class="guessingCompetition">
            <view>
                <view class="title">我的竞猜币：93487</view>
                <view class="contentBox">
                    <view class="title">买币范围：</view>
                    <view class="inputBox">
                        <view class="input">
                            <input placeholder="交易币上限" v-model="currencyPurchaseRange.value" type="number" />
                        </view>
                        <view class="seizeSeat">~</view>
                        <view class="input">
                            <input placeholder="交易币上限" v-model="currencyPurchaseRange.valueTwo" type="number" />
                        </view>
                    </view>
                </view>
                <view class="contentBox">
                    <view class="title">联系方式：</view>
                    <view class="contactInformationInput">
                        <input placeholder="请输入您的联系方式" maxlength="11" v-model="currencyPurchaseRange.contactInformation"
                            type="number" />
                    </view>
                </view>
            </view>

            <view class="buttonBox">
                <view class="btn one">确认{{type==1?'售卖':'购买'}}</view>
                <view class="btn two">停止{{type==1?'售卖':'购买'}}</view>
            </view>
        </view>

        <!-- 售卖订单 -->
        <view class="salesOrder">
            <view class="title">{{type==1?'售卖':'购买'}}订单</view>
            <view class="eachBox">
                <view class="each">
                    <view class="head">
                        <view class="left">
                            <view class="img">
                                <image src="/static/img/processing.png"></image>
                            </view>
                            <view class="copywriting">进行中</view>
                        </view>
                        <view class="right" @click="on_see(1)">账单详情</view>
                    </view>
                    <view class="ul">
                        <view class="li">
                            <view class="zuo">售卖竞猜币</view>
                            <view class="you">4500</view>
                        </view>
                        <view class="li">
                            <view class="zuo">支付方式</view>
                            <view class="you">支付宝</view>
                        </view>
                        <view class="li">
                            <view class="zuo">交易账号</view>
                            <view class="you">18813148866</view>
                        </view>
                    </view>
                </view>
                <view class="each">
                    <view class="head">
                        <view class="left">
                            <view class="img">
                                <image src="/static/img/Completed.png"></image>
                            </view>
                            <view class="copywriting">已完成</view>
                        </view>
                        <view class="right" @click="on_see(2)">账单详情</view>
                    </view>
                    <view class="ul">
                        <view class="li">
                            <view class="zuo">售卖竞猜币</view>
                            <view class="you">4500</view>
                        </view>
                        <view class="li">
                            <view class="zuo">支付方式</view>
                            <view class="you">支付宝</view>
                        </view>
                        <view class="li">
                            <view class="zuo">交易账号</view>
                            <view class="you">18813148866</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
  
<script>
export default {
    data() {
        return {
            currencyPurchaseRange: {
                value: 100,
                valueTwo: 500,
                contactInformation: "13387403585"
            },
            type: null
        };
    },
    onLoad(data) {
        console.log(data, '接受的数据')
        if (data.type == 1) {
            uni.setNavigationBarTitle({
                title: '卖币',
                success: () => {
                },
                fail: () => {
                },
                complete: () => {
                },
            })
        } else {
            uni.setNavigationBarTitle({
                title: '买币',
                success: () => {
                },
                fail: () => {
                },
                complete: () => {
                },
            })
        }
        this.type = data.type

    },
    methods: {
        // 查看账单详情
        // 1 进行中 2 已完成
        on_see(index) {
            uni.navigateTo({
                url: '/pages/trader/billingDetails?type=' + index
            });
        }
    }
};
</script>
  
<style lang="scss">
.buyCoins {
    padding: 35rpx;
    font-size: 16px;

    .title {
        font-weight: 700;
        margin: 30rpx 0;
    }

    .contentBox {
        display: flex;
        align-items: center;
    }

    .inputBox {
        display: flex;
        align-items: center;
    }

    .input {
        width: 220rpx;
        height: 70rpx;

        input {
            width: 100%;
            height: 100%;
            border: 1px solid #cccccc;
            border-radius: 20rpx;
            text-align: center;
            font-weight: 700;
        }
    }

    .seizeSeat {
        margin: 0 18rpx;
    }

    .contactInformationInput {
        width: 500rpx;
        height: 70rpx;
        border: 1px solid #cccccc;
        border-radius: 20rpx;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
    }

    .buttonBox {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 40rpx;

        .btn {
            width: 80%;
            height: 80rpx;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 40rpx;
            font-size: 15px;
        }

        .one {
            background-color: #df3927;
            color: #fff;
            border-radius: 180rpx;
        }

        .two {
            background-color: #cccccc;
            color: #fff;
            border-radius: 180rpx;
        }
    }

    .salesOrder {
        margin-top: 80rpx;

        .eachBox {
            display: flex;
            flex-direction: column;

            .each:nth-child(1) {
                margin-top: 15rpx;
            }

            .each {
                box-shadow: 0px 0px 12px 0px rgba(17, 17, 17, 0.16);
                border-radius: 20rpx;
                margin-top: 40rpx;
                padding: 30rpx;

                .head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #EEEEEE;
                    padding-bottom: 30rpx;

                    .left {
                        display: flex;
                        align-items: center;

                        .img {
                            width: 40rpx;
                            height: 40rpx;

                            image {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .copywriting {
                            font-weight: 700;
                            margin-left: 16rpx;
                            font-size: 15px;
                        }
                    }

                    .right {
                        font-size: 14px;
                        color: red;
                    }
                }

                .ul {
                    font-size: 14px;

                    .li {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 22rpx;

                        .you {
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
}
</style>
  