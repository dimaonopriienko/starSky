(function($) {
  // значение по умолчанию - ЗЕЛЁНЫЙ
  var defaults = { color:'green' };

  // актуальные настройки, глобальные
  var options;

  $.fn.mySimplePlugin = function(params){
    // при многократном вызове функции настройки будут сохранятся, и замещаться при необходимости
    options = $.extend({}, defaults, options, params);

    $(this).click(function(){
      $(this).css('color', options.color);
    });

    return this;
  };
})(jQuery);