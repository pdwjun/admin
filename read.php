<?php
/**
 * Created by PhpStorm.
 * User: -
 * Date: 28/10/2014
 * Time: 23:24
 */
include 'save.php';

$data = $_POST['data'];
$sql = "select * from page where id=$data";
$result = mysql_query($sql);
while($row = mysql_fetch_array($result))
{
    echo  $row['content'];
}