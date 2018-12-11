<?php
$errors = array();
$data = array();

$first_name = $_POST['name'];
$email_from = $_POST['email'];
$telephone = $_POST['tel'];
$comments = $_POST['comments'];


    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    if(!preg_match($email_exp,$email_from)) {
      $errors['email'] = 'Email is wrong.';
    }

    $string_exp = "/^[A-Za-z .'-]+$/";

    if(!preg_match($string_exp,$first_name)) {
      $errors['name'] = 'Name is wrong.';
    }

    function validate_phone_number($telephone) {
        $filtered_phone_number = filter_var($telephone, FILTER_SANITIZE_NUMBER_INT);
        $phone_to_check = str_replace("-", "", $filtered_phone_number);
        if (strlen($phone_to_check) < 6 || strlen($phone_to_check) > 14) {
            return false;
        } else {
          return true;
        }
    }

    if (validate_phone_number($telephone) == false)
      $errors['tel'] = "Phone number is invalid";

    if ( ! empty($errors)) {

        $data['success'] = false;
        $data['errors']  = $errors;
    } else {

      $email_to = "info@mywebstory.nl";
      $email_subject = "Contactformulier webstory.nl";
      $email_from = $_POST['email'];

      function clean_string($string) {
        $bad = array("content-type","bcc:","to:","cc:","href");
        return str_replace($bad,"",$string);
      }

      $email_message .= "First Name: ".clean_string($first_name)."\n";
      $email_message .= "Email: ".clean_string($email_from)."\n";
      $email_message .= "Telephone: ".clean_string($telephone)."\n";
      $email_message .= "Comments: ".clean_string($comments)."\n";

      $headers = 'From: '.$email_from."\r\n".
      'Reply-To: '.$email_from."\r\n" .
      'X-Mailer: PHP/' . phpversion();
      @mail($email_to, $email_subject, $email_message, $headers);

      $data['success'] = true;
      $data['message'] = 'De email is verzonden!';
    }
    echo json_encode($data);
  ?>