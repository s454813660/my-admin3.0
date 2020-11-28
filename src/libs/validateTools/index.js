export function checkEmail(value) {
	let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
	return reg.test(value);
}

export function checkPass(value) {
	let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/;
	return reg.test(value);
}

export function trimSpace(value) {
	return value.replace(/\s+/g, "");
}

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
