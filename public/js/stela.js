var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJyaWFuYnMzQGdtYWlsLmNvbSIsInBhc3MiOiJicyIsImlhdCI6MTUyMjE2MzU1NywiZXhwIjoxNTIyMjQ5OTU3fQ.COzzrR762McG2-5Cb_b2EveG-pSv2bYoSGeCLt31ots';

function customerClick()
{
  $.ajax({
    type: 'GET',
    url: '/customers',
    dataType: 'json',
    data: {token:token},
    success: function(data){
<<<<<<< HEAD
      $('#stelaMain').html(data);
=======
      $.each(data, function(k, v) {
        $('#stelaMain').append(`${v.firstName} ${v.lastName}<br>`);
      });
>>>>>>> 8e40b547b944dcf87e24fd81e5e5f5457390a334
    },
    error: function(jqXHR, textStatus, errorThrown){
      console.log(jqXHR);
      if(jqXHR.status === 403)
        alert('403');
      if(jqXHR.readyState == 0)
        window.location.replace(global_site_redirect);
    }
  });
}

function productClick()
{
  $('#stelaMain').html('clicked on products');
}
