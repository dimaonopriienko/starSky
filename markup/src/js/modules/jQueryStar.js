import StarSky from './star';
let StarPlugin = (function ( $ ) {

  $.fn.StarsSky = function(options){
    return this.each(function(index,container){

      var newSky = new StarSky(container,options);

    });

  };

}( jQuery ));

export default StarPlugin;