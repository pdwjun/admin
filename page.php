<?php
/**
 * Created by PhpStorm.
 * User: jason.wang
 * Date: 27/10/2014
 * Time: 10:14
 */

include 'save.php';
$dom=new DOMDocument('1.0');
$dom->load('data/page.xml');
$roles=$dom->documentElement;
$a = $dom->getElementsByTagName('items')->item(0);
$a->parentNode->removeChild($a);

$new = $dom->createElement("items");
$x = $dom->getElementsByTagName("data")->item(0);
$x->appendChild($new);

$echo = "d";
$data = $_POST['data'];
foreach($data as $key => $item){
    if($key != 0)
    {
        $count = count($item);
        if($item[0]!="")
        {
            $newrole = $dom->createElement("item");
            $newrole->setAttribute('p1', $item[0]);

            $child = $dom->createElement("list");
            for($i=1;$i<$count;$i++){
                $child->setAttribute('p'.($i+1), $item[$i]);
            }
            $newrole->appendChild($child);
            $new->appendChild($newrole);
            $parrole = $newrole;
        }
        else{
            $newrole = $dom->createElement("list");
            for($i=1;$i<$count;$i++){
                $newrole->setAttribute('p'.($i+1), $item[$i]);
                echo $i;
            }
            $parrole->appendChild($newrole);
        }
        save();
    }
}
$dom->save('data/page.xml');
//echo $_POST['pwd'];
echo '操作成功';

function save(){

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