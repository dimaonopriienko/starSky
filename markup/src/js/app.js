import StarSky from '../../libs/starSky/starsky';
//import wrapper from '../../libs/starSky/starsky.jquery';

(($) => {
 'use strict';

  $(() => {
     // $('[data-target="sky"]').StarsSky({
     //   colors: ['red', 'green'],
     // });

    var newSky = new StarSky('[data-target="sky"]');

  });

})(jQuery);