<?php
	$to = 'arun@massv.com, melanie.nelson@sonydadc.com, lacie.romano@sonydadc.com';
	$subject = 'Sony DADC NMS Website Contact';
	$email = $_REQUEST["email"] ;
	$from = $_REQUEST["name"];
	$headers = "From: $email";
	$message = "Name: ".$_REQUEST['name']."\nCompany: ".$_REQUEST['company']."\n\nEmail: ".$_REQUEST['email']."\nTelephone: ".$_REQUEST['phone']."\n\nMessage: ".$_REQUEST['message']; 
	if( mail($to, $subject, $message, $headers)) {
		header('HTTP/1.1 200 OK');
		//echo $_REQUEST["message"];
	} else {
		header('HTTP/1.1 500 Internal server error');
	}
?>
