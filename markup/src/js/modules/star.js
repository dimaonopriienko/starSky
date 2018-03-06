let StarSky = (container, options) => {

  const FPS = 5000;

  if(!$(container).length) {
    return false;
  }

  setInterval(starGenerate, FPS);

  function starGenerate() {

    let defaults = {
      starTemplate: '<div class="{{className}}" data-role="star">"{{text}}"</div>',
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
      // getStarPosition: (starQty) => {
      //   return {
      //     x: Math.random(),
      //     y: Math.random(),
      //   }
      // },
      // animateStarAppearance: (starEl, starQty) => {
      //
      // }
    };

    let settings = $.extend({}, defaults, options);

    let screenHeight = $(window).height() - settings.maxStarSize;
    let screenWidth = $(window).width() - settings.maxStarSize;
    let starsCount = random(settings.minStarsCount, settings.maxStarsCount);

    let stars = [];

    stars = stars.filter((star) => {
      return star.died !== true;
    });

    if (stars.length < starsCount) {
      for (let i = 0; i < starsCount; i++) {

        let x = Math.round(Math.random() * screenWidth);
        let y = Math.round(Math.random() * screenHeight);
        let starSize = random(settings.minStarSize, settings.maxStarSize);
        let starColor = settings.colors[random(0, settings.colors.length - 1)];
        let starText = settings.text[random(0, settings.text.length - 1)];
        let className = settings.className;
        let starTemplate = settings.starTemplate;
        //let star = new Star(x, y, starSize, starColor, settings.borderRadius, starText, settings.startOpacity, className);

        let star = new Star({
          position: {
            x,
            y
          },
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
      $(container).append(singleStar.draw(index).find('[data-role="star"]').animate({
        'opacity': settings.endOpacity,
      }, random(settings.minStarLife, settings.maxStarLife), function () {
        $(this).animate({
          'opacity': settings.startOpacity,
        }, random(settings.minStarLife, settings.maxStarLife), function () {
          singleStar.died = true;
          $(this).remove();
        });
      }));
    });

  }

  function Star({position, styles, starText, className, starTemplate}) {

    let xPoint = position.x;
    let yPoint = position.y;

    this.draw = () => {

      let starBlock = $('<div />').html(starTemplate.replace('{{className}}', className).replace('{{text}}',starText));
      //let starBlock = $('<div />').html(`<div class="${className}" data-role="star">${starText}</div>`);

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