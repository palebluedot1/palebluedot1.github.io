$(function () {
  // 验证账号
  function cKUserName(val) {
    var email = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/,
      phone = /^1[34578]\d{9}$/;
    return email.test(val) || phone.test(val);
  }

  // 登录处理
  (function () {
    var btnSubmit = $('.js-submit'),
        loginForm = $('.login-form'),
        formIuput = $('.form-input'),
        emailPhone = $('.username'),
        phoneNumber = $('.phone-number'),
        psd = $('.psd'),
        tabItem = $('.tabs'),
        userFlag = false,
        psdFlag = false;
    // 切换登录方式
    tabItem.on('click', '.item', function () {
      var userName = $('.user'),
          phoneBox = $('.phone-login'),
          rememberPsd = $('.js-remember-psd');
      $(this).addClass('active').siblings('.item').removeClass('active');
      if($(this).hasClass('user-psd')) {
        userName.show().find('input').removeAttr('disabled');
        phoneBox.hide().find('input').attr('disabled','true');
        rememberPsd.css('visibility','visible').find('input').removeAttr('disabled');
      } else if($(this).hasClass('phone')){
        userName.hide().find('input').attr('disabled','true');
        phoneBox.show().find('input').removeAttr('disabled');
        rememberPsd.css('visibility','hidden').find('input').attr('disabled','true');
      }
    });
    // 验证表单
    formIuput.focus(function () {
      $(this).parent().removeClass('error');
      $(this).siblings('.info').find('.fa').removeClass('fa-minus-circle').addClass('fa-exclamation-triangle');
    }).keyup(function () {
      if(cKUserName(emailPhone.val()) && psd.val() !== '') {
        btnSubmit.removeClass('disabled').removeAttr('disabled');
        userFlag = psdFlag = true;
      } else {
        btnSubmit.addClass('disabled').attr('disabled', 'true');
        userFlag = psdFlag = false;
      }
    }).blur(function () {
      if($(this).hasClass('username') || $(this).hasClass('phone-number')) {
        if(cKUserName($(this).val())) {
          $(this).parent().removeClass('error');
          userFlag = true;
        } else {
          $(this).parent().addClass('error');
          userFlag = false;
        }
      } else if($(this).hasClass('psd')) {
        if($(this).val() !== "") {
          $(this).parent().removeClass('error');
          psdFlag = true;
        } else {
          $(this).parent().addClass('error');
          psdFlag = false;
        }
      }
    });
    loginForm.submit(function () {
      return userFlag && psdFlag;
    });
  })();
});
