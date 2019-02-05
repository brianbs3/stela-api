

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
      checkAJAXStatus(jqXHR,textStatus,errorThrown);
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
        $html = "<div><a id=addAppointmentButton class='button is-outlined is-link'>Add Appointment</a></div><div class='content' id='addAppointmentForm'></div>";
        $('#mobileMain').html($html);
        getMyAppointments();
        setupAddAppointmentButton();

      },
      error: function(jqXHR, textStatus, errorThrown) {
        checkAJAXStatus(jqXHR, textStatus, errorThrown);
      }
    });
  });
}

function setupAddAppointmentButton(){
  $('#addAppointmentButton').click(function(){
    $('#addAppointmentForm').html('form here...');

  });
}

function checkAJAXStatus(jqXHR, textStatus, errorThrown){

  if(jqXHR.status === 401) {
    $html = 'PIN: <input class="input" type="tel" id="loginPin"> \
              <br> \
              <a class="button is-outlined is-link" id="loginButton">Login</a>';
    $('#mobileMain').html($html);
  }
  else if(jqXHR.readyState == 0)
    window.location.replace(global_site_redirect);

}
