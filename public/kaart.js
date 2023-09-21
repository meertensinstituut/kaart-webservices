var http = createRequestObject();

// Uit Head Rush Ajax (O'Reilly)
function createRequestObject() {

	var ro = null;
	try {
		ro = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
			ro = new ActiveXObject("Msxml2.XMLHTTP");		
		} catch (othermicrosoft) {
			try {
				ro = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				ro = null;
			}
		}
	}

	return ro;
}

function sendRequest() {	
	
	var kaartgegevens = getKloekenummers();
	
	var requeststring = new Array();
	for (var i = 0; i < kaartgegevens["kloekes"].length; i++) {
		requeststring.push(encodeURIComponent("kloekes[" + i + "]") + "=" + encodeURIComponent(kaartgegevens["kloekes"][i]));
		requeststring.push(encodeURIComponent("legenda[" + i + "]") + "=" + encodeURIComponent(kaartgegevens["legendas"][i]));
		requeststring.push(encodeURIComponent("symbol[" + i + "]") + "=" + encodeURIComponent(kaartgegevens["symbols"][i]));
		requeststring.push(encodeURIComponent("color[" + i + "]") + "=" + encodeURIComponent(kaartgegevens["colors"][i]));
	}
	var mapsize = document.getElementById("mapsize").value;
	var frequency = document.getElementById("frequency").checked;
	if (frequency) {
		requeststring.push("frequency=" + "1");		
	}
	requeststring.push("mapsize=" + escape(mapsize));
	http.open('post', 'createmap.php', true);
	http.onreadystatechange = handleResponse;
	http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	http.send(requeststring.join("&"));
}

function handleResponse() {
	if (http.readyState == 4) {
		var response = http.responseText;
		document.getElementById("kaart").innerHTML = response;
	}
}


function newkloekelijst() {
	// nieuwe invoerveldjes voor Kloekenummers en legenda
	// met nieuwe id's aanmaken
	var template = document.getElementById("kloekelijst");
	var parent = template.parentNode;
	var newkloekelijst = template.cloneNode(true);
	newkloekelijst.removeAttribute("id");
	
	// zichtbare getallen: 1-gebaseerd
	var newoffset = parent.childNodes.length + 1;
	var firstspan = newkloekelijst.getElementsByTagName("span")[0];
	firstspan.childNodes[0].nodeValue = "Kloekelijst " + newoffset;
	
	var newkloeketextarea = newkloekelijst.getElementsByTagName("textarea")[0];
	newkloeketextarea.removeAttribute("id");
	// alle onderliggende getallen: 0-gebaseerd
	newkloeketextarea.id = "kloekes[" + (newoffset - 1) + "]";
	newkloeketextarea.value = "";
	
	var newlegendatext = newkloekelijst.getElementsByTagName("input")[0];
	newlegendatext.removeAttribute("id");
	newlegendatext.id = "legenda[" + (newoffset - 1) + "]";
	newlegendatext.value = "";
	
	var newimages = newkloekelijst.getElementsByTagName("img");
	for (var i = 0; i < newimages.length; i++) {
		var oldid = newimages[i].id;
		var haakje_openen = oldid.indexOf("[");
		var haakje_sluiten = oldid.indexOf("]");
		var imagetype = oldid.slice(0, haakje_openen);
		newimages[i].removeAttribute("id");
		newimages[i].id = imagetype + "[" + (newoffset - 1) + "]";
		if ((newoffset - 1) == i) {
			// default gekozen
			newimages[i].style.borderBottom = "medium double gray";
			var hidden = document.createElement("input");
			hidden.type = "hidden"
			hidden.id = "symbol[" + i + "]";
			hidden.value = imagetype;
			document.getElementById("left").appendChild(hidden);
		} else {
			newimages[i].style.borderBottom = "none";
		}
	}
	
	parent.appendChild(newkloekelijst);
}

function getKloekenummers() {

	var container = document.getElementById("kloekelijstcontainer");
	var kloekelijstenform = container.getElementsByTagName("textarea");
	var kloekelijsten = new Array();
	var legendas = new Array();
	var symbols = new Array();
	var colors = new Array();
	
	for (var i = 0; i < kloekelijstenform.length; i++) {
		kloekelijsten[i] = kloekelijstenform[i].value;
		var legenda = document.getElementById("legenda[" + i + "]");
		legendas[i] = legenda.value;
		var symbol = document.getElementById("symbol[" + i + "]");
		if (symbol) {
			var shape = symbol.value.slice(0,symbol.value.lastIndexOf("_"));
			var color = symbol.value.slice(symbol.value.lastIndexOf("_") + 1);
			symbols[i] = shape;
			colors[i] = color;
		} else {
			symbols[i] = "default";
			colors[i] = "default";
		}
	}
	
	var returnvalue = new Array();
	
	returnvalue["kloekes"] = kloekelijsten;
	returnvalue["legendas"] = legendas;
	returnvalue["symbols"] = symbols;
	returnvalue["colors"] = colors;
	
	return returnvalue;
}

function setImage(elem) {
	// kijk welk plaatje aangeklikt is
	var haakje_openen = elem.id.indexOf("[");
	var imagetype = elem.id.slice(0, haakje_openen);
	var haakje_sluiten = elem.id.indexOf("]");
	var nummer = elem.id.slice(haakje_openen + 1, haakje_sluiten);
	// bestaand hidden element ophalen
	var hidden = document.getElementById("symbol[" + nummer + "]");
	// bestaande border weghalen
	document.getElementById(hidden.value + "[" + nummer + "]").style.borderBottom = "none";
	// bestaand hidden element aanpassen
	hidden.value = imagetype;
	// aangeklikt plaatje van border voorzien
	elem.style.borderBottom = "medium double gray";
}

function setBorder(elem) {
	elem.style.backgroundColor = "#C00";	
}

function removeBorder(elem) {
	elem.style.backgroundColor = "white";	
}

/* This script and many more are available free online at
The JavaScript Source :: http://javascript.internet.com
Created by: Public Domain */

function insertAfter(parent, node, referenceNode) {
 	parent.insertBefore(node, referenceNode.nextSibling);
}


/* http://www.agavegroup.com/?p=32 */
function getNextSibling(startBrother) {
  
  endBrother = startBrother.nextSibling;
  while(endBrother.nodeType!=1) {
    endBrother = endBrother.nextSibling;
  }
  
  return endBrother;
}

