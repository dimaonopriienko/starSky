/**
 * Read;
 *
 * ES6 (arrow functions, let, const, spreadOperator)
 * ESLINT validation
 * bind apply call context this self (why we need to use), arrow function (why we don't need to use self)
 **/

var StarSky = function (container, options) {

  const FPS = 5000;

  if(!$(container).length) {
    return false;
  }

  setInterval(starGenerate, FPS);

  function starGenerate() {

    const itemsGenerator = this;
    let stars = [];

    let defaults = {
      className: 'star',
      minStarsCount: 40,
      maxStarsCount: 80,
      minStarLife: 3500,
      maxStarLife: 7500,
      minStarSize: 3,
      maxStarSize: 18,
      borderRadius: '50%',
      colors: ["#ffffff", "#ffe9c4", "#d4fbff"],
      text: '',
      startOpacity: 0,
      endOpacity: 1,
    };

    let settings = $.extend({}, defaults, options);

    let screenHeight = $(window).height() - settings.maxStarSize;
    let screenWidth = $(window).width() - settings.maxStarSize;

    let starsCount = random(settings.minStarsCount, settings.maxStarsCount);
    stars = stars.filter((star) => {
      return star.died !== true;
    });

    if (stars.length < starsCount) {
      for (let i = 0; i < starsCount; i++) {

        let x = Math.round(Math.random() * screenWidth);
        let y = Math.round(Math.random() * screenHeight);
        let starSize = random(settings.minStarSize, settings.maxStarSize);
        let starColor = settings.colors[random(0, settings.colors.length - 1)];

        let star = new Star(x, y, starSize, starColor, settings.borderRadius, settings.text, settings.startOpacity, settings.className);

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

  function Star(x, y, starSize, starColor, borderRadius, text, startOpacity, className) {

    let xPoint = parseInt(x);
    let yPoint = parseInt(y);
    let starWidth = parseInt(starSize);
    let starHeight = parseInt(starSize);

    this.draw = (index) => {

      var starBlock = $('<div />').html(`<div class="${className}" data-role="star">${text}</div>`); //`<div class="lite-start-${index}"></div>`. add user content inside div (as option)

      $(starBlock).find('div').css({
        'position': 'absolute',
        'background': starColor,
        'left': xPoint,
        'top': yPoint,
        'border-radius': borderRadius,
        'width': starWidth,
        'height': starHeight,
        'opacity': startOpacity
      });

      return starBlock;
    };

  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

};

export default StarSky;