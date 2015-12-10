   function getwxurl(url){
		 if(/micromessenger/i.test(navigator.userAgent)){
			 return url+(url.indexOf('?')>0?'&':'?')+'&micromessage=true';
		 }else{
			 return (location.origin + url);
		 }
 	}

   function hack_btnStatus(user_id,order_id,appid,detail_url,leave_num){
    	if(leave_num<=0){
        	$('#played_msg').html('<p>哎呀～暂时被抢光了!等等看吧</p>');
      		$(".msg_played").css("display","block");
      		return;
    	}

		$.ajax({
	        type : "post",
	        url : "/shike/user_click_record",
	        data : {appid:appid,user_id:user_id,order_Id:order_id,type:"app",exec_type:'list'},
	        dataType: 'text',
	        async : false,
	        success : function(num){
	        	if(num=="-1"){
	        		$('.prompt_play').html('<p>哎呀~已经被抢光了!等等看吧</p>');
	        		$(".msg_played").show();
	        	}else{
	        		location.href = getwxurl(detail_url);
	        	}
	        },
	        error:function(xhr,msg,error){
	        	console.log(msg);
	        	window.location.reload(true);
	        }
	    });		
    }
    

    function h_download_app(appid,user_id,order_Id,type,v_str,search_word,exec_type){
			$.ajax({
		        type : "post",
		        url : "/shike/user_click_record",
		        data : {appid:appid,user_id:user_id,order_Id:order_Id,type:type,v_str:v_str,search_word:search_word,exec_type:exec_type},
		        dataType: 'text',
		        async : false,
		        success : function(num){
		        	if(num=="-1"){
		        		$('.prompt_play').html('<p>哎呀~已经被抢光了!等等看吧</p>');
		        		$(".msg_played").show();
		        	}else{
		            	if(/micromessenger/i.test(navigator.userAgent)){
		        			$(".safari_top").show();
		        	        $(".Keyword_name").css({position: "absolute"});
		        	        $(".Keyword_name").css('height','0px');
		        	        $(".Keyword_name").css('width','0px');
		        	        $(".Keyword_name").css('top','-100px');
		        	        $(".Keyword_name").css('left','-100px');
		        	        return;
		            	}
		            	// download_start();
		        	}
		        }
		    });
    }

    function getApp(user_id,oid_md5,callback){
    		
        	function insideGet(){
        		
	    		$.ajax({
	    		 type:"post",
	    		 url:"/shike/getApplist/"+user_id+"/"+oid_md5,
	    		 data:{r:+new Date()},
	    		 async:false,
	    		 success:function (back) {
	        	 console.log(back);

	        	 var simpleTasks = [];
	             if(back != null && back.length >0){
	             	
	             	for(var i = 0;i<back.length;i++){
	             		
	             		if(n.status!=0 && n.status !=-9){
	             			//直接跳转到详情页面
	             			simpleTasks.push(back[i]);

	             		}
	             	}
	             }

	             if(simpleTasks.length > 0 ){
	             	backDis(simpleTasks);
	             	callback()
	             }else{
	             	setTimeout(insideGet,2000);
	             }

	         }});
         }

         function backDis(simpleTasks){
         	$.each(simpleTasks,function(index,simpleTask){
	         	var user_id = '8192586';
	         	var order_id = simpleTask.order_id;
	         	var appid = simpleTask.appid;
	         	var detail_url = simpleTask.details_url;
	         	var leave_num  = n.order_status_disp;
	         	hack_btnStatus(user_id,order_id,appid,detail_url,leave_num);
         	})
         	
         }

         insideGet();
 }