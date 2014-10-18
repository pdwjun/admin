/**
 * Created by - on 16/10/2014.
 */
$(document).ready(function()
{
    $.get('data/data.xml', function(d){

        $(d).find('role').each(function(){

            var $role = $(this);
            //var title = $role.attr("id");
            var role = $role.text();

            var table = "<tr><td>"+ role + "</td></tr>"

            $('#data').append(table);

        });
    });
});
