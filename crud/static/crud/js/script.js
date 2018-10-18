$(document).ready(function(){
    if($('#result') != null){
        Read();
    }
    $('#crud_form').on('submit', function(e){
        e.preventDefault();
        $firstname = $('#firstname').val();
        $lastname = $('#lastname').val();
        $phone = $('#phone').val();
        $addr = $('#addr').val();
        $genm = ($("#radiom").is(":checked"));
        $genf = ($("#radiof").is(":checked"));
        $gen=true;    
            if($genm==1)
            {
                $gen=true;
            }else
            {
                $gen=false;
            }
            

        $id = $(this).attr('name');



        if($firstname == "" || $lastname == ""){
            alert("Please complete the required field");
        }else{
            $.ajax({
                url: 'create',
                type: 'POST',
                data: {
                    firstname: $firstname,
                    lastname: $lastname,
                    phone: $phone,
                    addr: $addr,
                    gender:$gen,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                },
                success: function(){
                    Read();
                    $('#firstname').val('');
                    $('#lastname').val('');
                    $('#phone').val('');
                    $('#addr').val('');
                }
            });
        }
        return false;
    });

    $(document).on('click', '.edit', function(){
        $id = $(this).attr('name');
                    
        var fname=$(this).closest('tr').find('td:eq(0)').text();
        var lname=$(this).closest('tr').find('td:eq(1)').text();
        var mphone=$(this).closest('tr').find('td:eq(2)').text();
        var maddr=$(this).closest('tr').find('td:eq(3)').text();
        $('#firstname').val(fname);
        $('#lastname').val(lname);
        $('#phone').val(mphone);
        $('#addr').val($maddr);
        unhide();                
    
    });

    $(document).on('click', '#updatebtn', function(){
            document.getElementById("updatebtn").style.display = "none";    
        document.getElementById("create").style.display = "inline";
        $firstname = $('#firstname').val();
        $lastname = $('#lastname').val();
        $phone = $('#phone').val();
        $addr = $('#addr').val();

        
        if($firstname == "" || $lastname == ""){
            alert("Please complete the required field");
        }else{
            $.ajax({
                url: 'update/' + $id,
                type: 'POST',                
                data: {
                    firstname: $firstname,
                    lastname: $lastname,
                    phone: $phone,                    
                    addr: $addr,
                    gender:$gen,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(){
                    Read(); 
                    $('#firstname').val('');
                    $('#lastname').val('');
                    $('#phone').val('');            
                    $('#addr').val('');                    
                    console.log($addr);       
                }
            });
        }

    });

    $(document).on('click', '.delete', function(){
        $id = $(this).attr('name');        
        $.ajax({            
            url: 'delete/' + $id,
            type: 'POST',
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success: function(){
                Read();                
                alert("Deleted!");

            }
        });
    });

});

function unhide(){
    document.getElementById("updatebtn").style.display = "inline";    
    document.getElementById("create").style.display = "none";

}


function Read(){

    $.ajax({
		url: 'read',
		type: 'POST',
		async: false,
		data:{
			res: 1,
			csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
		},
		success: function(response){            
			$('#result').html(response);
            $("#example").dataTable();
		}
    });
}