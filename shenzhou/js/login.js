
$(function(){
	
	$("#btn").click(function(){
		$('.p4').html("")
		var username = $('#username').val();
		var password = $("#password").val();
		var password2 = $("#password2").val();
		 re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
		 alert(password.length)
		    if(re.test(username)){
		      	if((password.length < 6)||(password.length > 20)) /*&& (password.length>20))*/{
		      		$('.p4').html("! 密码长度！！！")
		      	}else{
		      		if(password != password2){
		      			$('.p4').html("! 密码不一致")
		      		}
		      	}
		    }else{
		        $('.p4').html("! 邮箱格式不正确")
		    }

	})
})