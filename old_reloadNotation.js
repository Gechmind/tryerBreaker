var  tryer = {
	//应用试客
	 itry : {
	 	pname           : "试客",
	 	urlPatten      : "itry.com/itry/appList",
	 	triggerPatten  : "[href='/itry/appList']",
	 	taskPattern    : ".Click_bj.app_j",
	 	pricePattern   : "span.Price_tag",
	 	autoFetch      : "2", //1 直接抢第一个(通过class区分是否抢到) 2、筛选未抢过的(已抢到和未抢不通过class区分) 3、弹出框抢，抢到后关闭
	 	fetchTrigger   : ".Click_bj.app_j",
	 	fethchFlag     : "0"  //1 是抢单页面
	 },   
	 itryFetch :{
	 	pname           : "试客",
	 	urlPatten      : "itry.com/itry/appDetail",
	 	triggerPatten  : "[href='/itry/appList']",
	 	fethchFlag     : "0"//无须额外抓取
	 },
	 //首席任务
	 domob : {
	 	pname           : "首席",
	 	urlPatten      : "r.ow.domob.cn/wx/ui/html/list.html",//r.ow.domob.cn/wx/ui/html/list.html
	 	triggerPatten  : ".tab.left[data-url='list.html']",//div#recieve
	 	taskPattern    : ".task:not(.ing):not(.unable)",//ing unable
	 	pricePattern   : "span.price",
	 	autoFetch      : "1",
	 	fethchFlag     : "0",
	 	fetchTrigger   : ".task:not(.ing):not(.unable) button.downloadButton", //$(".task:not(.ing):not(.unable) button.downloadButton"),
	 	taskAsynLoad   : "1",
	 	fininishTag    : ".loadingFinished"
	 },
	 domonFetch : {
	 	pname           : "首席",
	 	urlPatten      : "r.ow.domob.cn/wx/ui/html/detail.html",
	 	triggerPatten  : ".tab.left[data-url='list.html']",
	 	fethchFlag     : "1", //抓取任务标识
	 	fetchButton    : "#receive .btn button.enable"//"div#receive div.btn"
	 },
	 quanming : {
	 	pname          : "全民试用",
	 	urlPatten      : "ow.miidi.net/ow/wxList.bin",
	 	triggerPatten  : "",//为空直接刷新
	 	taskPattern    : ".biaoqiancenterred14",//已抢到任务的请继续按钮 //div downbtn btnblue span.liktimer   RemainM  RemainM //请在1小时内完成，开始任务
	 	pricePattern   : "",//无priceTag
	 	autoFetch      : "3", //3--fetchTrigger、closebutton
	 	fetchTrigger   : "a[id^='trigger']",
	 	closeTrigger   : "[style='position: absolute; z-index: 800; width: 295px; height: 354px; display: none; left: 12.5px; top: 107px; opacity: 1;']",
	 	fethchFlag     : "0"  //1 是抢单页面
	 }
}
//新任务判定方法

var quanmingAssert = function(tryerUse){
	//通过任务时间判定 59分55秒以上即判定为新任务

	var ls = 0;

	

    //获取所有的具有 span.liktimer的
    $(tryerUse.taskPattern).text(function(index,text){
    	if (text.trim() == "请在1小时内完成，开始任务"){
    		ls ++
    	}
    })

}

var quanmingFetch = function(tryerUse){
	//点开所有的pop页面
	$(tryerUse.fetchTrigger).each(function(){

    		function closePop(){

    			if($(tryerUse.closeTrigger).length > 0){
    				$(this).children().click();//点击子元素，让事件往上传递。Jquery绑定的事件不知道为什么直接触发不了
    				clearInterval(pop);
    			}

    		};

    		$(this).children().click();

    		var pop = setInterval(closePop,1000);
    		// if($(this).find())
    		
    })

}

//小兵抢计数法

var itryAssert = function(){
	//class 符合 taskPattern 同时文字不是进行中的
	var tempRequest = $(tryerUse.taskPattern);
	//开始赚钱链接

	var ls = tempRequest.length;

	if(tryerUse.pricePattern != ""){

		var t = $(tryerUse.taskPattern).find(tryerUse.pricePattern);
		// var tt = t.text();

		for(var i=0; i < ls; i++){

			var taskText = t[i].innerText;

			if(taskText == "进行中"){
				--ls;
			}

		} 
	}
}

