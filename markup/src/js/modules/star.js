/**
 * Read;
 *
 * ES6 (arrow functions, let, const, spreadOperator)
 * ESLINT validation
 * bind apply call context this self (why we need to use), arrow function (why we don't need to use self)
 **/

var StarSky = function (container, options) {

  const FPS = 5000;
  if(!$('#'+ container).length) {
    $('#wrapper').append("<div id="+container+"></div>");//ES6 templates strings, need to use just selector and work inside
  }

  setInterval(starGenerate, FPS);

  function starGenerate() {

    const itemsGenerator = this;
    var stars = [];


    this.defaults = {
      minStarsCount: 40,
      maxStarsCount: 80,
      minStarLife: 3500,
      maxStarLife: 7500,
      minStarSize: 3,
      maxStarSize: 18,
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

        var x = Math.round(Math.random() * this.screenWidth);
        var y = Math.round(Math.random() * this.screenHeight);
        var starSize = random(this.settings.minStarSize, this.settings.maxStarSize);
        var star = new Star(x, y, starSize, i);

        stars.push(star);
      }
    }

    $.each(stars, function (index, singleStar) {
      $("#" + container).append(singleStar.draw(index).find('div').animate({ //not div. but data-attr (data-role)
        'opacity': '1',
      }, random(itemsGenerator.settings.minStarLife, itemsGenerator.settings.maxStarLife), function () {
        $(this).animate({
          'opacity': '0',
        }, random(itemsGenerator.settings.minStarLife, itemsGenerator.settings.maxStarLife), function () {
          singleStar.died = true;
          $(this).remove();
        });
      }));
    });

  }

  function Star(x, y, starSize) {

    let self = this;

    self.x = parseInt(x);
    self.y = parseInt(y);
    self.starWidth = parseInt(starSize);
    self.starHeight = parseInt(starSize);
    self.starColors = ["#ffffff", "#ffe9c4", "#d4fbff"];
    self.lifeTime = random(1000, 2300);

    self.draw = function(index) {

      var starBlock = $('<div />').html('<div class="litle_star-' + index + '"></div>'); //`<div class="lite-start-${index}"></div>`. add user content inside div (as option)

      $(starBlock).find('div').css({
        'position': 'absolute',
        'background': this.starColors[random(0, this.starColors.length)],
        'left': this.x,
        'top': this.y,
        'border-radius': '50%',
        'width': this.starWidth + 'px',
        'height': this.starHeight + 'px',
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