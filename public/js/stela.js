function customerClick()
{
  $.ajax({
    type: 'POST',
    url: '/customers',
    data: {},
    success: function(data){
      $('#stelaMain').html(data);
      $(document).tooltip();
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
