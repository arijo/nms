define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',
	'libs/raphael/raphael.group',

	'shared/nms/utils/random'],
       
	function( $, _, Backbone, Raphael, Group, Random ) {

		// SVG IMAGE VIEW 
		var SvgImage = Backbone.View.extend({

			initialize: function() {

				    // DRAW THE BACKGROUND IMAGE
					var image = this.options.image, 
					    svg = $(image.svg), 
						paths = svg.find('path'),
						polygons = svg.find('polygon'),
						polylines = svg.find('polyline'),
						rects = svg.find('rect'),
					    pathEls = [],
						layout = this.options.layout,
						drawingDefaults = this.options.drawingDefaults,
						group = layout.paper.group(),
						attrs = {
							'stroke': drawingDefaults.stroke,
							'stroke-width': drawingDefaults.strokeWidth,
							'fill': drawingDefaults.fill,
							'fill-opacity': drawingDefaults.fillOpacity
						};

					// PATHS
					layout.paper.setStart();
					for( var i=0; i<paths.size(); i++) {

						var path = paths[i],
						    pathEl = layout.paper.path( $(path).attr('d'));

						pathEl.attr( attrs);

						group.push( pathEl);
					}

					// POLYLINES
					for( var i=0; i<polylines.size(); i++) {

						var polyline = polylines[i],
						    polylineEl = layout.paper.polyline( $(polyline).attr('points'));

						polylineEl.attr( attrs);

						group.push( polylineEl);
					}

					// POLYGONS
					for( var i=0; i<polygons.size(); i++) {

						var polygon = polygons[i],
						    polygonEl = layout.paper.polygon( $(polygon).attr('points'));

						polygonEl.attr( attrs);

						group.push( polygonEl);
					}

					// RECTS
					for( var i=0; i<rects.size(); i++) {

						var rect = rects[i],
							$r = $(rect),
						    rx = $r.attr('x'),
						    ry = $r.attr('y'),
						    rw = $r.attr('width'),
						    rh = $r.attr('height'),
							rtransform = $r.attr('transform'),
						    rectEl = layout.paper.rect( 
								rx, ry, rw, rh							  
							);

						rectEl.attr( attrs);

						if( rtransform) {

							rectEl.transform( rtransform);
						}

						group.push( rectEl);
					}
					pathEls = layout.paper.setFinish();

					var aspectRatio = image.width / image.height,
						scale = (layout.width / image.width) * image.scaleFactor,
						x = scale * image.x,
					    y = scale * image.y;	

					// POSITION THE IMAGE ...
					pathEls.transform(
						't' + x + ',' + y  
					);

					// ... AND THEN SCALE IT WHILE KEEPING THE ASPECT RATIO
					group.scale( scale);
			}
		});

		return SvgImage;
});
