"use strict";
  
var fs = require("fs"); 
var url = require("url");
var querystring = require("querystring"); 

function route(uri,Antwort) {
	var fileName; 
	var data;
	console.log("About to route a request for " + uri);  
	var the_url=url.parse(uri); 
	var pathname = the_url.pathname;
	
	function vierhundredvier(message,fileName){
		Antwort.writeHead(404, {"Content-Type": "text/html"});
		Antwort.write("<html><body> ");
		if(message.length)
			Antwort.write(message);
		Antwort.write( "<br>");
		if(fileName)
			Antwort.write("Ich kann nicht "+fileName+" liefern! <br> "); 
		Antwort.write(" Es ist ein <h1>404-Fehler.</h1>"); 
		Antwort.write("</body></html>");
		Antwort.end();
		return 404;
	}
	
	uri=uri.replace(/zeigen/i,"");//////MOMENTANE  
	if(/\?/.test(the_url.search)){ 
		var query=the_url.query.toString();//into old fashion if it is not a string 
		var action=querystring.parse(query)["action"]
		if((!/action/.test(the_url.search))||(action==undefined)) {
			var ahref=uri +"&action=show";
			return vierhundredvier("The query is malformed: I need '&action='<br>"+"Sie k&ouml;nnen <a href='"+ahref+"'>"+ahref+"</a> kopieren.");
		}
		if(uri[0]==="/"){//überliefern etwas als HTML 
			if(action.toUpperCase()==="show".toUpperCase()){ 
					var fileName=querystring.parse(query)["fileName"]
					if((!/fileName/.test(the_url.search) )||(fileName==undefined)){
						var ahref=uri//+"?action=SHOW"
							+"&fileName=HIERSCHREIBEN";
						return vierhundredvier("The query is malformed: I need '&fileName='<br>"+"Sie k&ouml;nnen <a href='"+ahref+"'>"+ahref+"</a> kopieren.");
					}
					else 
				try{ 
					var revive ; 			
 					revive=  fs.readFileSync("../databases/"+fileName)  ;
 					revive=   (JSON.parse( revive ));  
// revive = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};
  revive = JSON.stringify(revive, undefined, 4);  
					if(true){
						Antwort.writeHead(200, {"Content-Type": "text/plain"}); 
						Antwort.write( revive); 
						Antwort.end();
						return 200;  
					}
					revive= syntaxHighlight (  revive  );  
					var document_header=  fs.readFileSync("jsonfiles.css.1.html")  ;
					var document_end=  fs.readFileSync("jsonfiles.css.2.html")  ;
					revive=document_header+  revive+document_end ;
					Antwort.writeHead(200, {"Content-Type": "text/html"}); 
					Antwort.write(revive); 
					Antwort.end();
					return 200;  
				}catch(e){
					return vierhundredvier(e.message+"<br><br>");
				}
				}
			else	if(action==="edit"){ 
			}
			else {
				vierhundredvier("Der Wert von 'action' hat fuer mich keine Bedeutung.");
			}
	}
	}
	if(uri==="/")
			uri="/index.html";
	
	if(uri[0]==="/"){
		var fileName='..'+uri;  
  
		try { 
			data=fs.readFileSync(fileName,"utf-8");
			Antwort.writeHead(200, {"Content-Type": "text/html"}); 
			Antwort.write(data); 
			Antwort.end();
			return 200;  
			}catch(err){
				console.log(err.message);
				return vierhundredvier(err.message,fileName);
		}
	}
}


function syntaxHighlight(json) {// von Internet ausgeschnitten
   
   
   if (typeof json == 'string')  //be syntaxHighlight(syntaxHighlight(x)) exactly the same as syntaxHighlight(x)
								   //(e.g. this function is a projector
		json=JSON.parse(json);
  
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    } 
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

exports.route=route