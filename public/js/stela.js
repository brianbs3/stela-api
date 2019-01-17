function customerClick()
{
  $.ajax({
    type: 'GET',
    url: '/customers',
    data: {},
    success: function(data){
      $('#stelaMain').html(data);
    },
    error: function(jqXHR, textStatus, errorThrown){
      if(jqXHR.readyState == 0)
        window.location.replace(global_site_redirect);
    }
  });
}

function productClick()
{
  $('#stelaMain').html('clicked on products');
}
