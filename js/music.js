var token = appcan.locStorage.getVal('token');

function musicUpdate() {
	var data = {
		'type': 1,
		'path': $('#path').val(),
		'fileName': $('#fileName').val()
	}
	var url = 'http://192.168.155.1:8080/Match/babyBuddy/public/api/music';

	$.ajax({
		url: url,
		type: 'POST',
		data: data,
		headers: {
			'Authorization': 'Bearer ' + token
		},
		success: function(d) {
			alert(d.message);
			musicList();
		},
		error: function(e) {
			alert("上传错误");
			console.log(e);
		}
	});
}

function musicDelete(b) {
	var id = $(b).attr('name');
	var url = 'http://192.168.155.1:8080/Match/babyBuddy/public/api/music/delete/' + id;

	$.ajax({
		url: url + 'user',
		type: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token
		},
		success: function(d) {
			alert(d.message);
			musicList();
		},
		error: function(e) {
			alert(e);
			console.log(e);
		}
	});
}

function musicList() {
	$('#musicList').text('');
	var url = 'http://192.168.155.1:8080/Match/babyBuddy/public/api/music';

	$.ajax({
		url: url,
		type: 'get',
		headers: {
			'Authorization': ' Bearer ' + token
		},
		success: function(d) {
			for (var key in d.data) {
				$str = '<div class="tile"><div class="tile-action tile-action-show"><ul class="margin-no nav nav-list pull-right"><li><a class="text-black-sec waves-attach waves-effect"><img name="' + d.data[key].id + '"path="' + d.data[key].path + '"onclick="musicPlay(1,this);"class="icon"src="img/iconfont-bofang.png "></a></li><li><a class="text-black-sec waves-attach waves-effect"><img name="' + d.data[key].id + '"path="' + d.data[key].path + '"onclick="musicDelete(this);"class="icon"src="img/iconfont-iconfontshanchu.png"></a></li></ul></div><div class="tile-inner"><span class="text-overflow">' + d.data[key].fileName + '</span></div></div>';
				$('#musicList').append($str);
			}
		},
		error: function(e) {
			alert("错误！");
			console.log(e);
		}
	});
}
/**
 * 
 * @param {Object} a 1：播放，2暂停，3停止
 */
function musicPlay(a, o) {

	var data = {
		'playId': a,
	}

	if (a == 1) {
		data.musicId = $(o).attr('name')
		var str = $(o).parents('.tile').find('.text-overflow').text();

		$('#nowPlay').text(str);
	}

	var url = 'http://192.168.155.1:8080/Match/babyBuddy/public/api/music/play';

	$.ajax({
		url: url,
		type: 'POST',
		data: data,
		dataType: 'json',
		headers: {
			'Authorization': ' Bearer ' + token
		},
		success: function(d) {
			alert(d.message);
		},
		error: function(e) {
			alert("错误！");
			console.log(e);
		}
	});

}