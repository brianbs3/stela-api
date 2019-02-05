

var token = '';

function customerClick()
{
  // console.log('token: ' + token);
  $.ajax({
    type: 'GET',
    url: '/clients',
    dataType: 'json',
    data: {token:token},
    success: function(data){
      console.log(data);
      console.log(token);
     $('#mobileMain').html(data);
    },
    error: function(jqXHR, textStatus, errorThrown){
      if(jqXHR.status === 403) {
        alert('403');
        $html = 'PIN: <input class="input" type="tel" id="loginPin"> \
              <br> \
              <a class="button is-outlined is-link" id="loginButton">Login</a>';
        $('#mobileMain').html($html);
        setupLoginButton();
      }
      else if(jqXHR.status === 401) {
        alert('401');
      }
      else if(jqXHR.readyState == 0)
        window.location.replace(global_site_redirect);
    }
  });
}
function getMyAppointments(){
  $.ajax({
    type: 'GET',
    url: '/appointments',
    dataType: 'json',
    data: {token:token},
    success: function(data){


      $('#mobileMain').append(data['message']);

    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      if(jqXHR.status === 401) {
        $html = 'PIN: <input class="input" type="tel" id="loginPin"> \
              <br> \
              <a class="button is-outlined is-link" id="loginButton">Login</a>';
        $('#mobileMain').html($html);
      }
      else if(jqXHR.readyState == 0)
        window.location.replace(global_site_redirect);
    }
  });
}

function setupLoginButton(){
  $('#loginButton').click(function(){
    var pin = $('#loginPin').val();

    $.ajax({
      type: 'GET',
      url: '/authenticate',
      dataType: 'json',
      data: {pin:pin},
      success: function(data){
        token = data['token'];
        $html = "<a class='button is-outlined is-link'>Add Appointment</a>";
        $('#mobileMain').html($html);
        getMyAppointments();

      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        if(jqXHR.status === 401) {
          $html = 'PIN: <input class="input" type="tel" id="loginPin"> \
              <br> \
              <a class="button is-outlined is-link" id="loginButton">Login</a>';
          $('#mobileMain').html($html);
        }
        else if(jqXHR.readyState == 0)
          window.location.replace(global_site_redirect);
      }
    });
  });
}
