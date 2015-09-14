
var postmodel = Backbone.Model.extend({	
	url: function(){
		return this.instanceUrl;
	},	
	initialize: function(props){
		this.instanceUrl = props.url;
	}  
});

var Asidemodel = Backbone.Model.extend({	
	url: '/blog/post/allpostinfo.json',
});

var postview = Backbone.View.extend({
	tagName: "div",
	id: "post",
	template: _.template($("#post-template").html()),
	render: function(){
		this.$el.html(this.template(this.model));
		return this;
	},
});

var Asideview = Backbone.View.extend({
	tagName: "div",
	className: "aside-wrapper",
	events: {               
				'click #closebtn-hidesidebar': 'hidesidebar',
				'click #nav-showsidebar': 'showsidebar',							
    },
	hidesidebar: function(){
		$('body').addClass('fullscreen');
	},
	showsidebar: function(){
		$('body').removeClass('fullscreen');
	},
	
	template: _.template($("#allpostinfo-template").html()),
	render: function(){
		this.$el.html(this.template(this.model));
		return this;
	},
});

var targetli = null;
var AsideMobileview = Backbone.View.extend({
	tagName: "div",
	className: "aside-wrapper",
	events: {
                'click #article-category ul': 'togglepostlist',
				'click .post-list': 'initcategoryli',
				'click #closebtn-hidesidebar': 'hidesidebar',
				'click #nav-showsidebar': 'showsidebar',
    },
	template: _.template($("#allpostinfo-template").html()),
	togglepostlist: function(event){
		if(event.target.tagName.toLowerCase() == 'li'){	
		
			if(targetli === null || event.target.id != targetli){
				
				$('#'+targetli).removeClass("active");			
				$('#'+$(event.target).attr('id')).addClass("active");
				
				$(".sidebar:first").find('.post-list').hide();				
				$('#'+$(event.target).attr('id')+' .post-list').delay(50).show();
				
				targetli = $(event.target).attr('id');
			}else{			
				$('#'+targetli).removeClass("active");
				$(".sidebar:first").find('.post-list').hide();
				targetli = null;
			}
		}
	},
	initcategoryli: function(){			
				$('#'+targetli).removeClass("active");
				$(".sidebar:first").find('.post-list').hide();
				targetli = null;
	},
	hidesidebar: function(){
		$('body').addClass('fullscreen');
		
		$('#'+targetli).removeClass("active");
		$(".sidebar:first").find('.post-list').hide();
		targetli = null;
	},
	showsidebar: function(){
		$('body').removeClass('fullscreen');
	},
	render: function(){
		this.$el.html(this.template(this.model));
		return this;
	},
});

var asidemodel = (new Asidemodel()).fetch({
			async: false,
			sucess: function(aside){
				console.log("success");
			}
		});
asidemodel = eval("("+asidemodel.responseText+")");		
var asidepcview = new Asideview({
				model: asidemodel,
});

var asidmobileview = new AsideMobileview({
				model: asidemodel,
});


var app = Backbone.Router.extend({
	el: $(".wrapper"),
	routes: {
		'': 'init',
		'post/*name': 'getpost',
	},	
	initialize: function() {
        $(window).on("resize", this.updateCSS);
    },	
	updateCSS: function(){
		 
		 if ($(window).width() <= 768) {
			 $('body').addClass('mobile');
			 $('body').removeClass('pc');
			 
			 asidepcview.$el.hide();
			 asidmobileview.$el.show();
			 
			 
			 }else{
				 
				 
				 $('body').addClass('pc');
				 $('body').removeClass('mobile');
				
				asidepcview.$el.show();
				 asidmobileview.$el.hide();
				 
				 
				 asidmobileview.initcategoryli();
	
		}
	}, 
	init: function(){		
		wholeapp.getpost("post-test");
		
	},
	
	
	
	getpost: function(name){
				
		if ($(window).width() <= 768) {
			 $('body').addClass('mobile');
			 $('body').removeClass('pc');
			 asidepcview.$el.hide();
			 //asidmobileview.$el.show();
			 wholeapp.asideView = asidmobileview;
			 wholeapp.render(asidmobileview);
			 wholeapp.render(asidepcview);
			
			 }else{
				 				 
				  $('body').addClass('pc');
				 $('body').removeClass('mobile');
				 
				
			     asidmobileview.$el.hide();
				 wholeapp.asideView = asidepcview;
				 wholeapp.render(asidmobileview);
			     wholeapp.render(asidepcview);
		}
		
		
		
		var url = '/blog/post/'+name + '.json';
		
		var post= (new postmodel({url:url})).fetch({
			    async: false,
				success: function(post){
					console.log("success");
				},
				error: function(){
					console.log("error");
				}
		});		
		post = eval("("+post.responseText+")");
		
		var view = new postview({
						model: post,
					});
		
		if (wholeapp.postView) {
            wholeapp.postView.remove();
        }
		wholeapp.postView = view;
		wholeapp.render(view);
	},
	
	render: function(view){		
		wholeapp.el.append(view.render().el);
	}
});
 
 var wholeapp = new app();
 
 Backbone.history.start();