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
        
    })

}

function populateCustomers(customerData){
    var customerTable=$('#table_body');
    var row;

    customerData.forEach(element => {
        row ='<tr>' +
        '<td>'+ element.firstName+ 
        '</td><td>'+ element.lastName+ 
        '</td><td>'+ element.email+ 
        '</td><td>'+ element.phone+ 
        '</td><td><button type="button" class="btn btn-success">Edit</button>'
        +'</td><td><button type="button" class="btn btn-danger">Delete</button></td>'
        + '</tr>';

        $(row).appendTo(customerTable);
    });

    $('#addCustomer').click(postReq);

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
            success: addCustomer,
            error: function(request, status, error){
                console.log('SOmething went wrong: ', status, error);
            }
        });
         console.log("working")
    }



    function addCustomer(){
        alert('You have successfully submitted');
        fetchCustomers()

    }
    
}