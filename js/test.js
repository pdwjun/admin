/**
 * Created by - on 16/10/2014.
 */
$(document).ready(function() {

    $('.jqte-test').jqte();

    // settings of status
    var jqteStatus = true;
    $(".status").click(function()
	{
        jqteStatus = jqteStatus ? false : true;
        $('.jqte-test').jqte({"status" : jqteStatus})
        });
})
