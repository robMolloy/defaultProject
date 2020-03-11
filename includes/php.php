<?php

//~ phpFuncs
//~ primary (keep order - secondary funtions use primary functions)
include('phpFuncs/php_initSettings.php');
//~ secondary
include('phpFuncs/php_db.php');
include('phpFuncs/php_errorLog.php');
include('phpFuncs/php_headTags.php');
include('phpFuncs/php_user.php');


//~ classes
//~ include('/includes/classes');
include('phpClasses/class_defaultObject.php');
include('phpClasses/class_defaultListObject.php');
include('phpClasses/class_user.php');

?>
