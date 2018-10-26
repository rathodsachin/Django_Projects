$(document).ready(function(){

    if($('#result') != null){
        Read();
    }
    $('#crud_form').on('submit', function(e){
        e.preventDefault();        
        $firstname = $('#id_firstname').val();
        $emailid = $('#id_email_address').val();
        $phone = $('#id_phone').val();
        $addr = $('#id_addr').val();
        $dob = $('#id_dob').val();
        $bgroup = $('#id_bgroup').val();
        $genm = ($("#id_gender_0").is(":checked"));
        $genf = ($("#id_gender_1").is(":checked"));
        $gen="True";    
            if($genm==1)
            {
                $gen="True";
            }else
            {
                $gen="False";
            }            

        $id = $(this).attr('name');
        if($firstname == "" || $emailid == ""){
            alert("Please complete the required field");
        }else{
            $.ajax({
                url: 'create',
                type: 'POST',
                data: {
                    firstname: $firstname,
                    email_address: $emailid,
                    phone: $phone,
                    addr: $addr,
                    gender:$gen,
                    dob:$dob,
                    bgroup:$bgroup,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                },
                 success: function(data) {
                    console.log(data.form_is_valid);
                    if (data.form_is_valid) {
                            alert("Employee created!");  // <-- This is just a placeholder for now for testing                            
                            $('#id_firstname').val('');
                            $('#id_email_address').val('');
                            $('#id_phone').val('');
                            $('#id_addr').val('');
                            $('#id_dob').val('');
                            $('#id_bgroup').val('');
                            $("#id_gender_0").prop("checked", true); 
                            $( "ul" ).remove( ".errorlist" ); 
                            Read();                    
                        }
                    else {
                        //console.log(data); 
                        
                        $('#modal-emp').html(data.html_form);                    

                    }
                },
                error: function() {
                    console.log("Errorssssss part");
                }
            });
        }
        return false;
    });


    $(document).on('click', '.edit', function(){
        $id = $(this).attr('name');
                    
        var fname=$(this).closest('tr').find('td:eq(0)').text();
        var emailid=$(this).closest('tr').find('td:eq(1)').text();
        var mphone=$(this).closest('tr').find('td:eq(2)').text();
        var maddr=$(this).closest('tr').find('td:eq(3)').text();
        var mgen=$(this).closest('tr').find('td:eq(4)').text();
        var mdob=$(this).closest('tr').find('td:eq(5)').text();
        var bgroup=$(this).closest('tr').find('td:eq(6)').text();
        var dt = new Date(mdob);         
        dt.setDate(dt.getDate() + 1);

        $('#id_firstname').val(fname);
        $('#id_email_address').val(emailid);
        $('#id_phone').val(mphone);
        $('#id_addr').val(maddr);
        $('#id_dob').val(dt.toISOString().split('T')[0]);
        $('#id_bgroup').val(bgroup);

        if(mgen=="Male")
        {
            $("#id_gender_0").prop("checked", true);
        }else
        {
            $("#id_gender_1").prop("checked", true);
        }
        unhide();                
    
    });

    $(document).on('click', '#updatebtn', function(){        
        $firstname = $('#id_firstname').val();
        $emailid = $('#id_email_address').val();
        $phone = $('#id_phone').val();
        $addr = $('#id_addr').val();
        $dob = $('#id_dob').val();
        $genm = ($("#id_gender_0").is(":checked"));
        $genf = ($("#id_gender_1").is(":checked"));  
        $bgroup = $('#id_bgroup').val();
      
        $gen="True";    
            if($genm==1)
            {
                $gen="True";
            }else
            {
                $gen="False";
            }   

        
        if($firstname == "" || $emailid == ""){
            alert("Please complete the required field");
        }else{
            $.ajax({
                url: 'update/' + $id,
                type: 'POST',                
                data: {
                    firstname: $firstname,
                    email_address: $emailid,
                    phone: $phone,                    
                    addr: $addr,
                    gender:$gen,
                    dob:$dob,
                    bgroup:$bgroup,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
               
                success: function(data){
                    console.log(data.form_is_valid);
                    if (data.form_is_valid) {
                            alert("Employee Updated!");  // <-- This is just a placeholder for now for testing                            
                            $('#id_firstname').val('');
                            $('#id_email_address').val('');
                            $('#id_phone').val('');
                            $('#id_addr').val('');
                            $('#id_dob').val('');
                            $('#id_bgroup').val('');
                            $("#id_gender_0").prop("checked", true);                      
                            document.getElementById("updatebtn").style.display = "none";    
                            document.getElementById("create").style.display = "inline";
                            $("p").removeClass("errorlist");
                            Read();
                            $( "ul" ).remove( ".errorlist" );
                        }
                    else {
                        //console.log(data);                         
                        $('#modal-emp').html(data.html_form);
                        document.getElementById("updatebtn").style.display = "inline";    
                            document.getElementById("create").style.display = "none";                    
                    }
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