		
$("#postsizebtn").bind("click",function(){

	$('.sidebar').removeClass('windowchangehidesidebar');
	
	if($(this).hasClass('fullscreen')){
		$('.sidebar').removeClass('hidesidebar');
		$(this).removeClass('fullscreen');
	}else{
		$('.sidebar').addClass('hidesidebar');
		$(this).addClass('fullscreen');
	}		
});

$('#article-category ul').bind("click",function(event){
		$('.allstyle').hide();
		$('#'+$(event.target).attr('id')+' .post-list').delay(50).fadeIn();
		alert('#'+$(event.target).attr('id')+' .post-list');
});

var postlistclickhandler = function anoymous (){		
	 if ($(window).width() <= 768) {
	  
	  if($("#postsizebtn").hasClass('fullscreen')){
		$('.sidebar').addClass('windowchangehidesidebar');
	  }
			  
	  $('.sidebar').addClass('mobile');
	  $('.post-list').bind("click",function(){
		$('.sidebar').addClass('hidesidebar');			
		$('#postsizebtn').addClass('fullscreen');
	  });	
	}else{
	
		$('.sidebar').removeClass('windowchangehidesidebar');
		
		$('.sidebar').removeClass('mobile');
		$('.post-list').unbind("click");
	} 
	return anoymous;
	
}();

$(window).resize(postlistclickhandler);