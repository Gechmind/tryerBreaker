var  tryer = {
	//应用试客
	 itry : {
	 	pname           : "试客",
	 	urlPatten      : "itry.com/shike/appList",
	 	triggerPatten  : "[href='/itry/appList']",//通过点击来刷新
	 	taskPattern    : "#appList div.trial_price span",//".Click_bj.app_j"
	 	pricePattern   : "span.Price_tag",
	 	fetchTrigger   : "#appList div a.Click_bj",//#appList div a.Click_bj div:first  $("#cantPlayList div a.Click_bj div:first")
	 	taskAsynLoad   : "1",
	 	fininishTag    : "#cantPlayList",//必须全部加载出来了才能刷新 warm_prompt Click_bj
	 	listOrDetail   : "0", //0 是list
	 	countFunc      : "itryAssert",
	 	fetchFunc      : "itryFetch"
	 },   
	 itryFetch :{
	 	pname           : "试客",
	 	urlPatten      : "itry.com/shike/appDetail",
	 	triggerPatten  : "[href='/itry/appList']",
	 	listOrDetail   : "1", //1 是detai
	 	getFuc   	   :  "itryGet",
	 	fethchFlag     : "1"//
	 },
	 test :{
	 	pname           : "测试",
	 	urlPatten      : "localhost:18080/itrydetail",
	 	triggerPatten  : "[href='/itry/appList']",
	 	listOrDetail   : "3", //1 是detai
	 	getFuc   	   :  "itryGet",
	 	fethchFlag     : "1"//
	 },
	 //首席任务
	 domob : {
	 	pname           : "首席",
	 	urlPatten      : "r.ow.domob.cn/wx/ui/html/list.html",//r.ow.domob.cn/wx/ui/html/list.html
	 	triggerPatten  : ".tab.left[data-url='list.html']",//div#recieve
	 	taskPattern    : ".task:not(.ing):not(.unable)",//ing unable
	 	pricePattern   : "span.price",
	 	listOrDetail     : "0",
	 	fetchTrigger   : ".task:not(.ing):not(.unable) button.downloadButton", //$(".task:not(.ing):not(.unable) button.downloadButton"),
	 	taskAsynLoad   : "1",
	 	fininishTag    : ".loadingFinished",
	 	countFunc      : "domobAssert",
	 	fetchFunc      : "domonFetch"
	 },
	 domonFetch : {
	 	pname          : "首席",
	 	urlPatten      : "r.ow.domob.cn/wx/ui/html/detail.html",
	 	triggerPatten  : ".tab.left[data-url='list.html']",
	 	listOrDetail     : "1", //抓取任务标识
	 	fetchButton    : "#receive .btn button",//"div#receive div.btn"
	 	getFuc   	   :  "domonGet",
	 	fethchFlag     : "1"//无须额外抓取
	 },
	 quanming : {
	 	pname          : "全民试用",
	 	urlPatten      : "ow.miidi.net/ow/wxList.bin",
	 	triggerPatten  : "",//为空直接刷新
	 	taskPattern    : "div.downbtn.btnblue",//已抢到任务的请继续按钮 //div downbtn btnblue span.liktimer   RemainM  RemainM //请在1小时内完成，开始任务
	 	pricePattern   : "",//无priceTag
	 	fetchTrigger   : "img[src='images/100_6.png']",//a[id^='trigger'] 仅点击快速任务
	 	listOrDetail   : "0",  //0 是list
	 	countFunc      : "quanmingAssert",
	 	fetchFunc      : "quanmingFetch"
	 },
	 qianka : {
	 	pname          : "钱咖",
	 	urlPatten      : "(m.qianka.com/fe/task/index.html)|(m.qianka.com/fe/task/timed/list)",
	 	triggerPatten  : "",//为空直接刷新
	 	taskPattern	   : "",
	 	fetchTrigger   : "",
	 	pricePattern   : "",//无priceTag
	 	listOrDetail   : "0",//list
	 	countFunc      : "qiankaAssert",
	 	fetchFunc      : "qiankaFetch",
	 	
	 }
}
//**********************************定义区
//钱咖任务数判定法

