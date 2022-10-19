export function countDownFun(time) {
	//当前时间戳
	let playTime,
		day = 0,
		hour = 0,
		minute = 0,
		second = 0; //时间默认值
	if (time > 0) {
		second = time; //未来时间距离现在的秒数
		day = Math.floor(second / 86400); //整数部分代表的是天；一天有24*60*60=86400秒 ；
		second = second % 86400; //余数代表剩下的秒数；
		hour = Math.floor(second / 3600); //整数部分代表小时；
		second %= 3600; //余数代表 剩下的秒数；
		minute = Math.floor(second / 60);
		second %= 60;
	}
	//不足两位时添加0
	if (day <= 9) day = '0' + day;
	if (hour <= 9) hour = '0' + hour;
	if (minute <= 9) minute = '0' + minute;
	if (second <= 9) second = '0' + second;

	if (day > 0) {
		playTime = `${day}天${hour}小时${minute}分钟${second}秒`;
	}
	if (day <= 0 && hour > 0) {
		playTime = `${hour}小时${minute}分${second}秒`;
	}
	if (day <= 0 && hour <= 0) {
		playTime = `${minute}:${second}`;
	}
	return playTime
}
