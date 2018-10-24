$(document).ready(function(){
    if($('#result') != null){
        Read();
    }
    $('#crud_form').on('submit', function(e){
        e.preventDefault();
        $firstname = $('#firstname').val();
        $emailid = $('#emailid').val();
        $phone = $('#phone').val();
        $addr = $('#addr').val();
        $dob = $('#dob').val();
        $bgroup = $('#bgroup').val();
        $genm = ($("#radiom").is(":checked"));
        $genf = ($("#radiof").is(":checked"));
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
                success: function(){
                    Read();
                    $('#firstname').val('');
                    $('#emailid').val('');
                    $('#phone').val('');
                    $('#addr').val('');
                    $('#dob').val('');
                    $('#bgroup').val('');
                    
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

        $('#firstname').val(fname);
        $('#emailid').val(emailid);
        $('#phone').val(mphone);
        $('#addr').val(maddr);
        $('#dob').val(dt.toISOString().split('T')[0]);
        $('#bgroup').val(bgroup);



        if(mgen=="Male")
        {
            $("#radiom").prop("checked", true);
        }else
        {
            $("#radiof").prop("checked", true);
        }
        unhide();                
    
    });

    $(document).on('click', '#updatebtn', function(){
            document.getElementById("updatebtn").style.display = "none";    
        document.getElementById("create").style.display = "inline";
        $firstname = $('#firstname').val();
        $emailid = $('#emailid').val();
        $phone = $('#phone').val();
        $addr = $('#addr').val();
        $dob = $('#dob').val();
        $genm = ($("#radiom").is(":checked"));
        $genf = ($("#radiof").is(":checked"));  
        $bgroup = $('#bgroup').val();
      
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
                success: function(){
                    Read(); 
                    $('#firstname').val('');
                    $('#emailid').val('');
                    $('#phone').val('');            
                    $('#addr').val('');
                    $('#dob').val('');
                    $('#bgroup').val('');
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