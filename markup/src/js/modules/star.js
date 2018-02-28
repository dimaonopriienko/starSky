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

    this.defaults = {
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

    this.settings = $.extend({}, this.defaults, options);

    this.screenHeight = $(window).height() - this.settings.maxStarSize;
    this.screenWidth = $(window).width() - this.settings.maxStarSize;

    this.starsCount = random(this.settings.minStarsCount, this.settings.maxStarsCount);
    stars = stars.filter((star) => {
      return star.died !== true;
    });

    if (stars.length < this.starsCount) {
      for (let i = 0; i < this.starsCount; i++) {

        let x = Math.round(Math.random() * this.screenWidth);
        let y = Math.round(Math.random() * this.screenHeight);
        let starSize = random(this.settings.minStarSize, this.settings.maxStarSize);
        let starColor = this.settings.colors[random(0, this.settings.colors.length)];

        let star = new Star(x, y, starSize, starColor, this.settings.borderRadius, this.settings.text, this.settings.startOpacity);

        stars.push(star);
      }
    }

    $.each(stars, (index, singleStar) => {
      $(container).append(singleStar.draw(index).find('[data-role="star"]').animate({
        'opacity': itemsGenerator.settings.endOpacity,
      }, random(itemsGenerator.settings.minStarLife, itemsGenerator.settings.maxStarLife), function () {
        $(this).animate({
          'opacity': itemsGenerator.settings.startOpacity,
        }, random(itemsGenerator.settings.minStarLife, itemsGenerator.settings.maxStarLife), function () {
          singleStar.died = true;
          $(this).remove();
        });
      }));
    });

  }

  function Star(x, y, starSize, starColor, borderRadius, text, startOpacity) {

    this.x = parseInt(x);
    this.y = parseInt(y);
    this.starWidth = parseInt(starSize);
    this.starHeight = parseInt(starSize);

    this.draw = (index) => {

      var starBlock = $('<div />').html(`<div class="star-${index}" data-role="star">${text}</div>`); //`<div class="lite-start-${index}"></div>`. add user content inside div (as option)

      $(starBlock).find('div').css({
        'position': 'absolute',
        'background': starColor,
        'left': this.x,
        'top': this.y,
        'border-radius': borderRadius,
        'width': this.starWidth,
        'height': this.starHeight,
        'opacity': '0'
      });

      return starBlock;
    };

  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

};

export default StarSky;