var qiankaAssert = function(tryerUse,callback){
	//直接创建xml请求，有新任务再刷新
				// 钱咖的任务obj 具体含义
			//被抢完的
			// $$hashKey: "object:76"
			// activity: ""
			// bid: "cn.com.idcool.jiatu"
			// exclusive_reward: 0
			// icon: "http://upload.guo7.com/fcdce64e2da286463a71893fb889e4d4.jpg"
			// id: 120176
			// qty: 0   剩余数量
			// reward: "1.4"  价格
			// status: 1 
			// statusText: "<div class="plus">+</div><div class="reward">1.4</div><div class="y">元</div>"  展示进行中还是未抢
			// status_order: 3
			// tags: Array[4]
			// title: "家图"
			// type: 1   第一梯队


			//有任务数的
			// bid: "com.hjclass.hujiangclass"
			// exclusive_reward: 0.2  //特殊任务
			// icon: "http://upload.guo7.com/0daccc56cbe9d9904d40284ab44716f3.jpg"
			// id: 120187
			// keyword: "沪江开心词场"
			// qty: 698
			// reward: "1.6"
			// status: 2   1、未获取 、2、进行中  3、 已完成
			// statusText: "进行中"
			// status_order: 1
			// tags: Array[4]
			// title: "沪江网校"
			// type: 1   1：可抢的 或者 已完成  3、邀请好友  4、预告


			// bid: "com.tdgame.jianghuqzhuan"
			// exclusive_reward: 0.5
			// icon: "http://upload.guo7.com/c781a948634d57dd2bb7a39bf4934715.jpg"
			// id: 120197
			// qty: 0
			// reward: "3.5"
			// status: 3
			// statusText: "已完成"
			// status_order: 5
			// tags: Array[4]
			// title: "江湖Q传（付费）"
			// type: 1

	var xhr = new XMLHttpRequest();

	function backReqest(){
		xhr.open("GET","http://m.qianka.com/api/h5/subtask/fetch");
		var ls = 0;
		xhr.onreadystatechange = function(){

			if (xhr.readyState == "4") {
				var t = xhr.responseText.toString();
				if (t.indexOf("data") > 0){
					var resObj = eval('('+ xhr.responseText + ')');
					console.log(resObj.data)

					if(!resObj.data){
						setTimeout(backReqest,20000);
					}

					var singleObj;
					for(var i = 0;i < resObj.data.length;i++){
						singleObj = resObj.data[i];
						console.log("status----"+singleObj.status+"type----"+singleObj.type+"qty----"+singleObj.qty);
						if(singleObj.status == 1 && singleObj.type == 1 && singleObj.qty > 0){
							ls++ 
						}
					}

					if(ls == 0){
						setTimeout(backReqest,5000)
					}else{
						localStorage.hasTask = 0;
						musicAndEmail(ls);
					}

				}else{
					callback(tryerUse,ls,0,5000);
				}

			};

		};

		xhr.onerror = function(){
			callback(tryerUse,ls,0,5000);
		};

		xhr.send();
	}
	backReqest();

}

var qiankaFetch = function(tryerUse,callback){

}
// qiankaAssert();


//新任务判定方法
//小兵抢计数法

var itryAssert = function(tryerUse,callback){
	//class 符合 taskPattern 同时文字不是进行中的
	//10次嗅探 然任务加载完判断再刷新

	console.log("-------try Sniffer-----------");

	var count = 5;

	var ls = 0 ;

	// getApp('8192586','9A811240AC7FEB1BD90AA0BCD6295698',function(){
	// 	ls = 1;
	// 	callback(tryerUse,ls,count,0);
	// });

	//刷新之后直接跳转


	var waitingInterval = setInterval(function(){
		//这里的finishTag 不定保证

		if ( count == 0 || $(tryerUse.fininishTag).children().length  > 0 || $(tryerUse.taskPattern).children().length > 0){//如果先task先加载出来了，直接结束

			clearInterval(waitingInterval);

			// $(tryerUse.taskPattern).text(function(index,text){
			// 	if(text == "进行中"){
			// 		ls = 0;
			// 	}
			// })	
			//进行中判断 "div.app_name h3 font#show_status"

			$(tryerUse.fetchTrigger).each(function(){

				if($(this).find("p span:last").text() != '剩余0个' &&  !$(this).find("div.app_name h3 font").length > 0){
					ls++;
				}
			})

			console.log("-------count-----------" + count);

			callback(tryerUse,ls);

		} else{

			count--;
		}

	},200);
}

