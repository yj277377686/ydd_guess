<template>
    <view class="contents">
        <view class="unkonwBox ui-cell" v-if="answerflag">
            <view class="unkonwItem">
                <!-- <view class="jiesuanBox ui-cell" v-if="jsflag">
                    <view class="jsBox">
                        <view class="jsTitle" v-if="jcresult.is_right==1">恭喜回答正确</view>
                        <view class="jsTitle" style="color: #e4393c;" v-if="jcresult.is_right==2">很遗憾回答错误</view>
                    </view>
                </view> -->
                <view class="itemBox">
                    <view class="yanage ui-cell" :style="{backgroundImage: 'url(' + (backgroundMe) + ')'}">选{{what}}
                    </view>
                    <view class="boxTop">当前累计押币数据：{{yadata}}</view>
                    <!-- <view class="yinlvBox ui-cell">
                        <view class="yvTitle">赢率</view>
                        <view class="progress-box"><progress :percent="pgList" stroke-width="10" border-radius='10'
                                activeColor='#DF3927' backgroundColor='#cccccc' /></view>
                    </view> -->
                    <view class="yaBox ui-cell">
                        <view class="yatitle">押</view>
                        <view class="yanbm ui-cell"><input placeholder-style='color:#fff' style="color:#fff"
                                type="number" :value="yNum" @input="changeNum" placeholder="请输入竞猜数量"></view>
                    </view>
                    <!-- <view class="yjyNbm">预赢得{{yjyNum}}体验币</view> -->
                    <view class="kjyNbm ui-cell">
                        <view class="kjyItem ui-cell" @tap="checkNum(1)">一百</view>
                        <view class="kjyItem ui-cell" @tap="checkNum(2)">五百</view>
                        <view class="kjyItem ui-cell" @tap="checkNum(3)">一千</view>
                        <view class="kjyItem ui-cell" @tap="checkNum(4)">五千</view>
                        <view class="kjyItem ui-cell" @tap="checkNum(5)">x</view>
                    </view>
                    <view class="jcbyl">我的体验币：{{userData.tyb}}</view>
                    <view class="sureBtn ui-cell" @tap="sureBtn">确定</view>
                    <!-- <view class="jcdjs">竞猜倒计时：{{questionData.end_time}}</view> -->
                </view>
                <view class="clImg" @tap="closeyz">
                    <image src="/static/img/cl.png"></image>
                </view>
            </view>
        </view>
        <view class="room_head">
            <view class="room_Title ui-cell">
                <image src="/static/img/left.png" class='left_img' @tap="exitRoom"></image>答题
            </view>
        </view>
        <view class="ggImg">
            <image src="/static/img/ggz.jpg"></image>
        </view>
        <view class="answerBox">
            <view class="questionBox">
                <view class="room_Nbm ui-cell"><text>{{qname}}</text>房间号：{{questionData.room_name}}</view>
                题目：{{questionData.title}}
            </view>
        </view>
        <view class="answerList">
            <view class="answerItem ui-cell" v-if="questionData.ta">
                <view class="options ui-cell optionA" @tap="answerQuestion(1)"><text>选</text><text>A</text></view>
                <view class="solutions">{{questionData.ta}}</view>
            </view>
            <view class="answerItem ui-cell" v-if="questionData.tb">
                <view class="options ui-cell optionB" @tap="answerQuestion(2)"><text>选</text><text>B</text></view>
                <view class="solutions">{{questionData.tb}}</view>
            </view>
            <view class="answerItem ui-cell" v-if="questionData.tc">
                <view class="options ui-cell optionC" @tap="answerQuestion(3)"><text>选</text><text>C</text></view>
                <view class="solutions">{{questionData.tc}}</view>
            </view>
            <view class="answerItem ui-cell" v-if="questionData.td">
                <view class="options ui-cell optionD" @tap="answerQuestion(4)"><text>选</text><text>D</text></view>
                <view class="solutions">{{questionData.td}}</view>
            </view>
        </view>
        <view class="explainBox">
            <view class="explainTitle">温馨提示</view>
            <view class="explain">1、一个账户每局只能押注一个答案。</view>
            <view class="explain">2、每局最低押注不低于1000个币，也就是10元，不设上限。</view>
            <view class="explain">3、押注多少记多少流水。</view>
            <view class="explain">4、推广者结余处必须保持50000个币（500元）才能获得相应的红包奖励，这50000个币为冻结币。</view>
        </view>

        <!-- 答对答错弹窗处理 -->
        <view v-if="rightAndWrongType" class="rightAndWrongTypeBox">
            <view class="rightAndWrongType">

                <view class="boxValue" v-if="wrongType==1">
                    <view class="imgValue">
                        <image src="/static/img/succes.png"></image>
                    </view>
                    <view class="titleValue">恭喜答对</view>
                </view>
                <view class="boxValue" v-if="wrongType==2">
                    <view class="imgValue">
                        <image src="/static/img/fail.png"></image>
                    </view>
                    <view class="titleValue">很遗憾，失败了</view>
                </view>
            </view>
            <view class="clImg" @click="on_cancel">
                <image src="/static/img/cl.png"></image>
            </view>
        </view>



        <!-- 答对答错弹窗处理 -->
        <view v-if="endType" class="rightAndWrongTypeBoxTwo">
            <view class="imgValue">
                <image src="/static/img/endType.png"></image>
            </view>
            <view class="titleValue" @click="on_endType">体验房答题已结束</view>
        </view>
    </view>
