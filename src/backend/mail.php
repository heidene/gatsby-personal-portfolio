<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if(isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])):
    //your site secret key
    $secret = '6LfPQJMUAAAAAIm_yRRV_boNb-z756kX4g2fMt0s';
    //get verify response data
    $verifyResponse = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$_POST['g-recaptcha-response']);
    $responseData = json_decode($verifyResponse);
    if($responseData->success):
        //contact form submission code
        $name = !empty($_POST['realname'])?$_POST['realname']:'';
        $email = !empty($_POST['email'])?$_POST['email']:'';
        $message = !empty($_POST['message'])?$_POST['message']:'';
        $subject = !empty($_POST['subject'])?$_POST['subject']:'';

        $to = 'nico@vandenhove.me';
        $htmlContent = "
            <h1>Contact request details</h1>
            <p><b>Name: </b>".$name."</p>
            <p><b>Email: </b>".$email."</p>
            <p><b>Message: </b>".$message."</p>";
        // Always set content-type when sending HTML email
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        // More headers
        $headers .= 'From:'.$name.' <'.$email.'>' . "\r\n";
        //send email
        @mail($to,$subject,$htmlContent,$headers);
            
        http_response_code(201);
        $succMsg = 'Your contact request have submitted successfully.';
    else:
        http_response_code(400);
        $errMsg = 'Robot verification failed, please try again.';
    endif;
else:
    http_response_code(400);
    $errMsg = 'Please click on the reCAPTCHA box.';
endif;

$myObj->success = $succMsg;
$myObj->error = $errMsg;
echo json_encode($myObj);
?>