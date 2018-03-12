import StarSky from '../../libs/starSky/starSky';
//import StarSkyJQuery from '../../libs/starSky/starSkyJQuery';

(($) => {
 'use strict';

  $(() => {
     // $('[data-target="sky"]').StarsSky({
     //   colors: ['red', 'green'],
     // });
    var newSky = new StarSky('[data-target="sky"]');

  });

})(jQuery);