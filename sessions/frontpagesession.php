<?php

error_reporting(0);

session_start();

if (isset($_SESSION['access']) && $_SESSION['access'] === true) {
    header('location: welcome.php');
    exit();
}