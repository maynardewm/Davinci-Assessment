<!DOCTYPE HTML>
<html>
    <head>
        <title>Da Vinci</title>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
         <script src="js/jquery.transit.min.js"></script>
         <script src="js/fastclick.js" type="text/javascript"></script>
         
         <!-- jQuery SVG -->
         <link rel="stylesheet" type="text/css" href="css/jquery.svg.css"> 
		 <script type="text/javascript" src="js/jquery.svg.min.js"></script>
         <script type="text/javascript" src="js/jquery.svganim.min.js"></script>

        <!-- app code -->
        <link rel="stylesheet/less" type="text/css" href="css/style.less" />
        <link rel="stylesheet/less" type="text/css" href="css/menu-style.less" />
        <script src="js/less-1.7.5.min.js" type="text/javascript"></script>
        <script src="js/main.js" type="text/javascript"></script>
        <script src="js/menu-js.js" type="text/javascript"></script>
    </head>
    <body>
    <?php require("main-menu.php"); ?>
    <!--<div id="center-box"></div>-->
    <div id="page-wrapper">
        <div id="tier-panel"></div>
        <div id="right-panel-wrapper"></div>
        <div id="davinci-svg">
            <?php include("images/davinci.svg"); ?>
        </div><!--davinci-svg-->
        <div id="patient-info">
        
        </div><!--patient-info-->
       <!-- <object id="davinci-svg" type="image/svg+xml" data="images/davinci.svg">Your browser does not support SVG</object>-->
   </div><!--page-wrapper-->
    </body>
</html>
