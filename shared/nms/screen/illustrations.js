define([
	'jquery',
	'underscore',
	'backbonejs',
	'raphael',
	
	'text!shared/nms/screen/illustrations/paths/default-image.path',
	'text!shared/nms/screen/illustrations/paths/gears2.path',

	// SCREEN BACKGROUND IMAGES
	//'text!images/medialifecycle/contentcreation.svg',
	//'text!images/medialifecycle/supplychainsolutions.svg',
	//'text!images/medialifecycle/marketplace.svg',
	//'text!images/seeusinaction/filmtv_HDTV.svg',
	//'text!images/seeusinaction/music.svg',
	//'text!images/seeusinaction/socialplatforms.svg',
	//'text!images/seeusinaction/consumerexperiences_back.svg',
	//'text!images/seeusinaction/consumerexperiences_front.svg',
	'text!images/aboutus/news.svg',
	'text!images/aboutus/careers.svg',
	//'text!images/aboutus/contactus_map.svg',
	//'text!images/aboutus/contactus_lines.svg',

	'shared/nms/screen/illustrations/home',
	'shared/nms/screen/illustrations/medialifecycle',
	'shared/nms/screen/illustrations/seeusinaction',
	'shared/nms/screen/illustrations/aboutus',
	'shared/nms/screen/illustrations/login',

	'shared/nms/screen/illustrations/contentcreation',
	'shared/nms/screen/illustrations/filmtelevision',
	'shared/nms/screen/illustrations/supplychainsolutions',
	'shared/nms/screen/illustrations/marketplaceservices',
	'shared/nms/screen/illustrations/music',
	'shared/nms/screen/illustrations/socialplatforms',
	'shared/nms/screen/illustrations/consumerexperiences',
	'shared/nms/screen/illustrations/news',
	'shared/nms/screen/illustrations/careers',
	'shared/nms/screen/illustrations/contactus'
	
	/* NEXT SCREEN ILLUSTRATION */],
       

	function( $, _, Backbone, Raphael, 

		  defaultImagePath,
		  gears2ImagePath,

		  // SCREEN BACKGROUND IMAGES
		  //contentCreationSvg,
		  //supplyChainSolutionsSvg,
		  //marketPlaceServicesSvg,
		  //filmTvSvg,
		  //musicSvg,
		  //socialPlatformsSvg,
		  //customerExperiencesBackSvg,
		  //customerExperiencesFrontSvg,
		  newsSvg,
		  careersSvg,
		  //contactUsMapSvg,
		  //contactUsLinesSvg,

		  HomeIllustrations,
		  MedialifecycleIllustrations,
		  SeeusinactionIllustrations,
		  AboutusIllustrations,
		  LoginIllustrations,
		
		  ContentcreationIllustrations,
		  FilmtelevisionIllustrations,
	          SupplychainsolutionsIllustrations,
	          MarketplaceservicesIllustrations,
	          MusicIllustrations,
		  SocialplatformsIllustrations,
		  ConsumerexperiencesIllustrations,
		  NewsIllustrations,
		  CareersIllustrations,
		  ContactusIllustrations
	
	          /* NEXT SCREEN ILLUSTRATION */	) {


			// ILLUSTRATIONS BASE URL
			var baseUrl = NMS.SETTINGS.baseUrl;

			// ADD POLYGON API TO RAPHAEL
			Raphael.fn.polygon = function( pointString) {

				return this.path("M" + pointString + "z");
			}

			// ADD POLYLINE API TO RAPHAEL
			Raphael.fn.polyline = function( pointString) {

				return this.path("M" + pointString);
			}

			return {
				
				'home': {
					view: HomeIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.home .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#5bdef1',
							foreground1: '#cf51c8',
							foreground2: '#b91bab',
							foreground3: '#5ce6af',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#e873f9', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill: '#cf51c8',
							fillOpacity: 0.7
						},
						image: {
							// IMAGE POSITIONING WHEN NOT SCALED
							x: 50,
							y: -50,
							// IMAGE DIMENSIONS WHEN NOT SCALED
							width:997,
							height:920,
							// SCALING FACTOR
							scaleFactor: 0.75,
							// IMAGE URL
							url: baseUrl + 'images/home/orb.png'
						}
					}
				},
				'medialifecycle': {
					view: MedialifecycleIllustrations,
					params: {}
				},
				'seeusinaction': {
					view: SeeusinactionIllustrations,
					params: {}
				},
				'aboutus': {
					view: AboutusIllustrations,
					params: {}
				},
				'login': {
					view: LoginIllustrations,
					params: {}
				},

				/* CONTENT CREATION ILLUSTRATIONS PARAMETERS*/
				'medialifecycle_contentcreation': {
					view: ContentcreationIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.contentcreation .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#ffc13e',
							foreground1: '#cf51c8',
							foreground2: '#b91bab',
							foreground3: '#5ce6af',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#e873f9', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill: '#cf51c8',
							fillOpacity: 0.7
						},
						image: {
							// IMAGE POSITIONING WHEN NOT SCALED
							x: -90,
							y: -140,
							// IMAGE DIMENSIONS WHEN NOT SCALED
							width:1200,
							height:1000,
							// SCALING FACTOR
							scaleFactor: 1.1,
							// IMAGE URL
							url: baseUrl + 'images/medialifecycle/contentcreation.png'
							//svg: contentCreationSvg
						}
					}
				},

				/* SUPPLY CHAIN SOLUTIONS ILLUSTRATION PARAMETERS*/
				'medialifecycle_supplychainsolutions': {
					view: SupplychainsolutionsIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.supplychainsolutions .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#fff80f',
							foreground1: '#4ddfcf',
							foreground2: '#4dcfd9',
							foreground3: '#5fdcc2',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#ffffff', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#000000',
							fillOpacity: 0.1
						},
						image: {
							x: 0,
							y: 0,
							width: 1200,
							height: 806,
							scaleFactor:1,
							url: baseUrl + 'images/medialifecycle/supplychainsolutions.png'
							//svg: supplyChainSolutionsSvg
						}
					}
				},

				/* MARKETPLACE SERVICES ILLUSTRATION PARAMETERS */
				'medialifecycle_marketplaceservices': {
					view: MarketplaceservicesIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.marketplaceservices .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#c5ff6c',
							foreground1: '#52d6ff',
							foreground2: '#13e0ef',
							foreground3: '#5ce6ac',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#52d6ff', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#2791b2',
							fillOpacity: 0.7
						},
						image: {
							x: 650,
							y: 15,
							width:605,
							height:630,
							scaleFactor:0.45,
							url: baseUrl + 'images/medialifecycle/marketplace.png'
						}
					}
				},

				/* FILM & TELEVISION ILLUSTRATIONS PARAMETERS */
				'seeusinaction_filmtelevision': {
					view: FilmtelevisionIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.filmtelevision .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							//loopInterval: 500,
							loopInterval: 5000,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#4acdeb',
							foreground1: '#f4499e',
							foreground2: '#dc46d1',
							foreground3: '#c65af9',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#f4499e', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#000000',
							fillOpacity: 0.1
						},
						image: {
							x: 400,
							y: 0,
							width:560,
							height:460,
							scaleFactor:0.6,
							url: baseUrl + 'images/seeusinaction/filmtv_HDTV.png'
						},
						slides: [{
							id: 1,
							url: baseUrl + 'images/seeusinaction/tvimage01.png',
							//x: 425,
							//y: 25,
							x: 426,
							y: 33,
							width: 487,
							height: 366
						},{
							id: 1,
							url: baseUrl + 'images/seeusinaction/tvimage02.png',
							x: 426,
							y: 33,
							width: 487,
							height: 366
						},{
							id: 1,
							url: baseUrl + 'images/seeusinaction/tvimage03.png',
							x: 426,
							y: 33,
							width: 487,
							height: 366
						}]
					}
				},

				/* MUSIC ILLUSTRATIONS PARAMETERS */
				'seeusinaction_music': {
					view: MusicIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.music .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#64dcc5',
							foreground1: '#f4db52',
							foreground2: '#dcb44e',
							foreground3: '#f9bc62',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#f4db52', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#000000',
							fillOpacity: 0.1
						},
						image: {
							x: 400, 
							y: -220,
							width:690,
							height:900,
							scaleFactor:0.55,
							url: baseUrl + 'images/seeusinaction/music.png'
						}
					}
				},

				/* SOCIAL PLATFORMS ILLUSTRATIONS PARAMETERS */
				'seeusinaction_socialplatforms': {
					view: SocialplatformsIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.socialplatforms .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#51c6ff',
							foreground1: '#f48b42',
							foreground2: '#dc6e4e',
							foreground3: '#f96d62',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#f48b42', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#e2665d',
							fillOpacity: 0.95
						},
						image: {
							//x: -60,
							x: 50,
							y: 70,
							//y: 0,
							width:500,
							height:600,
							scaleFactor:0.35,
							//scaleFactor: 1,
							url: baseUrl + 'images/seeusinaction/socialplatforms.png'
							//svg: socialPlatformsSvg
						}
					}
				},

				/* CONSUMER EXPERIENCES ILLUSTRATIONS PARAMETERS */
				'seeusinaction_consumerexperiences': {
					view: ConsumerexperiencesIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.consumerexperiences .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#9adc6b',
							foreground1: '#f49552',
							foreground2: '#dc6f4e',
							foreground3: '#f96d62',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#f49552', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#000000',
							fillOpacity: 0.2
						},
						image: {
							// IMAGE POSITIONING WHEN NOT SCALED
							x: -140,
							y: 220,
							// KEEP THE IMAGE FIXED AT THE BOTTOM
							keep: {
								at: 'bottom'
							},
							// IMAGE DIMENSIONS WHEN NOT SCALED
							width:1350,
							height:600,
							// SCALING FACTOR
							scaleFactor: 1.3,
							// IMAGE URL
							url: baseUrl + 'images/seeusinaction/consumerexperiences.png'
						}					}
				},

				/* NEWS ILLUSTRATIONS PARAMETERS */
				'aboutus_news': {
					view: NewsIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.news .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#ae33dc',
							foreground1: '#6df4c3',
							foreground2: '#35e6e6',
							foreground3: '#62f9b9',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#6df4c3', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#35e6e6',
							fillOpacity: 0.7
						},
						image: {
							x: -50,
							y: 0,
							width:1145,
							height:712,
							scaleFactor:0.82,
							svg: newsSvg
						}
					}
				},

				/* CAREERS ILLUSTRATIONS PARAMETERS */
				'aboutus_careers': {
					view: CareersIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.careers .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#ef5555',
							foreground1: '#d7f424',
							foreground2: '#97dc4e',
							foreground3: '#e6f962',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#d7f424', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#d7f424',
							fillOpacity: 0.7
						},
						/*image: {
							x:250,
							y: 30,
							width:843,
							height:822,
							scaleFactor:0.6,
							svg: careersSvg
						}*/
						image: {
							// IMAGE POSITIONING WHEN NOT SCALED
							x: 250,
							y: 30,
							// KEEP THE IMAGE FIXED AT THE BOTTOM
							keep: {
								at: 'bottom'
							},
							// IMAGE DIMENSIONS WHEN NOT SCALED
							width:825,
							height:825,
							// SCALING FACTOR
							scaleFactor: 0.58,
							// IMAGE URL
							url: baseUrl + 'images/aboutus/careers.png'
						}
					}
				},

				/* CONTACT US ILLUSTRATIONS PARAMETERS */
				'aboutus_contactus': {
					view: ContactusIllustrations,
					params: {
						layoutDefaults: {
							selector:     '#grid .screen.contactus .illustrations',
							paper:        null,
							width:        null,
							height:       null,
							loopInterval: 500,
							intervalID:   null
						},
						colorDefaults: {
							background:  '#d739dc',
							foreground1: '#31d6df',
							foreground2: '#46dca0',
							foreground3: '#5bf975',
							type1:       '#ffffff',
							type2:       '#ffffff',
							dots:        ['#31d6df', '#ffffff']
						},
						drawingDefaults: {
							stroke: '',
							strokeWidth:0,
							fill:'#000000',
							fillOpacity: 0.5
						},
						image: {
							//x:150,
							//x:140,
							//y:200,
							x:0,
							y:50,
							width:1000,
							height:500,
							//scaleFactor:0.75,
							scaleFactor:1,
							url: baseUrl + 'images/aboutus/contactus.png'
						},
						overlay: {
							selector:     '#grid .screen.contactus .overlay',
							paper:        null,
							width:        null,
							height:       null
						}
					}
				}



			}
	});


