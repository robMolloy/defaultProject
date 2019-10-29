<?php
require_once('../includes/common.php');

$nav = (isset($_REQUEST['nav']) ? $_REQUEST['nav'] : '');

switch($nav){
	case 'submitIssue':
		$isu = new issue();
		$isu->updateDatarowFromRequest();
		$isu->save();
		echo $isu->sendJson();
	break;
    
	case 'saveIssue':
        $isu_id = (isset($_REQUEST['isu_id']) ? $_REQUEST['isu_id'] : '');
		$isu = new issue($isu_id);
		$isu->updateDatarowFromRequest();
		$isu->save();
		echo $isu->sendJson();
	break;
    
	case 'deleteIssue':
        $isu_id = (isset($_REQUEST['isu_id']) ? $_REQUEST['isu_id'] : '');
        $isu = new issue($isu_id);
		$isu->delete();
		echo $isu->sendJson();
	break;

	case 'getIssueList':
		$isu = new issueList();
		echo $isu->sendJson();
	break;
    
    case 'getIssueJson':
        $isu_id = (isset($_REQUEST['isu_id']) ? $_REQUEST['isu_id'] : '');
        $isu = new issue($isu_id);
        echo $isu->sendJson();
    break;
}
?>
