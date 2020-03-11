function loadIndexPage(){
	displayHeaderBarContents();
	if(win_loggedIn){
        //~ loadProgress();
    }else {
        loadLoginHtml();
    }
}
