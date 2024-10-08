require.config({	
	baseUrl: '/'
});

// TODO: MAKE DEVICE DETECTION MORE ROBUST
if( screen.width < 1024) {

	require(['tablet/production.min']);

} else {
	
	require(['desktop/production.min']);
}

