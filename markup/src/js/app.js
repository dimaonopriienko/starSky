//import StarSky from './modules/star';

(($) => {
 'use strict';

  $(() => {

    //var newSky = new StarSky('[data-target="sky"]');
    $('p:first,p:last').mySimplePlugin();
    $('p:eq(1)').mySimplePlugin({ color: 'red' });
  });

})(jQuery);