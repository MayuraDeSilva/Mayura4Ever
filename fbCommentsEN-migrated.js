/*
 * Facebook Comments-Box email notifications v2.0 *for migrated boxes*
 * http://forum.developers.facebook.net/viewtopic.php?id=74644
 *
 * Copyright (c) 2011 Gil Goldshlager
 * http://facebook.com/gil.goldshlager
 * You can use this code as you want, but you must keep it free of charge!
 */

function fbCommentsEN(fromMail,toMail,sendPath) {

	FB.Event.subscribe('comment.create', function(response) {

		// Site Name
		var siteName = $('meta[property="og:site_name"]').attr('content');
		if(siteName == undefined){
			siteName = $('title').html();
		}

		// Comment Page Title
		var pageTitle = $('.fbcomments[title]').attr('title');
		if(pageTitle == undefined){
			pageTitle = $('meta[property="og:title"]').attr('content');
			if(pageTitle == undefined){
				pageTitle = $('title').html();
				if(pageTitle == undefined){pageTitle = 'ERROR: In order to present the title, you must specify a \'title\' attribute in the fb:comments tag, or a og:title tag, or a regular HTML <pre><code>&lt;title&gt;&lt;/title&gt;</code></pre> tag.';}
			}
		}

		// Email message subject text
		var mailSubject = 'A New Comment on ' + pageTitle;

		// Comment Page URL
		var pageURL = $('.fbcomments').attr('url');
		if(pageURL == undefined){
			pageURL = $('meta[property="og:url"]').attr('content');
			if(pageURL == undefined){
				pageURL = document.location.href;
			}
		}

		// Comment Date and Time
		var commentDate = new Date();
		var curr_date = commentDate.getDate();
		var curr_month = commentDate.getMonth();
		curr_month++;
		var curr_year = commentDate.getFullYear();
		var a_p = "";
		var curr_hour = commentDate.getHours();
		if (curr_hour < 12){a_p = "AM";}else{a_p = "PM";}if (curr_hour == 0){curr_hour = 12;}if (curr_hour > 12){curr_hour = curr_hour - 12;}
		var curr_min = commentDate.getMinutes();
		commentDate = curr_date + "." + curr_month + "." + curr_year + " at " + curr_hour + ":" + curr_min + " " + a_p;
		
		// The HTML email output
		var email_message =
			'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
			'<html xmlns="http://www.w3.org/1999/xhtml">'+
			'<head>'+
			'<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+
			'</head>'+
			'<body>'+
			''+
				'<div style="color:#808080; padding:10px; font-size:11px; font-family:\'lucida grande\',tahoma,verdana,arial,sans-serif;">'+
			''+
					'<h3 style="font-size:11px; font-weight:bold; padding-bottom:10px; border-bottom:1px solid #e2e2e2; margin-bottom:10px;">'+
						'A new comment posted on your site.'+
					'</h3>'+
			''+
					'<div>'+
						'- Page Title: <a href="'+ pageURL +'" style="color: #3B5998; cursor: pointer; text-decoration: none;">'+ pageTitle +'</a>'+
						'<br/>- Page URL: <a href="'+ pageURL +'" style="color: #3B5998; cursor: pointer; text-decoration: none;">'+ pageURL +'</a>'+
						'<br/>- Moderation Tool: <a href="http://developers.facebook.com/tools/comments" style="color: #3B5998; cursor: pointer; text-decoration: none;">http://developers.facebook.com/tools/comments</a>'+
					'</div>'+
			''+
				'</div>'+
			''+
			'</body>'+
			'</html>';
			
		// Sending the data to the PHP file that includes the mail() function
		$(document).ready(function(){
			$.post(sendPath,{ to: toMail, fromName: siteName, fromEmail: fromMail, subject: mailSubject, message: email_message }, "html");
		});
	});
}