var itryFetch = function(tryerUse){
	//小兵的可玩列表实在加载到本地之后，js把price改为进行中的，把进行中的排除即可

	//修改后的只能执行一个任务
	var isTrying = 0 ;

	$(tryerUse.taskPattern).text(function(index,text){
		if(text == "进行中"){
			isTrying = isTrying + 1;
		}
	})
    //剩余0个判断方法

	if($(tryerUse.taskPattern).length > 0 && isTrying == 0 ){
			//不在使用点击方法。直接执行绑定的方法
			$(tryerUse.fetchTrigger).each(function(){
				if($(this).find("p span:last").text() != '剩余0个' &&  !$(this).find("div.app_name h3 font").length > 0){
					var onclickMethod = $(this)[0].getAttribute("onclick").toString();
		    		var startindex = onclickMethod.indexOf('(');
		    		var endIndex   = onclickMethod.indexOf(')');
		    		var arguments  = onclickMethod.substr(startindex+1,endIndex)
		    		var regExp = /'/g
		    		var newArgs = arguments.replace(regExp,'');
		    		var argArray = newArgs.split(',');
		    		hack_btnStatus.apply(null,argArray);
				}
			})
    		
    		redirect(tryerUse,false);
    }else{
    		redirect(tryerUse,false);
    }

}

var itryGet = function(tryerUse,callback){
	//小兵的可玩列表实在加载到本地之后，js把price改为进行中的，把进行中的排除即可
	var  tryCount = 20;

	var  intervalFunc = function(){
	//修改后的只能执行一个任务
		if($("#copy_key").length > 0){
	    		
				// var triggerShim = $("#copy_key").prepend("<div id='triggerShim' onclick='alert(1)'></div>");
				// triggerShim.trigger("copy",function(){alert('sss')}); //依然无法触发copy事件
				// triggerShim.trigger("copy");
				// $("#triggerShim")[0].click(); //通过改变dom确实可以调用前端页面的方法，此方法是可行的
				//貌似不能$trigger event 无法使用，原因不明。页面环境是支持的

				// $("#copy_key").trigger("copy"); //jquery的trigger在沙盒里貌似失效了

				// chrome 原生方法触发event ;
				// document.getElementById("triggerShim").dispatchEvent(new ClipboardEvent('copy'));Unfortunately, the only browser that properly supports the Clipboard API is FireFox (since 22). All other browsers (if it supports Clipboard API at all), will not support the ClipbordEvent constructor.

				// $("#hehe").trigger('click');//可以触发onclick事件

				// $("#hehe").click();

				//算了还是暴力分析js，hack之
				var script = $("script");
				var length = script.length -1;
				var scriptContext = $("script")[length].innerText;

				var startIndext = scriptContext.indexOf("{appid:");
				var endIndex = scriptContext.indexOf("exec_type") + 20;

				var tempString = scriptContext.substring(startIndext,endIndex);

				var tempobj = eval('('+tempString+')');

				h_download_app(tempobj.appid,tempobj.user_id,tempobj.order_Id,tempobj.type,tempobj.v_str,tempobj.search_word,tempobj.exec_type);
				// var object
				
				

				clearInterval(tryFetch);
	    		callback(tryerUse);


	    }else if( tryCount == 0){

					clearInterval(tryFetch);

					// callback(tryerUse)
		}else{
				tryCount --
		}
    }

    var tryFetch = setInterval(intervalFunc,300);
}
//首席计数法
var domobAssert = function(tryerUse,callback){
	//class 符合 taskPattern

	//15次嗅探 然任务加载完判断再刷新
	var ls = 0;

	console.log("-------waiting-----------");

	var count = 5;

	var waitingInterval = setInterval(function(){

		if (count == 0 || $(tryerUse.fininishTag).length  > 0 ){
			//有任务会直接出发
			ls = $(tryerUse.taskPattern).length;

			console.log("-------count-----------" + count);

			if($("#myLoading").is(".visible")){ //页面必须都加在出来了再刷新
				count = 1;
			}else{
				clearInterval(waitingInterval);
				callback(tryerUse,ls,count);
			}
			

		}else{

			count--;
		}

	},300);

}

//首席抢任务
var domonFetch = function(tryerUse){

	$(tryerUse.fetchTrigger).click();

}

// 首席获取任务
var  domonGet = function(tryerUse,callback){
	//领取任务 20 次嗅探,让异步加载的加载完
	//进来了一定有任务

	var  intervalFunc = function(){
			//如果请求返回出错，已经有Alert了，直接返回重新刷新

			
			if($("#myAlert.visible").length > 0){
				callback(tryerUse);
			}

			if($(tryerUse.fetchButton).text() == "领取任务"){

					// clearInterval(tryFetch);

					$(tryerUse.fetchButton)[0].click();

					// callback(tryerUse);

			}else{
					callback(tryerUse);

			}	
			
	}
	var  tryFetch = setTimeout(intervalFunc,3000);

}
//全民试用
var quanmingAssert = function(tryerUse,callback){
	//通过任务时间判定 59分55秒以上即判定为新任务
	//上一次点击，下一次判断
	var ls = 0;

    //获取所有的具有 span.liktimer的
    $(tryerUse.taskPattern).text(function(index,text){
    	if (text.trim() == "请在1小时内完成，开始任务"){
    		ls ++
    	}
    })

   callback(tryerUse,ls);

}

