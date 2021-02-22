/**
 * 验证邮箱格式
 */
export function checkEmail(value) {
	let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
	return reg.test(value);
}
/**
 * 验证密码格式
 */
export function checkPass(value) {
	let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
	return reg.test(value);
}

/**
 * 验证姓名
 */
export function checkName(value) {
	let reg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/;
	return reg.test(value);
}
/**
 * 去除空格
 */
export function trimSpace(value) {
	return value.replace(/\s+/g, "");
}

/**
 * 特殊字符替换
 *  
 */
export function stripscript(str) {
	var pattern = new RegExp(
		"[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]"
	);
	var rs = "";
	for (var i = 0; i < str.length; i++) {
		rs = rs + str.substr(i, 1).replace(pattern, "");
	}
	return rs;
}
