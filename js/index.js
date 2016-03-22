/**
 *打开一个新的窗口 
 * @param {Object} page 页面的名称
 */

var token = appcan.locStorage.getVal('token');
/**
 *从服务器获取数据 
 */
function getHealthData() {
	//					var uid = appcan.locStorage.getVal('uid');
	var url = 'http://192.168.155.1:8080/Match/babyBuddy/public/api/health';
	$.ajax({
		type: "get",
		url: url,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		dataType: 'json',
		success: function(d) {
			nowData = d.data;
			gradeHandle(d.data);
		},
		error: function(e) {
			console.log(e);
			//							alert(e);
		}
	});
}
var grade = 100;

/**
 * 计算健康得分
 * @param {Object} data 原始数据
 */
function gradeHandle(data) {
	grade = 100;
	if (data.danger == 2) {
		grade -= 40;
	};
	switch (data.sound) {
		case 5:
			grade -= 30;
			break;
		case 4:
			grade -= 20;
			break;
		case 3:
			grade -= 10;
			break;
	}
	switch (data.light) {
		case 1:
		case 5:
			grade -= 20;
			break;
		case 2:
		case 4:
			grade -= 10;
			break;
	}
	if ((data.temp < 18 && data.temp > 10) || (data.temp > 22 && data.temp < 27)) {
		grade -= 10;
	} else if (data.temp < 10 || data.temp > 27) {
		grade -= 20;
	};
	//					alert(grade);
	return grade;
}

function health() {
	option = {
		tooltip: {
			formatter: "{a} <br/>{b} : {c}%"
		},
		animationDuration: 50,
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
			}
		},
		series: [{
			name: '健康度',
			type: 'gauge',
			radius: '80%',
			detail: {
				formatter: "{value}"
			},
			pointer: { //指针样式
				width: 5
			},
			axisTick: { //刻度样式
				show: true
			},
			splitLine: {
				show: false //分割线样式
			},
			axisLine: { // 坐标轴线  
				lineStyle: { // 属性lineStyle控制线条样式  
					color: [
						[0.6, '#c23531'],
						[0.8, '#FF9933'],
						[1, '#99CC33']
					],
					//   width: 150  
				}
			},
			title: {},
			data: [{
				value: grade,
				name: '健康值'
			}]
		}]
	};
	myChart = echarts.init(document.getElementById('topFrame'));
	//					myChart.setOption(option, true);
	var app = {};
	clearInterval(app.timeTicket);
	app.timeTicket = setInterval(function() {
		option.series[0].data[0].value = grade;
		myChart.setOption(option, true);
	}, 2000);
}
var nowData;

function healthPlay(type) {
	var lightArr = ['很暗，适合睡眠', '偏暗，较为适合睡眠', '适中', '偏亮，建议稍微调低灯光亮度', '很亮,建议调低灯光亮度'];
	var soundArr = ['静谧', '安静', '少许杂音', '有杂音，建议查看孩子是否哭泣，并给孩子换一个稍微安静的环境', '有噪音，建议查看孩子是否哭泣，建议给孩子换一个安静的环境'];
	var sleepArr = ['良好', '一般'];
	switch (type) {
		case 'light':
			$('#now div').text(lightArr[nowData[type]]);
			healthModal('light', '光照');
			break;
		case 'temp':
			$('#now div').text(nowData[type] + '°C');
			healthModal('temp', '温度');
			break;
		case 'sound':
			$('#now div').text(soundArr[nowData[type]]);
			healthModal('sound', '声音');
			break;
		case 'sleep':
			$('#now div').text(sleepArr[nowData[type]]);
			healthModal('sleep', '睡眠');
			break;
	}
}

function healthModal(type, info) {
	$('#healthPlay .now').text('当前' + info);
	$('#healthPlay .history').text('历史' + info);
	$('#healthPlay').modal('show');
}

// /**
//  * 判断文件是否存在不存在就创建，存在执行下一步操作
//  * @param {Object} path 文件的路劲
//  */
// function fileExist(path) {
// 	//判断文件a.txt是否存在
// 	appcan.file.exists({
// 		filePath: 'wgt://' + path,
// 		callback: function(err, data, dataType, optId) {
// 			if (err) {
// 				//判断文件文件出错了
// 				return;
// 			}
// 			if (data == 1) {
// 				alert(path + '已存在');
// 			} else {
// 				alert(path + '不存在');
// 				fileCreat(path);
// 			}
// 		}
// 	});
// }

// /**
//  * 创建文件
//  * @param {Object} path 文件的路劲
//  */
// function fileCreat(path) {
// 	appcan.file.create({
// 		filePath: 'wgt://' + path,
// 		callback: function(err, data, dataType, optId) {
// 			if (err) {
// 				alert('数据储存失败！');
// 				//创建文件出错了
// 				return;
// 			}
// 			if (data == 0) {
// 				alert('文件创建成功');
// 			} else {
// 				alert('数据储存失败！');
// 			}
// 		}
// 	});
// }

// function fileSave(path, data) {
// 	//附加新内容到现有内容上
// 	appcan.file.append({
// 		filePath: path,
// 		content: data,
// 		callback: function(err) {
// 			if (err) {
// 				alert('数据添加失败');
// 				return;
// 			}
// 			alert('数据添加成功');
// 			//附加内容成功
// 		}
// 	});
// }

// function saveData(data) {
// 	// alert(data.created_at);
// 	var time = data.created_at;
// 	var b = time.split(' ');
// 	var fileName = b[0];
// 	alert(fileName);
// 	var path = 'temp/' + fileName + '.json';
// 	fileExist(path);
// 	var a = {
// 		'temp': data.temp,
// 		'time': time
// 	}
// 	fileSave(path, a);

// }