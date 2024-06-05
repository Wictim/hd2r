String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

document.addEventListener('DOMContentLoaded', () => {
    const rulesContainer = document.createElement('div');
	rulesContainer.style.display = "flex";
	rulesContainer.style.flexDirection = "row";
	rulesContainer.style.flexWrap = "wrap";
	rulesContainer.style.alignItems = "flex-start";
	rulesContainer.style.justifyContent = "space-between";
	
    const definitions = [
		{ prefix: "str-off", count: 18, columns: 4 },
		{ prefix: "str-sup", count: 23, columns: 4 },
		{ prefix: "str-def", count: 11, columns: 4 },
		{ prefix: "bstr", count: 10, columns: 4 },
		{ prefix: "str-msn", count: 3, columns: 4 },
		{ prefix: "wpn-pri-ar", count: 5, columns: 2 },
		{ prefix: "wpn-pri-dmr", count: 2, columns: 2 },
		{ prefix: "wpn-pri-smg", count: 3, columns: 2 },
		{ prefix: "wpn-pri-stgn", count: 5, columns: 2 },
		{ prefix: "wpn-pri-ex", count: 3, columns: 2 },
		{ prefix: "wpn-pri-en", count: 6, columns: 2 },
		{ prefix: "wpn-sec", count: 6, columns: 2 },
		{ prefix: "wpn-gnd-st", count: 3, columns: 4 },
		{ prefix: "wpn-gnd-sp", count: 5, columns: 4 },
		{ prefix: "armr", count: 8, columns: 1 },
	];
  
    const urlParams = new URLSearchParams(window.location.search);
	const ruleString = urlParams.get("r") || "0";
	let mask = convertNum(ruleString, 16, 2);
	const editor = urlParams.get("edit") === "on";
	
	let indexCounter = 0;
    
	for (const definition of definitions) {
		const sectionDiv = document.createElement('div');
		for (let i = 1; i <= definition.count; i++) {
			const imgIndex = indexCounter;
			indexCounter++;
			const img = document.createElement('img');
			img.id = definition.prefix + "-" + i;
			img.src = definition.prefix + "-" + i + ".png";
			img.style.opacity = mask[imgIndex] === "1" ? "15%" : "100%";
			if(editor){
				img.onclick = () => {
					if(imgIndex > mask.length) mask = mask.padEnd(imgIndex, "0");
					mask = mask.replaceAt(imgIndex, mask[imgIndex] === "1" ? "0" : "1");
					img.style.opacity = mask[imgIndex] === "1" ? "15%" : "100%";
					history.pushState(null, null, "?"+new URLSearchParams({ r: convertNum(mask, 2, 16) }).toString());
				}
			}
			img.addEventListener('load', function() {
				if(definition.columns > 1) {
					sectionDiv.style.width = (img.width * definition.columns) + "px";
				} else {
					sectionDiv.style.display = "flex";
					sectionDiv.style.flexDirection = "column";
					sectionDiv.style.alignItems = "flex-start";
				}
			});
			sectionDiv.appendChild(img);
		}
		rulesContainer.appendChild(sectionDiv);
	}
	document.body.appendChild(rulesContainer);
});

function convertNum(str, fromBase, toBase) {
	const readChunkSize = Math.ceil(Math.log(toBase) / Math.log(fromBase));
	const writeChunkSize = Math.ceil(Math.log(fromBase) / Math.log(toBase));
	let result = "";
	let buffer = "";
	const convertBuffer = () => {
		result += parseInt(buffer, fromBase).toString(toBase).padStart(writeChunkSize, "0");
		buffer = ""; 
	}
	for (let i = 0; i < str.length; i++) {
		buffer += str[i];
		if (buffer.length >= readChunkSize) convertBuffer();
	}
	if (buffer.length > 0) convertBuffer();
	return result;
}
