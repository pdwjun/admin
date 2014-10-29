<?php
/**
 * Created by PhpStorm.
 * User: -
 * Date: 29/10/2014
 * Time: 19:48
 */
session_start();
if(isset($_SESSION['userid'])&&$_SESSION['userid']!="")
    echo $_SESSION['userid'];