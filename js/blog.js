var targetli = null;	
function sreenSizeControl(){
		$(".contentsizeicon").bind("click",function(){	
			if($(this).hasClass('fullscreen')){			
				$('.sidebar').removeClass('hidesidebar');
				
				$(".fullnavafterclick").addClass("fullnav");
				$(".fullnav").removeClass("fullnavafterclick");
				
				$(this).removeClass('fullscreen');
			}else{
				if($("body").hasClass('mobile')){
					$('#'+targetli).removeClass("active");
					$('#article-category .post-list').hide();
					targetli = null;
				}
								
				
				$('.sidebar').addClass('hidesidebar');
				
				$(".fullnav").addClass("fullnavafterclick");
				$(".fullnav").removeClass("fullnav");
				
				$(".fullnavafterclick").addClass('fullscreen');
			}		
		});
	}	

window.onload= function(){
	
	var postlistclickhandler = function anoymous (){		
		 if ($(window).width() <= 768) {
	
		  $('body').addClass('mobile');
		  $('body').removeClass('pc');
		  
		  $('.mobile li').removeClass("active");
		  $(".post-list").css("display","none");
		  $('.mobile .post-list').bind("click",function(event){
				$('#'+targetli).removeClass("active");
				$('#article-category .post-list').hide();
				targetli = null;
		  });
		  // $('.post-list').bind("click",function(){
			// $('.sidebar').addClass('hidesidebar');			
			// $('#postsizebtn').addClass('fullscreen');
		  // });	
		}else{			
			$('body').addClass('pc');
			$('body').removeClass('mobile');
			$(".post-list").css("display","block");
			 $('.post-list').unbind("click");
		} 
		return anoymous;
		
	}();
	$("body").css("display","block");
		
	sreenSizeControl();	
	
	
	$('#article-category ul').bind("click",function(event){
		if($('body').hasClass('mobile') && event.target.tagName.toLowerCase() == 'li'){	
		
			if(targetli === null || event.target.id != targetli){
				
				$('#'+targetli).removeClass("active");			
				$('#'+$(event.target).attr('id')).addClass("active");
				
				$('#article-category .post-list').hide();
				$('#'+$(event.target).attr('id')+' .post-list').delay(50).show();
				
				targetli = $(event.target).attr('id');
			}else{
				
				$('#'+targetli).removeClass("active");
				$('#article-category .post-list').hide();
				targetli = null;
			}
			
		}			
	});
	
	$(window).resize(postlistclickhandler);
		
};