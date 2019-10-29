<?php require_once('includes/common.php'); ?>

<!DOCTYPE html>
<html>
<head>
	<?php echo getHeadTags('Home');?>
</head>

<body onload="
    <?php 
        if(userIsLoggedIn()){echo 'showBlankIssueEditPanel();showIssueListPanels();';}
        else{echo 'appendToWrapperMain(getLoginHtml({\'useGet\':true}));';}
    ?>
">
	<?php echo getHeaderBarHtml(); ?>
	
	<main>
		<div class="wrapperMain" id="wrapperMain">
		</div>
	</main>
    <div id="responseLogIcon" onclick="toggleResponseLog()"></div>
</body>
