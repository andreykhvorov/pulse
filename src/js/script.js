$(document).ready(function(){
  $('.carousel__inner').slick({
  infinite: true,
  speed: 1200,
  slidesToShow: 1,
  adaptiveHeight: true,
  prevArrow:'<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
  nextArrow:'<button type="button" class="slick-next"><img src="icons/right.svg"></button>'
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  
  function toggleSlide(item) {
    $(item). each(function (i){
      $(this).on('click', function(e){
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      }) 
    });
  };
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });
  
  $('.button_mini').each(function(i){
    $(this).on('click', function(){
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  });
  
  function validateForm(form){
    $(form).validate({
      rules: {
        name:  {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name:{
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Пожалуйста, введите не менее {0} символов!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });  
  };
  validateForm('#consultation-form');
  validateForm('#consultation form');
  validateForm('#order form');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault(); 
    
    if (!$(this).valid()) {
      return;
    }
      
    
    
      $.ajax({
        type:"POST",
        url:"mailer/smart.php",
        data:$(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('fast');
        $('form').trigger('reset');
        setTimeout(function(){
          $('#thanks, .overlay').fadeOut('slow'); 
          }, 3000);
      });
    
      return false;
    
   
  });

  
  // $('input[name=phone]').mask("+38 (999) 999-99-99");


  // $("form").each(function () {
  //     $(this).validate({
  //         rules: {
  //             name: 'required',
  //             phone: {
  //                 required: true,
  //                 minlength: 10
  //             }
  //         },
  //         messages: {
  //             name: "Введите ваше имя",
  //             phone: {
  //                 required: "Нам нужен ваш номер для связи с вами",
  //                 minlength: jQuery.validator.format("Введите не менее {0} символов!")
  //                 }
  //             },
  //       submitHandler: function (form) {
  //         $.ajax({
  //           type: "POST",
  //           url: $(form).attr('action'),
  //           data: $(form).serialize()
  //         }).done(function () {
  //             $(this).find("input").val("");
  //             $('#contacts').fadeOut();
  //             $('.overlay, #thanks').fadeIn('slow');
  //             $('form').trigger('reset');
  //         });
  //         return false;
  //       }
  //     });
  //   });


  
  
  $(window).scroll(function(){
    if($(this).scrollTop()>1600) {
      $('.pageup').fadeIn();
    }else{
        $('.pageup').fadeOut();
    }
    
  });
  $("a[href^='#']").click(function(){
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });
  new WOW().init();
});