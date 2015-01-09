<?php

$to = $_POST['to'];
$subject = $_POST['subject'];
$message = stripslashes($_POST['message']);
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
$headers .= "From:".$_POST['fromName']." <".$_POST['fromEmail'].">" . "\r\n";

function spamcheck($field)
  {
  //filter_var() sanitizes the e-mail
  //address using FILTER_SANITIZE_EMAIL
  $field=filter_var($field, FILTER_SANITIZE_EMAIL);

  //filter_var() validates the e-mail
  //address using FILTER_VALIDATE_EMAIL
  if(filter_var($field, FILTER_VALIDATE_EMAIL))
    {
    return TRUE;
    }
  else
    {
    return FALSE;
    }
  }
  
  //check if the email address is invalid
  $mailcheck = spamcheck($_POST['to']);
  if ($mailcheck==FALSE){ // don't send
  }else{mail($to,$subject,$message,$headers);}

?>