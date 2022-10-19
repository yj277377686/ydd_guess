//music.js
const bgm = uni.createInnerAudioContext();
bgm.src = '/static/music/bgm.mp3'
bgm.loop = true;
var music={
		// 如果有更多声音的在下面接着创建
		play_didi(){
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = '/static/music/didi2.mp3';
			innerAudioContext.onPlay(() => {
		  		console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
				console.log('播放错误');
			  	console.log(res.errMsg);
			  	console.log(res.errCode);
			});
	    },
		//mute 表示是否是静音，，默认不静音
		playBgm({mute=false}){

			if (!bgm) return;
			if(mute){
				bgm.pause()
			}else{
				bgm.play()
			}
			
			bgm.onPause(()=>{
				console.log('暂停背景音乐');
			})
			bgm.onPlay(() => {
				console.log('开始播放音乐#######');
			})
			bgm.onError((res) => {
				console.log(res)
			})
		},
		play_djs(){
			console.log('26262');
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = '/static/music/djs.mp3';
			innerAudioContext.onPlay(() => {
		  		console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
				console.log('播放错误');
			  	console.log(res.errMsg);
			  	console.log(res.errCode);
			});
		},
}

module.exports = music;