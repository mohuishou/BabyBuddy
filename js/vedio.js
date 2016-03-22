/**
 * 视频功能实现
 * 使用天翼rtc插件实现
 */

/**
 * 初始化
 * 定义天翼rtc回调函数
 * 同一个页面中  appcan.ready可以存在多个，不会冲突;而uexOnload不行...
 */
function rtcInit() {
	uexESurfingRtc.onGlobalStatus = upgateGlobalStatus; //全局监控
	uexESurfingRtc.cbLogStatus = upgateLogStatus; //登陆回调
	uexESurfingRtc.cbCallStatus = updateCallStatus; //呼叫回调
	//uexESurfingRtc.cbRemotePicPath = showRemotePicPath;//截屏回调

	/*----------配置天翼rtc插件的appkey & appid---------*/
	appId = '70392';
	appKey = '595acd54-d25a-40ea-8f2c-88849896cfcc';
	uexESurfingRtc.setAppKeyAndAppId(appKey, appId);
	login();
};



/**
 * 登陆回调，返回是否登陆成功
 */
function upgateLogStatus(opCode, dataType, data) {

	alert(data);
	if ("OK" == data.substring(0, 2)) {
		var status = data.split("OK:")[1];
		var showStr = "";
		if ("LOGIN" == status) {
			showStr = "登陆成功，点击退出";
			$("#login").attr('name', 'logout');
		} else if ("LOGOUT" == status) {
			showStr = "登陆";
			$("#login").attr('name', 'login');
		}
		$("#login").text(showStr);
	} else {
		alert(data);
	}
}

function updateCallStatus(opCode, dataType, data) {
	alert(data);
	//  	if ("OK" == data.substring(0, 2)) {
	//  		var status = data.split("OK:")[1];
	//  		var showStr = "";
	//  		var str = '';
	//  		if ("NORMAL" == status) {
	//  			showStr = "call";
	//  			str = '呼叫';
	//  		} else if ("INCOMING" == status) {
	//  			showStr = "accept";
	//  			str = "接听";
	//  		}
	//  		// else if("CALLING" == status)
	//  		// {
	//  		//     showStr = "hangUp";
	//  		//     str="挂断";
	//  		// }
	//  		$('#call').attr('name', showStr);
	//  		$('#call').text(str);
	//  	} else {
	//  		alert(data);
	//  	}
}


/**
 *监控中心回调 
 */
function upgateGlobalStatus(opCode, dataType, data) {
	//  	console.log(data);
	alert(data);
}

/**
 * 登陆方法的实现
 * 
 */
function login() {
	var header = $('header').height();
	var footer = $('#footer').height();
	var empty = $(document).height() - header - footer;
	var width = $(document).width();
	jsonViewConfig = {
			"localView": {
				"x": "0",
				"y": header.toString(),
				"w": Math.floor((1 / 3) * empty).toString(),
				"h": Math.floor((1 / 3) * width).toString()
			},
			"remoteView": {
				"x": "0",
				"y": header.toString(),
				"w": width.toString(),
				"h": empty.toString()
			}
		}
		/*---这里默认设置一个用户名用于调试，后期用户登录之后直接自动生成---*/
	userName = "4892";
	/*--uexESurfingRtc.login函数需要传入的参数是一个json字符串，所以需要调用JSON.stringify方法将json对象转换为字符串--*/
	jsonDtr = JSON.stringify(jsonViewConfig);
	alert(jsonDtr);
	uexESurfingRtc.login(jsonDtr, userName);
}

/**
 * 退出登录
 * @return {[type]} [description]
 */
function logout() {
	uexESurfingRtc.logout();
}

function call() {
	uexESurfingRtc.call(2, "1234");
}

function accept() {
	uexESurfingRtc.acceptCall(2);
}

//挂断接口
function hangUp() {

	uexESurfingRtc.hangUp();
}

/**
 *登陆按钮
 *点击之后直接视频登陆
 */
appcan.button("#login", "ani-act", function() {
	var btnName = $("#login").attr('name');
	if (btnName == "login") {
		$("#login").text("登陆中，请稍候...");
		login();
	} else if (btnName = "logout") {
		$("#login").text("退出中，请稍候...");
		logout();
	}

});

/**
 * 呼叫按钮
 */
appcan.button("#call", "ani-act", function() {
	var btnName = $("#call").attr('name');
	if (btnName == "call") {
		$("#call").text("呼叫中，请稍候...");
		//  		var url = "http://lxl520.com/kehu/wlcbs/index.php/Home/Index/vedio/act/1";
		//  		appcan.request.getJSON(url, function(a) {
		//  			window.setTimeout(call, 5000);
		//  		});
	} else if (btnName = "accept") {
		$("#call").text("接听中，请稍候...");
		accept();
	}
	// else if(btnName='hangUp'){
	//     hangUp();
	// }
});
appcan.button("#hangUp", "ani-act", function() {
	hangUp();
});