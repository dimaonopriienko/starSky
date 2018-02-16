/**
 * Read;
 *
 * ES6 (arrow functions, let, const, spreadOperator)
 * ESLINT validation
 * bind apply call context this self (why we need to use), arrow function (why we don't need to use self)
 **/

var StarSky = function (container, options) {

  const FPS = 5000;
  const DIFF = 50; // another name. need to move inside options
  if(!$('#'+ container).length) {
    $('#wrapper').append("<div id="+container+"></div>");//ES6 templates strings, need to use just selector and work inside
  }

  setInterval(starGenerate, FPS);

  function starGenerate() {

    var self = this;
    var stars = [];


    self.screenHeight = $(window).height() - DIFF;
    self.screenWidth = $(window).width() - DIFF;

    self.defaults = {
      minStarsCount: 40,
      maxStarsCount: 80,
      minStarLife: 3500,
      maxStarLife: 7500,
      minStarSize: 3,
      maxStarSize: 18
    };

    self.settings = $.extend({}, self.defaults, options);

    self.starsCount = random(self.settings.minStarsCount, self.settings.maxStarsCount);

    stars = stars.filter((star) => {
      return star.died !== true;
    });

    if (stars.length < self.starsCount) {
      for (let i = 0; i < self.starsCount; i++) {

        var x = Math.round(Math.random() * self.screenWidth);
        var y = Math.round(Math.random() * self.screenHeight);
        var starSize = random(self.settings.minStarSize, self.settings.maxStarSize);
        var star = new Star(x, y, starSize, i);

        stars.push(star);
      }
    }

    $.each(stars, function (index, singleStar) {
      $("#" + container).append(singleStar.draw(index).find('div').animate({ //not div. but data-attr (data-role)
        'opacity': '1',
      }, random(self.settings.minStarLife, self.settings.maxStarLife), function () {
        $(this).animate({
          'opacity': '0',
        }, random(self.settings.minStarLife, self.settings.maxStarLife), function () {
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

      var starBlock = $('<div />').html('<div class="litle_star-' + index + '></div>'); //`<div class="lite-start-${index}"></div>`. add user content inside div (as option)

      $(starBlock).find('div').css({
        'position': 'absolute',
        'background': this.starColors[random(0, this.starColors.length)],
        'left': this.x,
        'top': this.y,
        'border-radius': '50%', //to option
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