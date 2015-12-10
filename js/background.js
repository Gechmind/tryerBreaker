//背景项用来控制页面轮训
chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
	//default circle
	var circle = localStorage.cirle || 0;
	console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension")
	console.log(message);
	// sendResponse(xp:"1", method: "getText"});
	// sendResponse({xp:"1"});
	if (message.type == "option") {

		localStorage.cirle = message.circle;
		localStorage.circleInterval = message.circleInterval || localStorage.circleInterval;
		sendResponse("sucess set");
		//如果原先circle为0，需要传递消息使其自动刷新

		

		// if(circle == "1" && message.circle == "0"){

		// 	chrome.tabs.query({url: "http://itry.com/itry/appList*"}, function(tabs) { 

		//  		chrome.tabs.sendMessage(tabs[0].id, {type:"circleChange",state:"reload"}, function(response) {    console.log(response);  }); 

		// 	});

		// }

	}else if(message.type == "query"){

		sendResponse({circle: circle});

	}else if(message.type == "triggerMusic"){

	  if(message.switcher == "on"){

	  		triggerMusic();
	  		sendResponse("music is on");

	  }else if(message.switcher == "pause"){

	  		triggerMusicPause();
	  		sendResponse("music is off");
	  }
		
	}else if(message.type == "cookie"){
	
		var exp = (new Date().getTime()/1000) + 3600;
			
		chrome.cookies.set({url:"http://m.qianka.com/fe/dashboard/index.html",
							name:"qk_ll",
							domain:"m.qianka.com",
							path:"/",
							value:"eyJpdiI6IjEzZUVxU0FPN01hUXRQUHA2YjZPaUE9PSIsInZhbHVlIjoiMVNLc3hkTmRTUUtTMW5tZ2xKOTJ4QT09IiwibWFjIjoiYzJkY2U5YWIxYzMyYjgxZGVlOGY2MTkzOTEwMmIxYmRiMDM3Y2E4ZjY4OWFjZjkxMTNmMzg2ZTcwZDAyM2VhMiJ9",
							expirationDate:exp
						});

		chrome.cookies.set({url:"http://m.qianka.com/fe/dashboard/index.html",
							name:"qk_app_id",
							domain:"m.qianka.com",
							path:"/",
							value:"18",
							expirationDate:+exp
						});
		chrome.cookies.set({url:"http://m.qianka.com/fe/dashboard/index.html",
							name:"PHPSESSID",
							domain:"m.qianka.com",
							path:"/",
							value:"1e20e213b1a794dd2f038c66cd969abd54837bdc",
							expirationDate:+exp
						});
		chrome.cookies.set({url:"http://m.qianka.com/fe/dashboard/index.html",
							name:"newUser",
							domain:"m.qianka.com",
							path:"/",
							value:"eyJpdiI6Im1cL21TY3RVKzBYMmgzNWVIcWt1WUlBPT0iLCJ2YWx1ZSI6InJHSHlOclo0cmZzR2l3YlVhUVFJbVE9PSIsIm1hYyI6ImZhOWU3YmY4NWY5NjUzZTk4ZGI0NjM4NzY0NDVlYmFmZDQ3MjI2YjhhY2E2MGRhOGJiNGQ5M2QzNjRlOTg0YWMifQ%3D%3D",
							expirationDate:+exp
						});
		chrome.cookies.set({url:"http://m.qianka.com/fe/dashboard/index.html",
							name:"gaoshou_session",
							domain:"m.qianka.com",
							path:"/",
							value:"eyJpdiI6IkMyZ3Y4VnJQWFp4dXVVY1ZoZzdKdmc9PSIsInZhbHVlIjoiUHJmcFh0STlnYXkwRjUzZW5Ic3JPTzZZWG9NRFAxR0VHMXN5VXFSSDdHcUg4S0c5N3plZ0F0ckVrOVRjUjIrMVRWcHdzYVdcL1NCUzMxWjNqV0lHRCtnPT0iLCJtYWMiOiI4ZjYyOTRjNzA1ZWI4ZTU0Y2VmNzA2ZmFjN2IwOTdjMjJkYjA4Y2IxN2Y5NGY1NDE3NTRkODBmZWQ5MDllYzdiIn0%3D",
							expirationDate:+exp
						});
		chrome.cookies.set({url:"http://m.qianka.com/fe/dashboard/index.html",
							name:"qk:guid",
							domain:".qianka.com",
							path:"/",
							value:"75308960-8829-11e5-bec9-e17ef5a1ff4b-20151111",
							expirationDate:+exp
						});

		chrome.cookies.set({url:"http://itry.com/itry/appList",
					name:"SERVERID",
					domain:"itry.com",
					path:"/",
					value:"ec0dc4249f8af0df85b70311bff7ff5c"
				});

		chrome.cookies.set({url:"http://itry.com/itry/appList",
					name:"OD",
					domain:"itry.com",
					path:"/",
					value:"3BOHSc4/SZPDVyZjgsJjSA5Iy1ZM2mnYakZASN4YqWaLJjcbPXmv3A3HPjXH6DZ4",
					expirationDate:+exp
				});

		chrome.cookies.set({url:"http://itry.com/itry/appList",
					name:"JSESSIONID",
					domain:"itry.com",
					path:"/",
					value:"1637D947236CF87D9C3FA781733D0931",
					expirationDate:+exp
				});
		sendResponse("it's done")
	};
})

//控制音乐播放

var triggerMusic = function(){
	
	$(".icon-play.jp-play").click();
	//30秒钟之后自动关闭音乐
	setTimeout(triggerMusicPause,30000);
}

var triggerMusicPause = function(tab){
	
	$(".icon-pause.jp-pause").click();

}

chrome.browserAction.onClicked.addListener(function(){
	triggerMusicPause();

	chrome.tabs.getCurrent(function(tab){
		console.log(tab);
	});
});
