<?php
if(isset($_POST['email'])){
    $subject = "Message de l'application Otium";
    $to = "nadia.essoubai@edu.gobelins.fr";
    $from = addSlashes($_POST['email']);
    $infoUser = " Mail: ".$from;
    $finalMessage = "Cette personne souhaite avoir un devis pour son objet 3D : \n\r".$from;
    
    mail ($to, $subject, $finalMessage, $infoUser); 
    echo 'Votre demande a été envoyé. Merci!';
}
else{
    echo "Votre demande n'a pas pu être envoyée. Réessayez plus tard";
}
?>