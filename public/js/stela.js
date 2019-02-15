

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
        $html = 'PIIIIIIN: <input class="input" type="tel" id="loginPin"> \
              <br> \
              <button class="button is-outlined is-link" id="loginButton">Login</button>';
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
    url: '/appointments/myMobileAppointments',
    dataType: 'json',
    data: {token:token},
    success: function(data){
      $('#mobileMain').html(`Logged in as: ${data['firstName']} ${data['lastName']}`);
        const $table = $("<table class='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'><tbody class='tbody'>");
      var theDate = "";
      var curDate = "";
      $.each(data['appointments'], function(){
        theDate = $(this)[0]['formattedDate'];
        if(theDate != curDate){
          const $dateTr = $("<tr class='tr'>");
          const $dateTd = $("<td colspan=5 class='td has-background-black has-text-white'><b>" + theDate + "</b></td>");
          $dateTr.append($dateTd);
          $table.append($dateTr);
          curDate = theDate;
        }
        const $tr = $("<tr class='tr'>");
        const $firstName = $("<td class='td'>" + $(this)[0]['clientFirstName'] + "</td>");
        const $lastName = $("<td class='td'>" + $(this)[0]['clientLastName'] + "</td>");
          // const $formattedDate = $("<td class=td>" + $(this)[0]['formattedDate'] + "</td>");
          const $formattedTime = $("<td class='td'>" + $(this)[0]['formattedTime'] + "</td>");
          const $appointmentType = $("<td class='td'>" + $(this)[0]['appointmentType'] + "</td>");
          const areaCode = $(this)[0]['areaCode'];
          const phonePrefix = $(this)[0]['phonePrefix'];
          const phoneLineNumber = $(this)[0]['phoneLineNumber'];
          const $phone = $("<td class='td'><a href='tel:" + areaCode + "-" + phonePrefix + "-" + phoneLineNumber + "'>(" + areaCode + ") " + phonePrefix + "-" + phoneLineNumber + "</a></td>");
        $tr.append($firstName)
            .append($lastName)
            // .append($formattedDate)
            .append($formattedTime)
            .append($appointmentType)
            .append($phone);
        $table.append($tr);
      });
        $('#mobileMain').append($table);
        $addButton = $("<div><a id=addAppointmentButton class='button is-outlined is-link'>Add Appointment</a></div><div class='content' id='addAppointmentForm'></div>");
        $('#mobileMain').prepend($addButton);

        setupAddAppointmentButton();
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
