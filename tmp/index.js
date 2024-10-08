var x = 0,
    y = 0,
    delta = 50;

function up() { 
	
	y = y - delta;
	$('#grid').css({
		top: y + 'px'

	});

}

function right() { 

	//y = y;
	
	x = x + delta;
	$('#grid').css({
		left: x + 'px'
	});
}

function down() { 

	//x = x;
 	y = y + delta;		
	$('#grid').css({
		top: y + 'px'

	});
}

function left() { 

	x = x - delta;
	$('#grid').css({
		left: x + 'px'

	});
}

$('.right').click( function( ev) {

	right();

});
$('.down').click( function( ev) {

	down();

});
$('.left').click( function( ev) {

	left();

});
$('.up').click( function( ev) {

	up();

});



