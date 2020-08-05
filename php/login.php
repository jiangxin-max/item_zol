<?php
include "conn.php";

if (isset($_POST['tel']) && isset($_POST['pass'])) {
    $tel = $_POST['tel'];
    $pass = $_POST['pass'];
    $result = $connect->query("SELECT * FROM form1 WHERE tel='$tel' AND password='$pass'");
    if ($result->fetch_assoc()) { //匹配成功
        echo true;
    } else { //匹配不成功
        echo false;
    }
}
