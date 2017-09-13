
function openNav() {
/*	document.getElementById("drawer").style.transform = "translate(0, 0)";
	document.getElementById("main").style.opacity = "0.5";*/
	
	document.getElementById("drawer").classList.toggle('open');	
}

function closeNav() {
	/*document.getElementById("drawer").style.transform = "translate(-300px, 0)";
	document.getElementById("main").style.opacity = "1";*/
	document.getElementById("drawer").classList.remove('open');	
}    