</template>

<script>
import { mapState } from 'vuex';
import { post, get } from '../../utils/http.js';
import filtersMixin from '../../common/mixins/filters.js';
import Vue from '../../utils/vue.min.js';
// import { countDownFun } from './times.js';
export default {
    data() {
        return {
            endType: false,
            wrongType: 1,
            rightAndWrongType: false,
            rid: '',
            qname: '',
            status: 0,
            answer: '',
            questionData: {

            },
            backgroundMe: '/static/img/Aimg.png',
            answerflag: false,
            aflag: false,
            dtflag: false,
            dyflag: false,
            djs: 30,
            jsflag: false,
            sy_time: 0,
            otherData: [],
            yjyNum: 0,
            yNum: 0,
            pgList: [],
            userData: [],
            jcresult: [],
            what: 'A',
            timer: '',
            yadata: 0
        }
    },
    mixins: [],
    onShow() {

    },
    created() {
    },
    //下拉刷新
    onPullDownRefresh() {
    },
    onLoad(options) {
        if (options.rid) {
            this.rid = options.rid;
            this.getRoomDetail(options.rid, options.status);
        }
    },
    onHide: function () { // 后台运行清除定时器
        // clearInterval(this.timer);
        // this.timer = null;
    },
    onUnload() {
        // clearInterval(this.timer);
        // this.timer = null;
    },
    methods: {
        //关闭押注
        closeyz() {
            this.answerflag = false;
        },
        //获取赢率等数据
        getuserFee(tid, index) {
            let that = this;
            // let token = uni.getStorageSync('tokens');
            let token = '439e69e4cc04111d6e709c89dca665ca'
            get('Eroom/getuserfee', { id: tid }, token).then(res => {
                console.log(res);
                if (res.code == 1) {
                    that.userData = res.data;
                    that.pgList = res.data.fee;
                }
            })
        },
        checkNum(index) {
            if (index == 1) {
                this.yNum = 100;
                this.yjyNum = 100 + parseInt(parseFloat(100 * this.userData.fee) / 100);
            } else if (index == 2) {
                this.yNum = 500;
                this.yjyNum = 500 + parseInt(parseFloat(500 * this.userData.fee) / 100);
            } else if (index == 3) {
                this.yNum = 1000;
                this.yjyNum = 1000 + parseInt(parseFloat(1000 * this.userData.fee) / 100);
            } else if (index == 4) {
                this.yNum = 5000;
                this.yjyNum = 5000 + parseInt(parseFloat(5000 * this.userData.fee) / 100);
            } else if (index == 5) {
                this.yNum = '';
                this.yjyNum = 0;
            }
        },
        changeNum(e) {
            this.yNum = e.target.value;
            console.log(parseInt(parseFloat(e.target.value * this.userData.fee) / 100));
            this.yjyNum = parseFloat(e.target.value) + parseInt(parseFloat(e.target.value * this.userData.fee) / 100);
        },
        changgeTime(tid, indexs) {
            let that = this;
            let questionData = that.questionData;
            var timer = setInterval(() => {
                questionData.down_time--;
                this.countdownVal = questionData.down_time;
                that.$set(questionData, 'end_time', countDownFun(questionData.down_time));
                that.sy_time = questionData.down_time;
                that.getotherData(tid, indexs);
                that.getuserFee(tid, indexs);
                console.log(questionData.down_time)
                if (questionData.down_time == 0) {
                    that.answerflag = true;
                    that.aflag = false;
                    that.jiesuan(indexs);
                }
                if (questionData.down_time == -30) {
                    that.getRoomDetail(that.rid, that.status)
                }
            }, 1000);
            that.timer = timer;
        },
        //结算
        jiesuan(indexs) {
            let that = this;
            let token = uni.getStorageSync('tokens');
            if (that.dtflag) {
                if (indexs == 1) {
                    post('Aroom/settle', { id: that.tid }, token).then(res => {
                        console.log(res);
                        if (res.code == 1) {
                            that.jiesuanJg(indexs);
                        }
                    })
                } else if (index == 2) {
                    post('Broom/settle', { id: that.tid }, token).then(res => {
                        console.log(res);
                        if (res.code == 1) {
                            that.jiesuanJg(indexs);
                        }
                    })
                } else {
                    post('Croom/settle', { id: that.tid }, token).then(res => {
                        console.log(res);
                        if (res.code == 1) {
                            that.jiesuanJg(indexs);
                        }
                    })
                }
            } else {
                that.mdtdjs();
            }
        },
        //结算结果
        jiesuanJg(indexs) {
            let that = this;
            let token = uni.getStorageSync('tokens');
            if (indexs == 1) {
                get('Aroom/getsettleresult', { id: that.tid }, token).then(res => {
                    console.log(res);
                    that.jsflag = true;
                    if (res.code == 1) {
                        that.jcresult = res.data;
                        var i = that.djs;
                        var intervalb;
                        intervalb = setInterval(function () {
                            i--;
                            that.djs = i;
                            console.log(i);
                            if (i === 0) {
                                that.djs = 30;
                                clearInterval(intervalb);
                                intervalb = null;
                                that.answerflag = false;
                                that.jsflag = false;
                                that.getRoomDetail(that.rid, that.status);
                            }
                        }, 1000);
                    }
                })
            } else if (indexs == 2) {
                get('Broom/getsettleresult', { id: that.tid }, token).then(res => {
                    console.log(res);
                    that.jsflag = true;
                    if (res.code == 1) {
                        that.jcresult = res.data;
                        var i = that.djs;
                        var intervalb;
                        intervalb = setInterval(function () {
                            i--;
                            that.djs = i;
                            console.log(i);
                            if (i === 0) {
                                that.djs = 30;
                                clearInterval(intervalb);
                                intervalb = null;
                                that.answerflag = false;
                                that.jsflag = false;
                                that.getRoomDetail(that.rid, that.status);
                            }
                        }, 1000);
                    }
                })
            } else {
                get('Croom/getsettleresult', { id: that.tid }, token).then(res => {
                    console.log(res);
                    that.jsflag = true;
                    if (res.code == 1) {
                        that.jcresult = res.data;
                        var i = that.djs;
                        var intervalb;
                        intervalb = setInterval(function () {
                            i--;
                            that.djs = i;
                            console.log(i);
                            if (i === 0) {
                                that.djs = 30;
                                clearInterval(intervalb);
                                intervalb = null;
                                that.answerflag = false;
                                that.jsflag = false;
                                that.getRoomDetail(that.rid, that.status);
                            }
                        }, 1000);
                    }
                })
            }
        },
        //没答题倒计时
        mdtdjs() {
            let that = this;
            var i = that.djs;
            var interval;
            interval = setInterval(function () {
                i--;
                that.djs = i;
                console.log(i);
                if (i === 0) {
                    that.djs = 30;
                    that.answerflag = false;
                    clearInterval(interval);
                    interval = null;
                    that.getRoomDetail(that.rid, that.status);
                }
            }, 1000);
        },
        //获取其他数据
        getotherData(tid, index) {
            let that = this;
            // let token = uni.getStorageSync('tokens');
            let token = '439e69e4cc04111d6e709c89dca665ca'

            get('Eroom/refurbish_room_datail', { id: tid }, token).then(res => {
                console.log(res);
                if (res.code == 1) {
                    that.otherData = res.data;
                }
            })
        },
        //点击答案
        answerQuestion(index) {

            if (index == 1) {
                this.backgroundMe = '/static/img/xa1.png';
                this.yadata = this.otherData.ya;
                this.what = 'A';
                this.answer = 'ta';
            } else if (index == 2) {
                this.backgroundMe = '/static/img/xb1.png';
                this.yadata = this.otherData.yb;
                this.what = 'B';
                this.answer = 'tb';
            } else if (index == 3) {
                this.backgroundMe = '/static/img/xc1.png';
                this.yadata = this.otherData.yc;
                this.what = 'C';
                this.answer = 'tc';
            } else {
                this.backgroundMe = '/static/img/xd1.png';
                this.yadata = this.otherData.yd;
                this.what = 'D';
                this.answer = 'td';
            }
            this.aflag = true;
            this.answerflag = true;
        },
        //退出房间
        exitRoom() {
            // let token = uni.getStorageSync('tokens');
            let that = this;
            let token = '439e69e4cc04111d6e709c89dca665ca'
            let rid = that.rid;
            get('Eroom/exit_room', { room_id: rid }, token).then(res => {
                console.log(res);
                if (res.code == 1) {
                    uni.navigateTo({
                        url: '/pages/room_ty/room_ty'
                    })
                }
            })
        },
        on_endType() {
            let that = this;
            let token = '439e69e4cc04111d6e709c89dca665ca'
            let rid = that.rid;
            get('Eroom/exit_room', { room_id: rid }, token).then(res => {
                console.log(res);
                if (res.code == 1) {
                    uni.navigateTo({
                        url: '/pages/room_ty/room_ty'
                    })
                }
            })
        },
        //房间详情
        getRoomDetail(rid, status) {
            let that = this;
            // let token = uni.getStorageSync('tokens');
            let token = '439e69e4cc04111d6e709c89dca665ca'
            uni.showLoading({
                title: '加载中...'
            })
            get('Eroom/enter_room', { room_id: rid }, token).then(res => {
                console.log(res);

                if (res.code == 1) {
                    //     clearInterval(that.timer);
                    //     res.data.end_time = '';
                    if (res.data.title) {
                        that.tid = res.data.id;
                        let questionData = res;
                        that.$set(questionData, 'data', res.data);
                        that.questionData = questionData.data;
                        //     that.changgeTime(res.data.id, 1);
                        that.getotherData(res.data.id, 1);
                        that.getuserFee(res.data.id, 1);
                    } else {
                        this.endType = true
                    }

                    uni.hideLoading()
                }
            })
        },
        // 确认押注
        sureBtn() {
            let that = this;
            // let token = uni.getStorageSync('tokens');
            let token = '439e69e4cc04111d6e709c89dca665ca'
            if (!that.yNum) {
                uni.showToast({
                    icon: 'none',
                    title: '请输入或选择体验币数量'
                })
            } else if (parseFloat(that.yNum) > parseFloat(that.userData.tyb)) {
                uni.showToast({
                    icon: 'none',
                    title: '体验币余额不足'
                })
            } else {
                console.log(that.questionData)
                console.log(that.answer)

                post('Eroom/room_answer', { room_id: that.questionData.room_id, tyb: that.yNum, answer: that.answer, q_id: that.questionData.q_id, id: that.questionData.id }, token).then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        that.aflag = false;
                        that.answerflag = false;
                        // uni.showToast({
                        //     icon: 'none',
                        //     title: res.msg
                        // })
                        // 1是正确  0是错误

                        setTimeout(() => {
                            this.rightAndWrongType = true
                            if (res.data.right == 0) {
                                this.wrongType = 2;
                            } else {
                                this.wrongType = 1;
                            }
                        }, 500)

                    } else {
                        that.aflag = false;
                        uni.showToast({
                            icon: 'none',
                            title: res.msg
                        })
                    }
                })
            }
        },
        // 刷新下一道题目
        on_cancel() {
            this.rightAndWrongType = false
            this.getRoomDetail(this.rid, this.status)
        }
    }
}
</script>

