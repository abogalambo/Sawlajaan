(function(){
function encode_utf8(s) { 
	return encodeURIComponent(s); 
} 

function decode_utf8(s) { 
	return decodeURIComponent(s); 
}

// letter transformation
// fat7a - kasra - damma
// combined letters
// taa marboota
// tanween
// alef mad
// alef with hamza , alef with hamza maksoora, Alef with hamza madmooma
// hamzat wasl
// hamzat in general
// Shadda
// waw aljamaa3a
// bel

/*
 * A, b, t, th, j, 7, 5, d, z', r, z, s, sh, S, D, T, Z', 3, g, f, q, k, l, m, n, h, w, y 
 * letter + a , letter + e / i, letter + o/u
 * th, z', sh, Z' and use "-" as a delimiter 
 * t'
 * uN, aN, iN/eN
 * aa middle of the word
 * A, E, U
 * a, e, u at start of word
 * 2, _2, @/@2,
 * letter + *
 * w-a / oo-a
 * be-al
 
 */

 var converter = function(){
 	// local variables
 	var that = {},
 		index = 0,
 		cursor = 0,
 		final = false,
 		invalid = false,
 		wordStart = true,
 		wordEnd = false,
 		value = "",
        escaped = false,
 		hash = constructHash('test');

for(key in hash){
    hash[key]['value'] = decode_utf8(hash[key]['value']);
}
     
     var init = function(){
         index = 0;
         cursor = 0;
         final = false;
         invalid = false;
         wordStart = true;
         wordEnd = false;
         escaped = false,
         value = "";
     };
     
     var lookup = function(key){
        // handle escaping
        if(escaped){
            if(key=="}}"){
                escaped = false;
                value = "";
                final = true;
            }else if(key=="}"){
                value = "}";
            }else{
                value = key;
                final = true;
            }
            return
        }else{
            if(key=="{{"){
                escaped = true;
                value = "";
                final = true;
                delimiter = true;
                return;
            }else if(key=="{"){
                value = "{";
                return;
            }
        }

        var lookupKey = wordStart ? '^' + key : key ;
        var entry = hash[lookupKey] || hash[key];
        var delimiter = false;
        if(entry){
            value = entry['value'];
            final = entry['final'] ? true : false;
            delimiter = entry['delimiter'] ? true : false;
        }else{
            invalid = true;
        };
         
 		if(delimiter){
 			wordStart = true;
 		}else{
 			wordStart = false;
 		};
 	};
 	
 	var processText = function(text){
 		init();
 		var result = "";
 		while(index < text.length){
 			index ++ ;
 			var key = text.substring(cursor, index);
 			lookup(key);
 			if(final){
 				result += value;
 				cursor = index
 				final = false;
 				value = "";
 			}else if(!invalid){
 				// or if end of input, treat as final
 				if(index == text.length){
 					result += value;
 					cursor = index
 					value = "";
 				}
 				// TODO if followed by delimiter, treat as final too
 				
 			}else if(value != ""){
 				result += value;
 				index-- ;
 				cursor = index
 				final = false;
 				value = "";
 	 			invalid = false
 			}else{
 				result += key;
 				cursor = index
 				final = false;
 				value = "";
 	 			invalid = false;
 			}
 		};
 		return result;
 	};
 	that.processText = processText;
 	return that;
 };
 
function constructHash(mode) {
    var result;
    if(mode && mode == 'test'){
        result = {
//letters            
    "3": {"value": "ع","final": true},
    "5": {"value": "خ","final": true},
    "7": {"value": "ح","final": true},
    "A": {"value": "أَ"},
    "b": {"value": "ب","final": true},
    "t": {"value": "ت"},
    "th": {"value": "ث","final": true},
    "j": {"value": "ج","final": true},
    "d": {"value": "د","final": true},
    "z'": {"value": "ذ","final": true},
    "r": {"value": "ر","final": true},
    "z": {"value": "ز"},
    "s": {"value": "س"},
    "sh": {"value": "ش","final": true},
    "S": {"value": "ص","final": true},
    "D": {"value": "ض","final": true},
    "T": {"value": "ط","final": true},
    "Z": {"value": "ظ","final": true},
    "g": {"value": "غ","final": true},
    "f": {"value": "ف","final": true},
    "q": {"value": "ق","final": true},
    "k": {"value": "ك","final": true},
    "l": {"value": "ل","final": true},
    "m": {"value": "م","final": true},
    "n": {"value": "ن","final": true},
    "h": {"value": "ه","final": true},
    "w": {"value": "و","final": true},
    "y": {"value": "ي","final": true},
    "Y": {"value": "ى","final": true},
    "t'": {"value": "ة","final": true},
// madd and tashkeel
    "Aa": {"value": "آ"},
    "Aaa": {"value": "آ","final": true},
    "^a": {"value": "ا","final": true},
    "a": {"value": "َ"},
    "aa": {"value": "َا"},
    "aaN": {"value": "اً","final": true},
    "^e": {"value": "ا","final": true},
    "E": {"value": "إ","final": true},
    "I": {"value": "إ","final": true},
    "^i": {"value": "إ","final": true},
    "e": {"value": "ِ"},
    "i": {"value": "ِ"},
    "ee": {"value": "ِي","final": true},
    "^u": {"value": "أُ","final": true},
    "U": {"value": "أُ","final": true},
    "u": {"value": "ُ"},
    "^o": {"value": "أُ","final": true},
    "O": {"value": "أُ","final": true},
    "o": {"value": "ُ"},
    "*": {"value": "ّ","final": true},
    "oo": {"value": "ُو","final": true},
    "0": {"value": "ْ","final": true},
// Hamzaat
    "2": {"value": "ء", "final" : true},
    "_2": {"value": "ئ", "final" : true},
    "@": {"value": "ؤ"},
    "@2": {"value": "ؤ", "final" : true},
// Tanween    
    "aN": {"value": "ً","final": true},
    "iN": {"value": "ٍ","final": true},
    "eN": {"value": "ٍ","final": true},
    "uN": {"value": "ٌ","final": true},
    "oN": {"value": "ٌ","final": true},
// delimiters
    "_": {"value": "ـ"},
    "-": {"value": "","final": true,"delimiter": true},
    " ": {"value": " ","final": true,"delimiter": true},
    ",": {"value": "،","final": true,"delimiter": true},
    "?": {"value": "؟","final": true,"delimiter": true},
    "\n": {"value": "\n","final": true,"delimiter": true},
    "\r\n": {"value": "\r\n","final": true,"delimiter": true}
};
for(key in result){
    result[key]['value'] = encode_utf8(result[key]['value']);
};
    }else{
        result = {"2":{"value":"%D8%A3"},"3":{"value":"%D8%B9","final":true},"5":{"value":"%D8%AE","final":true},"7":{"value":"%D8%AD","final":true},"A":{"value":"%D8%A3%D9%8E"},"b":{"value":"%D8%A8","final":true},"t":{"value":"%D8%AA"},"th":{"value":"%D8%AB","final":true},"j":{"value":"%D8%AC","final":true},"d":{"value":"%D8%AF","final":true},"z'":{"value":"%D8%B0","final":true},"r":{"value":"%D8%B1","final":true},"z":{"value":"%D8%B2"},"s":{"value":"%D8%B3"},"sh":{"value":"%D8%B4","final":true},"S":{"value":"%D8%B5","final":true},"D":{"value":"%D8%B6","final":true},"T":{"value":"%D8%B7","final":true},"Z":{"value":"%D8%B8","final":true},"g":{"value":"%D8%BA","final":true},"f":{"value":"%D9%81","final":true},"q":{"value":"%D9%82","final":true},"k":{"value":"%D9%83","final":true},"l":{"value":"%D9%84","final":true},"m":{"value":"%D9%85","final":true},"n":{"value":"%D9%86","final":true},"h":{"value":"%D9%87","final":true},"w":{"value":"%D9%88","final":true},"y":{"value":"%D9%8A","final":true},"Y":{"value":"%D9%89","final":true},"t'":{"value":"%D8%A9","final":true},"Aa":{"value":"%D8%A2"},"Aaa":{"value":"%D8%A2","final":true},"^a":{"value":"%D8%A7","final":true},"a":{"value":"%D9%8E"},"aa":{"value":"%D9%8E%D8%A7"},"aaN":{"value":"%D8%A7%D9%8B","final":true},"^e":{"value":"%D8%A7","final":true},"^E":{"value":"%D8%A5","final":true},"^I":{"value":"%D8%A5","final":true},"^i":{"value":"%D8%A5","final":true},"e":{"value":"%D9%90"},"i":{"value":"%D9%90"},"ee":{"value":"%D9%90%D9%8A","final":true},"^u":{"value":"%D8%A3%D9%8F","final":true},"^U":{"value":"%D8%A3%D9%8F","final":true},"u":{"value":"%D9%8F"},"^o":{"value":"%D8%A3%D9%8F","final":true},"^O":{"value":"%D8%A3%D9%8F","final":true},"o":{"value":"%D9%8F"},"*":{"value":"%D9%91","final":true},"oo":{"value":"%D9%8F%D9%88","final":true},"aN":{"value":"%D9%8B","final":true},"iN":{"value":"%D9%8D","final":true},"eN":{"value":"%D9%8D","final":true},"uN":{"value":"%D9%8C","final":true},"oN":{"value":"%D9%8C","final":true},"-":{"value":"","final":true}," ":{"value":"%20","final":true,"delimiter":true},",":{"value":"%D8%8C","final":true,"delimiter":true},"?":{"value":"%D8%8C","final":true,"delimiter":true},"?":{"value":"%D8%9F","final":true,"delimiter":true}}
    }
    return result;
}

$(document).ready(function($) {
	var parser = converter();
	var target;
	
    var input = $('textarea#input');
    var output = $('textarea#output');
    var initialText = "\
besmi all*ahi alr*a7mani alr*a7eemi\n\
bsm allh alr7mn alr7ym\n\
\n\
AhlaaN wa sahlaaN bekum\n\
\n\
# Sawlajaan Adaat'uN tusaa3iduka 3laY kitaabat'i al3arabiy*at'i be7oroofiN laateeney*at'iN\n\
\n\
# w ymknk An tktb b3laamaat altshkeel Aw bdoonhaa";
    input.html(initialText);
    output.val(parser.processText(initialText));
	$(input).keyup(function(){
		output.val(parser.processText($(this).val()));
	});
});

})();