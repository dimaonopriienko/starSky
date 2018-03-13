import StarSky from './starsky';

let wrapper = (function ( $ ) {

  $.fn.StarsSky = function(options){

    return this.each(function(index,container){
      let lib = new StarSky(container,options);
    });

  };

}( jQuery ));

export default wrapper;