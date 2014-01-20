	
/*
* templateIL - Object Literal Microtemplating 
* https://github.com/jameswestgate/templateIL
* 
* Copyright (c) James Westgate 2013 - 2014
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function() {

	var elementTable = {}, output;
	var tags = 'abipq,bbbrdddldtemh1h2h3h4h5h6hrliolrprttdthtrul,bdocoldeldfndivimginskbdmapnavpresubsupvar,abbrareabasebodycitecodeformheadhtmllinkmarkmenumetarubysampspantime,asideaudioembedinputlabelmeterparamsmalltabletbodytfoottheadtitlevideo,buttoncanvasdialogfigurefooterheaderiframelegendobjectoptionoutputscriptselectsourcestrong,addressarticlecaptioncommanddetailssection,colgroupdatagriddatalistfieldsetnoscriptoptgroupprogresstextarea,,blockquote,eventsource'.split(',');
	
	for(var i=1,len=tags.length; i<=len; i++) {
		var tag=tags[i-1];

		for(var j=0,len2=tag.length; j<len2; j+=i) {
			elementTable[tag.substring(j, j+i)] = {open:0, closed:0};
		}
	}

	// Create markup out of the il 
	Object.compose = function (il) {
		output = [];
		parseIl(il, null);
		return output.join('');
	};


	function checkClose(key) {

		if (key === null) return;

		if (elementTable[key].open > elementTable[key].closed) {
			output.push('>');
			elementTable[key].closed ++;
		}
	}

	//Parse each element in the template IL recursively
	function parseIl(il, parent) {
		  
		var t = nativeType(il);

		if (t === 'array') {
			
			for (var i=0, len=t.length; i<len; i++) {
				parseIl(il[i], parent);
			};
		}
		else if (t === 'function') {
			
			var temp = [], result = il.apply(temp); //an array to push to and/or result to append
			
			if (result) temp.push(result);
			
			parseIl(temp, parent);
		} 
		else if (t === 'object') {
			
			for (var key in il) {

				if (il.hasOwnProperty(key)) {

					var el = il[key];

					//Tag 
					if (elementTable[key]) {

						//If we have an open tag close it
						checkClose(parent);

						output.push('<' + key);

						elementTable[key].open++;

						parseIl(el, key);

						checkClose(key);
						output.push('</' + key + '>');
					}
					//Attr
					else {
						if (key === 'text') {
							parseIl(el, parent);
						}
						else {
							output.push(' ' + key + '="');

							parseIl(el, null);

							output.push('"');
						}
					}
				}
			};
		} 
		else {
			checkClose(parent);

			//Render text inside tag or attribute
			output.push(il);
		}
	}

	function nativeType(t) {
                if (t === null) return 'null';
                if (typeof t === 'undefined') return 'undefined';
                return Object.prototype.toString.call(t).toLowerCase().replace('[object ','').replace(']','');
   }
})();