var itryFetch = function(tryerUse){
	//小兵的可玩列表实在加载到本地之后，js把price改为进行中的，把进行中的排除即可

	if($(tryerUse.taskPattern).length > 0){
    		$(tryerUse.taskPattern).find(tryerUse.pricePattern).text(function(index,text){
    			if(text != "进行中"){
    				this.click();
    			}
    		})
    	}
}

//首席计数法
var domobAssert = function(){
	//class 符合 taskPattern
	var tempRequest = $(tryerUse.taskPattern);

	var ls = tempRequest.length;
}

//首席抢任务
var domonFetch = function(tryerUse){
	
	//10次嗅探 然任务加载完判断再刷新
	var count = 10;
	var waitingInterval = setInterval(function(){

		if ($(tryerUse.fininishTag).length  > 0 || count == 0){
			
			clearInterval(waitingInterval);
			taskSearching();

		}else{

			count--;
		}
	},200);

	//有任务会直接出发
	$(tryerUse.fetchTrigger).click();
}

// 首席获取任务
var  domonGet = function(tryerUse){
	//领取任务 5次嗅探,让异步加载的加载完
	var  tryCount = 5;

	var  tryFetch = setInterval(function(){

			if($(tryerUse.fetchButton).length > 0 || tryCount == 0){

				clearInterval(tryFetch);
				$(tryerUse.fetchButton).click();
				taskSearching();

			}else{
				tryCount --
			}
			
	},150);
}



var tryerUse;

for (key in tryer){
	var patten = new RegExp(tryer[key].urlPatten);
	var urlhref = window.location.host + window.location.pathname;

	if (patten.test(urlhref)){

		tryerUse = tryer[key];
		break;
	}
}


if(tryerUse.fethchFlag == "1"){//领取任务页面

	//d
	var tryCount = 5;
	var  tryFetch = setInterval(function(){

			if($(tryerUse.fetchButton).length > 0 || tryCount == 0){

				clearInterval(tryFetch);
				$(tryerUse.fetchButton).click();
				taskSearching();

			}else{
				tryCount --
			}
			
		},200);

}else if(tryerUse.taskAsynLoad == "1"){//异步加载任务的需要等任务加载完
	//查询是否加载完毕。10次嗅探
	var count = 10;
	var waitingInterval = setInterval(function(){

		if ($(tryerUse.fininishTag).length  > 0 || count == 0){
			
			clearInterval(waitingInterval);
			taskSearching();

		}else{

			count--;
		}
	},200);
	
}else{

	taskSearching();
}

//插件参数监听
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){

	if(message.type == "circleChange"){

		var oldCircle = localStorage.circle || "0";

		localStorage.circle = message.circle;

		sendResponse("Message got,reload right now");

		if(oldCircle == "1" && message.circle == "0"){

			window.location.reload(true);
		}
		
	}
});

//获取任务列表
function taskSearching () {

	//触发器设置

	var tempRequest = $(tryerUse.taskPattern);
	//开始赚钱链接

	var ls = tempRequest.length;

	if(tryerUse.pricePattern != ""){ //判断是否有priceTag

		var t = $(tryerUse.taskPattern).find(tryerUse.pricePattern);
		// var tt = t.text();

		for(var i=0; i < ls; i++){

			var taskText = t[i].innerText;

			if(taskText == "进行中"){
				--ls;
			}

		} 
	}
	

	//自动抢任务
    if(tryerUse.autoFetch == "1"){

    	$(tryerUse.fetchTrigger).click();//有任务会直接出发
    	//抢到之后立马刷新返回
    }else if(tryerUse.autoFetch == "2"){//小兵的抢任务方式

    	if(ls > 0){
    		$(tryerUse.taskPattern).find(tryerUse.pricePattern).text(function(index,text){
    			if(text != "进行中"){
    				this.click();
    			}
    		})
    	}
    }else if(tryerUse.autoFetch == "3"){//弹框抢任务
    	// var temp = $(tryerUse.fetchTrigger).children().click();//点击子元素，让事件往上传递。Jquery绑定的事件不知道为什么直接触发不了
    	// $(temp).click();
    	$(tryerUse.fetchTrigger).each(function(){

    		function closePop(){

    			if($(tryerUse.closeTrigger).length > 0){
    				$(this).children().click();//点击子元素，让事件往上传递。Jquery绑定的事件不知道为什么直接触发不了
    				clearInterval(pop);
    			}
    			
    		};

    		$(this).children().click();

    		var pop = setInterval(closePop,1000);
    		// if($(this).find())
    		
    	})
    }

	circleInterval(ls);
}


