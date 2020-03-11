function ucFirst(str1){
	return str1.charAt(0).toUpperCase() + str1.slice(1);
}

function ucFirstOfEachWord(str){
	return str.split(' ').map((val)=>ucFirst(val)).join(' ');
}

function formatStringForTitle(str){
	return ucFirstOfEachWord(str.replace(/-/g, " "));
}

function formatString(str){
	return `${str.replace(/-/g, " ")}`;
}

function escapeHtmlTags(str){
	return str.replace(new RegExp('<', 'g'), '&lt');
}