var quanmingFetch = function(tryerUse){
	//点开所有的pop页面
	$(tryerUse.fetchTrigger).each(function(){

    		// function closePop(){

    		// 	if($(tryerUse.closeTrigger).length > 0){
    		// 		$(this).children().click();//点击子元素，让事件往上传递。Jquery绑定的事件不知道为什么直接触发不了
    		// 		// $(this).click();
    		// 		clearInterval(pop);
    		// 	}

    		// };

    		$(this).click();

    		// var pop = setInterval(closePop,1000);
    		// if($(this).find())
    		
    })

}

//***********************************************************运行区
//基础配置参数
!function () {

	// var startTime =  new Date();

	var normalInterval = localStorage.normalInterval || 2000;

	if(!localStorage.hasTask){

		localStorage.hasTask = 0;
		localStorage.circle = 0;

	}

	var circle = localStorage.circle || 0 ;
}()

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

//识别页面
var tryerUse;

var urlhref = window.location.host + window.location.pathname;
console.log("urlhref:"+urlhref);

for (key in tryer){
	var patten = new RegExp(tryer[key].urlPatten);

	if (patten.test(urlhref)){

		tryerUse = tryer[key];
		break;
	}
}

//set storage 试客
if(urlhref == "http://itry.com/itry/appList"){
	localStorage["itry.shokey.param"]= "9A811240AC7FEB1BD90AA0BCD6295698";
}

console.log("-------start-----------");
//set cookie 钱咖


chrome.runtime.sendMessage({type:"cookie"},function(response){
	console.log("set cookie " + response);
})



//获取数据，或者等待抓取页面
if(tryerUse.listOrDetail == "0"){//list 页面
	// 先计数
	var  callback = function(tryerUse,ls,count,time){
		//提示音邮件通知
		musicAndEmail(ls);

		//再抓取
		eval(tryerUse.fetchFunc)(tryerUse);

		//跳转
		redirect(tryerUse,false,count,time);
	};

	eval(tryerUse.countFunc)(tryerUse,callback);
	

}else if(tryerUse.listOrDetail == "1"){//detail 页面

	var callback = function(tryerUse){

		redirect(tryerUse,true);
	}

	if(tryerUse.fethchFlag == "0"){//list 页面已经抢到，此处只要返回就可以
		//直接跳转
		redirect(tryerUse,true);

	}else if(tryerUse.fethchFlag == "1"){
		//先抢任务
		eval(tryerUse.getFuc)(tryerUse,callback);
		//直接跳转
		
	}

}


//提醒
function musicAndEmail(ls){

	var cirleInterval = +localStorage.hasTask;

	console.log("ls------"+ls);

	console.log("cirleInterval-------"+cirleInterval);

	if (ls > 0){
	        // alert("有任务");

	        //判断是否已做过提醒
	        if( cirleInterval == 0){

	        	localStorage.hasTask = 1;

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
			}
	 }else{
	//         location.reload();
			if(cirleInterval == 1 ){//重置提醒记录

				localStorage.hasTask = 0;

			}
	 }

}

//刷新
function redirect(tryerUse,directRefresh,count,time){
		var intervalTime = time || 2000;
		console.log("intervalTime------"+intervalTime);

		if(tryerUse.taskAsynLoad == "1"  && count == 0){//目前只需要异步嗅探结束的直接加载  count怎么处理
			directRefresh = true;
		}
	    //延时刷新器
	    if(localStorage.circle == 0){

	    	if(directRefresh){//directRefresh == true 直接刷新

				if(tryerUse.triggerPatten == ""){

					window.location.reload(true);
				}else if($(tryerUse.triggerPatten).length == 0){
					window.location.reload(true);
				}else{

					$(tryerUse.triggerPatten).children().click();
				}
			}else{
				setTimeout(function(){
						
		        		if(tryerUse.triggerPatten == ""){

							window.location.reload(true);
						}else if($(tryerUse.triggerPatten).length == 0){
							window.location.reload(true);
						}else{

							$(tryerUse.triggerPatten).children().click();
						}

		    	},intervalTime);
			}

	    }
			
}

//  改用推送的方式
//  chrome.runtime.sendMessage({type:"query"},function(response){
// 	 circle = response.circle || 0 ;
	
// 	 console.log(response);

	
// });
