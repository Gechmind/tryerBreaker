var circle;
var circleInterval;

document.getElementById('save').onclick = function(){
	circle = document.getElementById("circle").value;
	circleInterval = document.getElementById("normalInterval").value;
	console.log("sucess save");

	//通知background 修改 deprecate 
	chrome.runtime.sendMessage({type:"option",circle:circle,circleInterval:circleInterval}, function(response){
	    console.log(response);
	});

	// if(circle == "1" && message.circle == "0"){

	chrome.tabs.query({url: "http://itry.com/*"}, function(tabs) { 

 		chrome.tabs.sendMessage(tabs[0].id, {type:"circleChange",circle:circle}, function(response) { 
 				console.log(response);     
 			}); 

	});

	chrome.tabs.query({url: "http://r.ow.domob.cn/*"}, function(tabs) { 

 		chrome.tabs.sendMessage(tabs[0].id, {type:"circleChange",circle:circle}, function(response) {    
 			console.log(response);  
 		}); 

	});

	chrome.tabs.query({url: "http://ow.miidi.net/ow*"}, function(tabs) { 

 		chrome.tabs.sendMessage(tabs[0].id, {type:"circleChange",circle:circle}, function(response) {    
 			console.log(response);  
 		}); 

	});

		// }

}

