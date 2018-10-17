$(document).ready(function(){
    if($('#result') != null){
        Read();
    }
    $('#crud_form').on('submit', function(e){
        e.preventDefault();
        $firstname = $('#firstname').val();
        $lastname = $('#lastname').val();
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
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(){
                    Read();
                    $('#firstname').val('');
                    $('#lastname').val('');                    
                }
            });
        }
        return false;
    });

    $(document).on('click', '.edit', function(){
        $id = $(this).attr('name');
                    
        var fname=$(this).closest('tr').find('td:eq(0)').text();
        var lname=$(this).closest('tr').find('td:eq(1)').text();
        $('#firstname').val(fname);
        $('#lastname').val(lname);
        unhide();                
    
    });

    $(document).on('click', '#updatebtn', function(){
            document.getElementById("updatebtn").style.display = "none";    
        document.getElementById("create").style.display = "inline";        
    
        $firstname = $('#firstname').val();
        $lastname = $('#lastname').val();

        if($firstname == "" || $lastname == ""){
            alert("Please complete the required field");
        }else{                                        
            $.ajax({
                url: 'update/' + $id,
                type: 'POST',
                data: {
                    firstname: $firstname,
                    lastname: $lastname,                    
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                success: function(){
                    Read(); 
                    $('#firstname').val('');
                    $('#lastname').val('');   
                    alert('Updated!');
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