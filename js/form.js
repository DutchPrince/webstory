$(function () {

  var label = $("label[for='" + $('#name').attr('id') + "']");
  console.log(label);
  label.append('cool');


  $('#form').submit(function (event) {

    var formData = {
      'name': $('input[name=full_name]').val(),
      'email': $('input[name=email]').val(),
      'tel': $('input[name=telephone]').val(),
      'comments': $('input[name=comments]').val()
    };

    $.ajax({
      type: 'POST',
      url: $('#form').attr('action'),
      data: formData,
      dataType: 'json',
      encode: true
    })
      .done(function (data) {
        console.log(data);

        if (!data.success) {
          if (data.errors.name) {
            $('#name').addClass('has-error');
            var appendError = $('#name').parent();
            appendError.children('.help-block').text(data.errors.name);
            setTimeout(function () {
              appendError.children('.help-block').text('');
            }, 8000);
          }
          if (data.errors.email) {
            $('#email').addClass('has-error');
            var appendError = $('#email').parent();
            appendError.children('.help-block').text(data.errors.email);
            setTimeout(function () {
              appendError.children('.help-block').text('');
            }, 8000);
          }

          if (data.errors.tel) {
            $('#telephone').addClass('has-error');
            var appendError = $('#telephone').parent();
            appendError.children('.help-block').text(data.errors.tel);
            setTimeout(function () {
              appendError.children('.help-block').text('');
            }, 8000);
          }

          $('#succesmessage').text('There is an error in the fields above');
          setTimeout(function () {
            $('#succesmessage').hide();
          }, 8000);
        } else {
          $('#telephone').val('');
          $('#email').val('');
          $('#name').val('');
          $('#comment').val('');
          $('#email').removeClass('has-error');
          $('#name').removeClass('has-error');
          $('#tel').removeClass('has-error');
          $('#succesmessage').text(data.message);
          setTimeout(function () {
            $('#succesmessage').hide();
          }, 8000);

        }
      })

      .fail(function (data) {
        console.log(data);
      });

    event.preventDefault();
  });

});