<style lang="scss">
.yanage {
    width: 160rpx;
    height: 88rpx;
    justify-content: center;
    color: #fff;
    font-size: 40rpx;
    font-weight: 700;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: -44rpx;
    left: 230rpx;
}

.jsTitle {
    width: 100%;
    text-align: center;
    font-size: 68rpx;
    font-weight: 600;
    color: chartreuse;
    margin-bottom: 50rpx;
}

.jsBox {
    width: 600rpx;
    height: auto;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
}

.jiesuanBox {
    width: 100%;
    height: auto;
    flex-direction: column;
    justify-content: center;
}

.loadImg {
    width: 200rpx;
    height: 200rpx;
    margin: 0 auto;
}

.tttss {
    font-size: 28rpx;
    color: #fff;
    margin-top: 20rpx;
}

.clImg {
    width: 60rpx;
    height: 60rpx;
    margin: 0 auto;
}

.jcdjs {
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #222;
}

.sureBtn {
    width: 100%;
    height: 80rpx;
    justify-content: center;
    font-size: 32rpx;
    color: #fff;
    border-radius: 16rpx;
    margin-bottom: 30rpx;
    background: url('/static/img/zd.png') no-repeat left top;
    background-size: 100% 100%;
}

.jcbyl {
    width: 100%;
    text-align: center;
    font-size: 26rpx;
    color: #DF3927;
    margin-bottom: 30rpx;
}

