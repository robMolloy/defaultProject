
//~ ************ Date Functions ***************/
function getCurrentTime(){
	return Math.floor(Date.now() / 1000);
}

function toFormattedDateTime(timestamp){
	var t = new Date(0);
	var t1 = new Date(0);
	t.setSeconds(timestamp);
	t1.setSeconds(timestamp);
	
	var todaysDate = new Date();
	var today = t1.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0);
	
	var formatted = today ? t.toLocaleTimeString() : t.toLocaleDateString();
	
	return formatted;
}

function toShortDateTime(timestamp){
	var t = new Date(0);
	t.setSeconds(timestamp);
	var formatted = `${t.toLocaleDateString()}  ${t.toLocaleTimeString()}`;
	return formatted;
}
