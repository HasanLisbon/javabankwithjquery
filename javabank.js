var API_URL= 'http://localhost:8080/javabank5/api/customer';

$(document).ready(function(){
    fetchCustomers();
    $("#reset").click(formReset);
});

//gets the customer info with get request
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

//populates the page with customer info
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

//calls the postreq method on click of the button
function addCustomer(){

$('#addCustomer').click(postReq);

}

//sends post request to add customer to the database
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
//This method is a method to call the fetchcustomer, I created this to name of the method more sensible
function saveCustomer(){
    console.log("You have added!")
    fetchCustomers()

}

//This method takes all the information of the customer with get request from database and passes it to the form 
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

//This method sends a put request using the id of customer
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


//This method deletes the customer using delete request through ajax
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

function formReset(){
    $("#custForm").trigger("reset");
}
   