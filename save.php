<?php
/**
 * Created by PhpStorm.
 * User: -
 * Date: 27/10/2014
 * Time: 23:51
 */
function save1(){

    $con = mysql_connect("localhost","jason","lrc207107");
    if (!$con)
    {
        die('Could not connect: ' . mysql_error());
    }
    mysql_select_db('page', $con);
    $sql = 'select * from page';
    $result = mysql_query($sql);
    while($row = mysql_fetch_array($result))
    {
        echo $row['id'] . " " . $row['content'];
        echo "<br />";
    }
// some code

//mysql_close($con);
}

 