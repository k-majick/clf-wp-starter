import jquery from 'jquery';
window.$ = window.jQuery = jquery;

import './vendor/jquery.easeInOutExpo.js';
import './vendor/slick.js';

"use strict";

var body = $('body'),
  App = {
    init: function() {
      this.browserCheck();
      this.navigation();
      this.headerFix();
      this.slickSlider();
      this.orphans();
    },

    browserCheck: function() {
      var isIE = /*@cc_on!@*/ !!document.documentMode,
        isEdge = /Edge\/\d./i.test(navigator.userAgent);
      if (isIE || isEdge) {
        body.addClass('ie');
      }
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        body.addClass('mobile');
      }
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        body.addClass('ios');
      }
    },

    navigation: function() {
      var lastId,
        topMenu = $(".headerNav__container"),
        navDown = $(".main__navDown"),
        navHeight = topMenu.outerHeight() + 1,
        navItems = (topMenu).find("a"),
        // Anchors corresponding to menu items
        scrollItems = navItems.map(function() {
          var item = $($(this).attr("href"));
          if (item.length) {
            return item;
          }
        });
      navItems.push(navDown[0]);

      // Bind click handler to menu items
      navItems.click(function(e) {
        var href = $(this).attr("href"),
          offsetTop = href === "#" ? 0 : $(href).offset().top - navHeight + 1;
        $('html, body').stop().animate({
          scrollTop: offsetTop
        }, 850, "easeInOutExpo");
        e.preventDefault();
      });

      // Bind to scroll
      $(window).scroll(function() {
        var fromTop = $(this).scrollTop() + navHeight + 200;
        var cur = scrollItems.map(function() {
          if ($(this).offset().top < fromTop)
            return this;
        });
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";
        if (lastId !== id) {
          lastId = id;
          navItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
        }
      });
    },

    headerFix: function() {
      var yOffset = $(".header").offset().top;
      // mobile
      if ($(window).width() < 768) {
        $(window).scroll(function() {
          if ($(window).scrollTop() > yOffset + 75) {
            $(".headerNav").css({
              'position': 'fixed',
              'top': '0',
              'left': '0',
              'box-shadow': '0 0 15px rgba(0, 0, 0, 0.5)'
            });
            $('.header__slider').css({
              'margin-top': '0'
            });
          }
          if ($(window).scrollTop() < yOffset + 75) {
            $(".headerNav").css({
              'position': 'relative',
              'box-shadow': 'none'
            });
            $('.header__slider').css({
              'margin-top': '0'
            });
          }
        });
      };
    },

    slickSlider: function() {
      $('.header__slider').slick({
        arrows: false,
        lazyLoad: 'ondemand',
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 1000,
        infinite: true,
        fade: true,
        cssEase: 'linear'
      });
      $('.activities__slider').slick({
        arrows: true,
        lazyLoad: 'ondemand',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        infinite: false,
        responsive: [{
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
      var stHeight = $('.header__slider > .slick-track').height();
      $('.header__slider > .slick-slide').css('height', stHeight + 'px');
    },

    orphans: function() {
      $("p, h2, h3, h4, h5").each(function() {
        $(this).html($(this).html().replace(/(\s)([\S])[\s]+/g, "$1$2&nbsp;"));
      });
    }
  }

$(function() {
  App.init();
});