.kjyItem {
    width: 96rpx;
    height: 80rpx;
    justify-content: center;
    font-size: 32rpx;
    color: #00012E;
    background-color: #E1B200;
    border: 2px solid #E4CA67;
    border-radius: 16rpx;
    font-weight: 600;
}

.kjyNbm {
    width: 100%;
    height: auto;
    justify-content: space-between;
    margin: 30rpx 0;
}

.yjyNbm {
    width: 100%;
    height: auto;
    font-size: 26rpx;
    color: #222;
    opacity: 0.8;
    text-align: center;
    margin: 20rpx 0;
}

.yanbm input {
    width: 320rpx;
    height: 60rpx;
    font-size: 32rpx;
    color: #fff;
    text-align: center;
}

.yanbm {
    width: 320rpx;
    height: 72rpx;
    border-radius: 36rpx;
    background-color: #DF3927;
}

.yatitle {
    font-size: 32rpx;
    color: #222;
    margin-right: 20rpx;
}

.yaBox {
    width: 100%;
    justify-content: center;
}

.progress-box {
    width: 422rpx;
}

.yvTitle {
    font-size: 28rpx;
    color: #222;
    font-weight: 400;
    margin-right: 20rpx;
}

.yinlvBox {
    width: 100%;
    height: auto;
    justify-content: center;
    margin-bottom: 30rpx;
}

