		function ajax(method, url, data, successfn){

			//1、创建ajax对象
			var xhr = null;
			try{
				xhr = new XMLHttpRequest();
			}catch(error){
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if(method == "get" && data){
				url += "?" + data;
			}
			xhr.open(method, url, true);
			if(method == "get"){
				xhr.send();
			}else{
				xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
				xhr.send(data);
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						//【注】ajax下载完数据以后,每一个程序对下载到的数据的处理都不一样,
						//那么我们是不是需要自定义下载完数据以后的代码
						successfn(xhr.responseText);
					}else{
						alert("出错了:Err:" + xhr.status);
					}
				}
			}
		}

	














