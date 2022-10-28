$(document).ready(function(){
    $('.carousel__inner').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/prev.png"></img></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/next.png"></img></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: false,
                    arrows: false
                }
            }
        ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    function toggleClass(item){
        $(item).each(function(i){
            $(this).on("click", function(e){
                e.preventDefault();
                $(".catalog-item__content").eq(i).toggleClass("catalog-item__content_active");
                $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
            })
        })
    }
    toggleClass("a.catalog-item__link")
    toggleClass("a.catalog-item__back")

    //modal

    $("[data-modal=consultation]").on("click", function(){
        $(".overlay, #consultation").fadeIn();
    
    });
    $(".modal__close").on("click", function(){
        $(".overlay, #consultation, #order, #thanks").fadeOut();
    });
    $(".catalog-item_btn").each(function(i){
        $(this).on("click", function(){
            $("#order .modal__subtitle").text($(".catalog-item__subtitle").eq(i).text());
            $(".overlay, #order").fadeIn();
        })
    });
    function modalValidate(classValid){
        $(classValid).validate({
            rules: {
                name: "required",
                email: {
                    required: true,
                    email: true
                },
                phone: "required",
                onfocusout: true
            },
            messages: {
                name: "Введите своё имя",
                email: {
                  required: "После с email должно быть заполнено!",
                  email: "Ваш email должен быть в формате name@domain.com!"
                },
                phone: "Введите номер телефона, иначе мы не сможем с вами связаться!"
            }
        });
    };
    modalValidate("#consultation-form");
    modalValidate("#consultation form");
    modalValidate("#order form");
    $("input[name=phone]").mask("+7 (999) 999-99 99");
    $("form").submit(function(e){
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");


            $("#consultation, #order").fadeOut();
            $(".overlay, #thanks").fadeIn();

            $("form").trigger("reset");
            return false;
        });
    });
    //scroll + pageup
    $(window).scroll(function() {
        if($(this).scrollTop() > 1600) {
            $(".pageup").fadeIn("fast");
        }   else {
            $(".pageup").fadeOut("fast");
            }
    })


    $(".pageup").on('click', function(event) {
        if (this.hash !== "") {
          event.preventDefault();
          let hash = this.hash;
          $('html, body').animate({
            scrollTop: $(hash).offset().top
          }, 800, function(){
            window.location.hash = hash;
          });
        } 
      });
    new WOW().init();
});