.boxTop {
    width: 100%;
    text-align: center;
    font-size: 28rpx;
    color: #222;
    margin-bottom: 30rpx;
    font-weight: 500;
}

.rightAndWrongTypeBoxTwo {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .imgValue {
        width: 80%;
        height: 55%;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .titleValue {
        position: absolute;
        top: 68%;
        color: #7F091C;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        font-weight: 700;
        border-radius: 180rpx;
        height: 90rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid red;
        background: linear-gradient(to bottom, #FEEF55, #FDAA03)
    }
}

.rightAndWrongTypeBox {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;

    .rightAndWrongType {
        width: 620rpx;
        height: 450rpx;
        padding: 60rpx 30rpx 30rpx 30rpx;
        margin-bottom: 30rpx;
        background-color: #fff;
        border-radius: 16rpx;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .boxValue {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .imgValue {
            width: 200rpx;
            height: 200rpx;

            image {
                width: 100%;
                height: 100%;
            }
        }

        .titleValue {
            font-weight: 700;
            font-size: 20px;
            margin-top: 30rpx;
        }
    }


}



.itemBox {
    width: 620rpx;
    height: 600rpx;
    padding: 60rpx 30rpx 30rpx 30rpx;
    margin-bottom: 30rpx;
    background-color: #fff;
    border-radius: 16rpx;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.unkonwBox {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.explain {
    font-size: 26rpx;
    color: #222222;
    opacity: 0.8;
    margin-bottom: 10rpx;
}

.explainTitle {
    width: 100%;
    padding-top: 40rpx;
    padding-bottom: 20rpx;
    border-top: 1px solid #aaa;
    font-size: 30rpx;
    color: #222222;
    font-weight: 600;
}

.explainBox {
    width: 100%;
    height: auto;
    padding: 0 32rpx 100rpx 32rpx;
}

.solutions {
    flex: 1;
    height: 160rpx;
    border-radius: 16rpx;
    background-color: #fff;
    padding: 30rpx;
    font-size: 28rpx;
    color: #222;
    font-weight: 600;
}

.optionA {
    background: url('/static/img/xa.png') no-repeat left top;
}

.optionB {
    background: url('/static/img/xb.png') no-repeat left top;
}

.optionC {
    background: url('/static/img/xc.png') no-repeat left top;
}

.optionD {
    background: url('/static/img/xd.png') no-repeat left top;
}

.options {
    width: 88rpx;
    height: 160rpx;
    flex-direction: column;
    justify-content: center;
    font-size: 38rpx;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 60rpx;
    text-shadow: 0 2px 2px rgba(0, 0, 0, 0.50);
    font-weight: 600;
    background-size: 100% 100%;
    margin-right: 30rpx;
}

.answerItem {
    width: 100%;
    height: auto;
    justify-content: space-between;
    margin-bottom: 48rpx;
}

.answerList {
    width: 100%;
    height: auto;
    padding: 0rpx 32rpx 0rpx 32rpx;
}

.room_Nbm text {
    font-size: 38rpx;
    margin-right: 30rpx;
}

.room_Nbm {
    width: 460rpx;
    height: 100rpx;
    font-size: 32rpx;
    color: #fff;
    font-weight: 600;
    background: url('/static/img/fjh.png') no-repeat left top;
    background-size: 100% 100%;
    position: absolute;
    left: -14rpx;
    top: -36rpx;
    padding: 0 0 20rpx 40rpx;
}

.questionBox {
    width: 672rpx;
    min-height: 200rpx;
    height: auto;
    background: url('/static/img/tm.png') no-repeat left top;
    background-size: 100% 100%;
    position: relative;
    padding: 80rpx 40rpx 40rpx 48rpx;
    font-size: 32rpx;
    color: #222;
    font-weight: 600;
    line-height: 50rpx;
}

.answerBox {
    width: 100%;
    height: auto;
    padding: 90rpx 32rpx 56rpx 58rpx;
}

.ggImg {
    width: 100%;
    height: 424rpx;
}

.contents {
    width: 100%;
    min-height: 100vh;
    background-color: #FFE0DD;
}
</style>