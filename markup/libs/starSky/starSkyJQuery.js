import StarSky from './starSky';

let StarSkyJQuery = (function ( $ ) {

  $.fn.StarsSky = function(options){

    return this.each(function(index,container){
      let newSky = new StarSky(container,options);
    });

  };

}( jQuery ));

export default StarSkyJQuery;