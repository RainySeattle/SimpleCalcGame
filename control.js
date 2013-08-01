$(document).ready(function(){
	setStatisticInfo();
	var rightAnswer = setQuestion();
	var isQuestionRefreshed = true;

	$("#confirmbutton").click(function () {
		if (isQuestionRefreshed) {
			if ($("#TextInput").val() == "")
				alert("别闹，你还没输入答案呢~");
			else {
				var answer = $("#TextInput").val();
				if (RegCheck(answer)) {
					if (answer == rightAnswer) {
						setJudgeInfo(1);
						refreshStatisticInfo(1);
						setStatisticInfo();
					}
					else {
						setJudgeInfo(0);
						refreshStatisticInfo(0);
						setStatisticInfo();
					}
					isQuestionRefreshed = false;
				}
				else {
					setJudgeInfo(3);
				}
			}
		}
	});

	$("#nextbutton").click(function () {
		$("#TextInput").val("");
		rightAnswer = setQuestion();
		isQuestionRefreshed = true;
	});
});

var questionSum = 0;
var questionRight = 0;
var questionWrong = 0;
var score = 0;

function creatNumberAndResult() {
	var question = new Array();
	question[0] = Math.floor(Math.random()*10);
	question[1] = Math.floor(Math.random()*10);
	if (question[0] > question[1]) {
		var tmp = question[0];
		question[0] = question[1];
		question[1] = tmp;
	}
	question[2] = question[0]*question[1];
	return question;
}

//生成题目
function setQuestion() {
	var data = creatNumberAndResult();
	var img1 = "<img src=\"" + "img/" + data[0] + ".jpg\"" + "/>";
	var img2 = "<img src=\"" + "img/" + data[1] + ".jpg\"" + "/>";
	$("#firstimg").html(img1);
	$("#secondimg").html(img2);
	$("#AliImg").html("<img src='img/ali_default.gif'/>");
	$("#result").html("");	
	return data[2];
}

//生成评判信息
function setJudgeInfo(resultType) {
	if (resultType == 0) {
		$("#AliImg").html("<img src='img/ali_wronganswer.gif' /img>");
		$("#result").html("答错了，做下一题吧！");
	}
	else if (resultType == 1) {
		$("#AliImg").html("<img src='img/ali_rightanswer.gif' /img>");
		$("#result").html("真聪明，答对了！");		
	}
	else {
		$("#AliImg").html("<img src='img/ali_chaos.gif' /img>");
		$("#result").html("喂！亲，不要乱填啊！");		
	}
}

//更新统计信息
function refreshStatisticInfo(type) {
	if (type == 0) {
		questionSum++;
		questionWrong++;
		score = parseInt(questionRight/questionSum*100);
	}
	if (type == 1) {
		questionSum++;
		questionRight++;
		score = parseInt(questionRight/questionSum*100);		
	}
}

//显示统计信息
function setStatisticInfo() {
	$("#textQuestionSum").html(questionSum);
	$("#textQuestionRight").html(questionRight);
	$("#textQuestionWrong").html(questionWrong);
	$("#textScore").html(score);
}

//判断输入格式是否正确
function RegCheck(input) {
	var check = /^[0-9]{0,3}$/;
	return check.test(input);
}