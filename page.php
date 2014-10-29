<?php
/**
 * Created by PhpStorm.
 * User: jason.wang
 * Date: 27/10/2014
 * Time: 10:14
 */

include 'save.php';
$del = 'delete from page ';
mysql_select_db('page', $con);
mysql_query($del);
mysql_query('default-character-set=utf8');
$dom=new DOMDocument('1.0');
$meta=new DOMDocument('1.0');
$dom->load('data/page.xml');
$meta->load('data/meta.xml');
$roles=$dom->documentElement;
$metas=$meta->documentElement;
$a = $dom->getElementsByTagName('items')->item(0);
$a->parentNode->removeChild($a);

$new = $dom->createElement("items");
$x = $dom->getElementsByTagName("data")->item(0);
$x->appendChild($new);

$data = $_POST['data'];
$page_id = 1;
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
                $m = $metas->getElementsByTagName('meta')->item($i);
//                if( $m->getAttribute("option")=='文本'){
//                    $sql = "insert into page values($page_id,'".$item[$i]."')";
//                    $result = mysql_query($sql);
//                    $child->setAttribute('p'.($i+1), $page_id++);
////                    $child->setAttribute('p'.($i+1), $item[$i]);
//                    $page_id++;
//                }
//                else
                    $child->setAttribute('p'.($i+1), $item[$i]);
            }
            $newrole->appendChild($child);
            $new->appendChild($newrole);
            $parrole = $newrole;
        }
        else{
            $child = $dom->createElement("list");
            for($i=1;$i<$count;$i++){
                $m = $metas->getElementsByTagName('meta')->item($i);
//                if( $m->getAttribute("option")=='文本'){
//                    $sql = "insert into page values($page_id,'".$item[$i]."')";
//                    $result = mysql_query($sql);
//                    $child->setAttribute('p'.($i+1), $page_id++);
////                    $child->setAttribute('p'.($i+1), $item[$i]);
//                    $page_id++;
//                }
//                else
                    $child->setAttribute('p'.($i+1), $item[$i]);
            }
            $parrole->appendChild($child);
        }
    }
}
$dom->save('data/page.xml');
//echo $_POST['pwd'];
echo '操作成功';
