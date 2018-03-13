let StarSky = (container, options) => {

  if(!$(container).length) {
    return false;
  }

  let defaults = {
    starTemplate: '<div class="{{className}}" data-role="star">{{text}}</div>',
    className: 'star',
    minStarsCount: 40,
    maxStarsCount: 80,
    minStarLife: 3500,
    maxStarLife: 7500,
    minStarSize: 3,
    maxStarSize: 18,
    borderRadius: '50%',
    colors: ["#ffffff", "#ffe9c4", "#d4fbff"],
    text: [''],
    startOpacity: 0,
    endOpacity: 1,
    fps: 5000,
    getStarPosition: (settings, starQty) => {
      return {
        x: Math.round(Math.random() * ($(window).width() - settings.maxStarSize)),
        y: Math.round(Math.random() * ($(window).height() - settings.maxStarSize)),
      };
    },
    animateHandler: (elem, remove, settings) => {
      elem.animate({
        'opacity': settings.endOpacity
      }, random(settings.minStarLife, settings.maxStarLife), function(){

        remove();
      });
      // elem.animate({
      //   'opacity': settings.endOpacity,
      // }, random(settings.minStarLife, settings.maxStarLife), function () {
      //   $(this).animate({
      //     'opacity': settings.startOpacity,
      //   }, random(settings.minStarLife, settings.maxStarLife), remove);
      // })
    }
  };

  let settings = $.extend({}, defaults, options);

  setInterval(starGenerate, settings.fps);

  function starGenerate() {

    let starsCount = random(settings.minStarsCount, settings.maxStarsCount);

    let stars = [];

    stars = stars.filter((star) => {
      return star.died !== true;
    });

    if (stars.length < starsCount) {
      for (let i = 0; i < starsCount; i++) {
        let starSize = random(settings.minStarSize, settings.maxStarSize);
        let starColor = settings.colors[random(0, settings.colors.length - 1)];
        let starText = settings.text[random(0, settings.text.length - 1)];
        let className = settings.className;
        let starTemplate = settings.starTemplate;

        let star = new Star({
          position: settings.getStarPosition(settings),
          styles: {
            width: starSize,
            height: starSize,
            background: starColor,
            borderRadius: settings.borderRadius,
            opacity: settings.startOpacity,
          },
          starText,
          className,
          starTemplate
        });

        stars.push(star);
      }
    }

    $.each(stars, (index, singleStar) => {
      let elem = $(container).append(singleStar.draw(index)).find('[data-role="star"]');
let s= () => {

  singleStar.died = true;

  elem.parent().remove();
};
      settings.animateHandler(elem, s , settings);
    });

  }

  function Star({position, styles, starText, className, starTemplate}) {

    let xPoint = position.x;
    let yPoint = position.y;

    this.draw = () => {

      let starBlock = $('<div />').html(starTemplate.replace('{{className}}', className).replace('{{text}}',starText));

      $(starBlock).find('[data-role="star"]').css(
        $.extend({},
          styles,
          {
            'position': 'absolute',
            'left': xPoint,
            'top': yPoint,
          })
      );

      return starBlock;
    };

  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

};

export default StarSky;