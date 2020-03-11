<?php
/*
	$isu = new issue();
	$org = new organisation();
		let emptyDatarows = {};
		emptyDatarows[\''.$isu->table['label'].'\'] = JSON.parse(\''.$isu->sendJson().'\').datarow;
		* 
		* 
*/
?>
<script>
    win_loggedIn = <?php echo userIsLoggedIn() ? 'true' : 'false'; ?>;
    win_pages = ['contacts','records'];
</script>

<script type="text/javascript" src="includes/jsFuncs/ajax.js"></script>
<script type="text/javascript" src="includes/jsFuncs/dom_alerts.js"></script>
<script type="text/javascript" src="includes/jsFuncs/dom_header.js"></script>
<script type="text/javascript" src="includes/jsFuncs/dom_main.js"></script>
<script type="text/javascript" src="includes/jsFuncs/dom_responseLog.js"></script>
<script type="text/javascript" src="includes/jsFuncs/generic.js"></script>
<script type="text/javascript" src="includes/jsFuncs/man_date.js"></script>
<script type="text/javascript" src="includes/jsFuncs/man_json.js"></script>
<script type="text/javascript" src="includes/jsFuncs/man_string.js"></script>
<script type="text/javascript" src="includes/jsFuncs/page_direct.js"></script>
<script type="text/javascript" src="includes/jsFuncs/page_login.js"></script>
<script type="text/javascript" src="includes/jsFuncs/vars_user.js"></script>