function circleInterval(ls){

	// notation();
// var e = jQuery.Event("select");
	var startTime =  new Date();
	var normalInterval = localStorage.normalInterval || 2000;

	if(!localStorage.hasTask){
		var longestTask = 15000;
		
		localStorage.hasTask = 0;
		localStorage.intvalAfterTask = 15000;
	}

	var circle = localStorage.circle || 0 ;

	if(circle == 0){
		// var nota = window.setInterval(notation,normalInterval);
		notation();
	}


	function notation(){

		

		//延时刷新器
		var delayRefreshTrigger = function (intervalTime,directRefresh){			

			if(directRefresh){//directRefresh == true 直接刷新
				if(tryerUse.triggerPatten == ""){

					window.location.reload(true);
				}else{

					$(tryerUse.triggerPatten).children().click();
				}
			}else{
				setTimeout(function(){
						
		        		if(tryerUse.triggerPatten == ""){

							window.location.reload(true);
						}else{

							$(tryerUse.triggerPatten).children().click();
						}

		    	},intervalTime);
			}
			
		}

		//是否发过邮件
		var cirleInterval = +localStorage.hasTask;
		var runTime = new Date();

		console.log(runTime.getSeconds() - startTime.getSeconds());
		startTime = runTime;

		console.log("ls------"+ls);

		console.log("cirleInterval-------"+cirleInterval);

	    if (ls > 0){
	        // alert("有任务");

	        var intervalTime = +localStorage.intvalAfterTask
	        //判断是否已做过提醒
	        if( cirleInterval == 0){
	        	localStorage.hasTask = 1;
	        	localStorage.intvalAfterTask = longestTask;
	        	

	        	
	         	//触发背景音乐
	         	chrome.runtime.sendMessage({type:"triggerMusic",switcher:"on"},function(response){

					 console.log(response); 
					
				});

	         	

			    // var xhr = new XMLHttpRequest();

		     //    xhr.open("POST","http://localhost:18080/apptry");
		     //    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

		     //    xhr.onreadystatechange = function(){
		     //    	if(xhr.readyState == 4){
		     //    		var resp = ("(" + xhr.responseText + ")")
		     //    		console.log(resp);
		     //    	}
		     //    }
		    	// xhr.send("pname=" + tryerUse.pname);

		         if(tryerUse.taskAsynLoad == "1"){
		         	//立即刷新
		         	delayRefreshTrigger(0,true);

		         }else{
					delayRefreshTrigger(intervalTime);
		         }
		     
	        }else if(cirleInterval == 1){
	        	//无需再次提醒
        		intervalTime = intervalTime > 2*normalInterval ? (intervalTime - normalInterval) : normalInterval;
        		localStorage.intvalAfterTask = intervalTime;

        		delayRefreshTrigger(intervalTime);
        		// clearInterval(nota);
        		// nota =  window.setInterval(notation,intervalTime);
	        }
	 

	    }else{
	//         location.reload();
			if(cirleInterval == 1 ){

				localStorage.hasTask = 0;

				delayRefreshTrigger(2000);

				// clearInterval(nota);
				// nota =  window.setInterval(notation,2000);

			}
	    }

	     if(tryerUse.taskAsynLoad == "1"  && count == 0){
	     	//立即刷新
	     	delayRefreshTrigger(0,true);

	     }else{

	     	delayRefreshTrigger(2000);
	     }
	    
	    console.log("heihei");
		// clickTrig.click();

	}
}

//  改用推送的方式
//  chrome.runtime.sendMessage({type:"query"},function(response){
// 	 circle = response.circle || 0 ;
	
// 	 console.log(response);

	
// });
