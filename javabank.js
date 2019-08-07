var API_URL= 'http://localhost:8080/javabank5/api/customer';

$(document).ready(function(){
    fetchCustomers();
});

function fetchCustomers(){
    $.ajax({
        url:API_URL,
        async: true,
        success: function(response){
            populateCustomers(response);
        },
        error: function(request, status, error){
            console.log('SOmething went wrong: ', status, error);
            
        }
        
    });

    addCustomer();
    edit();
    deleteCust();

}

function populateCustomers(customerData){
    var customerTable=$('#table_body');
    var row;

    customerData.forEach(element => {
        var id=0;
        row ='<tr>' +
        '<td>'+ element.firstName+ 
        '</td><td>'+ element.lastName+ 
        '</td><td>'+ element.email+ 
        '</td><td>'+ element.phone+ 
        '</td><td><button type="button" class="btn btn-success btn-edit" id="edit '+element.id+'">Edit</button>'
        +'</td><td><button type="button" class="btn btn-danger btn-delete" id="delete '+element.id+'">Delete</button></td>'
        + '</tr>';

        $(row).appendTo(customerTable);
    });

    
}


function addCustomer(){

$('#addCustomer').click(postReq);

}


function postReq(){
    
    $.ajax({
        url: 'http://localhost:8080/javabank5/api/customer',
        type: 'POST',
        data: JSON.stringify({
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone:$('#phone').val()
        }),
        async: true,
        contentType: 'application/json',
        success: saveCustomer,
        error: function(request, status, error){
            console.log('SOmething went wrong: ', status, error);
        }
    });
     console.log("working")
}

function saveCustomer(){
    console.log("You have added!")
    fetchCustomers()

}


function edit(){
    $(document).on('click', '.btn-edit', function(event){
        var customerID = event.target.id.split(' ')[1];

        $.ajax({
            url:API_URL + "/"+ customerID,
            async: true,
            success: function(data){
                $('#custId').val(data.customerID);
                $('#firstName').val(data.firstName);
                $('#lastName').val(data.lastName);
                $('#email').val(data.email);
                $('#phone').val(data.phone);
                update(customerID);
                
            },
            error: function(request, status, error){
                console.log('SOmething went wrong: ', status, error);
                
            }
            
        });
     
    });
}


    function update(customerID){
        $(document).on('click', '#update', function(){
            
            $.ajax({
                url: API_URL+"/"+customerID,
                type: 'PUT',
                data: JSON.stringify({
                    id:customerID,
                    firstName: $('#firstName').val(),
                    lastName: $('#lastName').val(),
                    email: $('#email').val(),
                    phone:$('#phone').val()
                }),
                async: true,
                contentType: 'application/json',
                success: saveCustomer,
                error: function(request, status, error){
                    console.log('Something went wrong: ', status, error);
                }
             });
        })
       
}

function deleteCust(){
    $(document).on('click', '.btn-delete', function(event){
        console.log(event);
        var customerID=event.target.id.split(' ')[1];
        console.log(customerID);
        
        $.ajax({
        url:API_URL+"/"+customerID,
        type: 'DELETE',
        async: true,
        contentType: 'application/json',
        success: window.location.reload(),
        error: function () {
            console.log("Something went wrong!!");
        }
        })
    })
}


function reset(){
    $('#reset').click(reset())
}
   