

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWFuYnMzQGdtYWlsLmNvbSIsInBhc3MiOiJicyIsImlhdCI6MTUyMjE2MzU1NywiZXhwIjoxNTIyMjQ5OTU3fQ.COzzrR762McG2-5Cb_b2EveG-pSv2bYoSGeCLt31ots';

function customerClick()
{
  $.ajax({
    type: 'GET',
    url: '/clients',
    dataType: 'json',
    data: {token:token},
    success: function(data){
      $('#stelaMain').html(data);
      $.each(data, function(k, v) {
        $('#stelaMain').append(`${v.firstName} ${v.lastName}<br>`);
      });
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      if(jqXHR.status === 403)
        alert('403');
      else if(jqXHR.status === 401)
        window.location.replace('/static/login.htm');
      else if(jqXHR.readyState == 0)
        window.location.replace(global_site_redirect);
    }
  });
}
function getMyAppointments(){
  axios.get('/clients');

}
function productClick()
{
  $('#stelaMain').html('clicked on products');
}
