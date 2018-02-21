import merge from 'ngraph.merge'
import expose from 'ngraph.expose'

export default function (options) {

  options = merge(options, {
    dragCoeff: 0.02
  });

  let returnForce = 0.0000000002;
  
  var api = {
    update : function (body) {
      body.force.x -= options.dragCoeff * body.velocity.x;
      body.force.y -= options.dragCoeff * body.velocity.y;

	  body.force.x -= (body.pos.x * body.pos.x) * returnForce * (body.pos.x < 0 ? -1 : 1);
	  body.force.y -= (body.pos.y * body.pos.y) * returnForce * (body.pos.y < 0 ? -1 : 1);
    }
  };

  // let easy access to dragCoeff:
  expose(options, api, ['dragCoeff']);

  return api;
};