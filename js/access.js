/**
 * Created by - on 29/10/2014.
 */

$(document).ready(function() {
    $.ajax({
        url: 'access.php',
        success: function (d) {
            if(d==''){
                location.href ='./'
            }
        }
    })

})