var fs = require('fs');
var http = require('http');
var url="http://web-aaronding.rhcloud.com/employee.html";
var employee = [];
var header = [];
var jsonData = [];
var tableData,tableHeader=[];
var added = [],
    deleted = [],
    modified = [],
    newArray = [];

main();

function main(){
    var lastFilePath = './files'; //Location of files
    var firstFile = 'firstFile'; //first file
    if (!fs.existsSync(lastFilePath)){
        fs.mkdirSync(lastFilePath);
    }
    
    fs.readdir(lastFilePath, function(err, files) {
        if (err) { 
            throw err; 
        }
        if(files.length!==0){
            var lastFile = getNewestFile(files, lastFilePath);
            //process lastFile
            var filePath = './files/'+lastFile;
            loadTableData(url,filePath);    
        }else{
            console.log("This is the first file, please run again");
            loadTableData(url,firstFile);
        }    
    });                       
}

function getNewestFile(files, path) {
    var out = [];
    files.forEach(function(file) {
        var stats = fs.statSync(path + "/" +file);
        if(stats.isFile()) {
            out.push({"file":file, "mtime": stats.mtime.getTime()});
        }
    });
    out.sort(function(a,b) {
        return b.mtime - a.mtime;
    })
    return (out.length>0) ? out[0].file : "";
}

function processFile(theURL,newData){
    fs.readFile(theURL, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
    compare(JSON.parse(data),newData);                         
})
}

//==================This section is to compare old data and new data=================
function compare(oldData,newData){    
    remove_duplicates(oldData,newData);
    
    result = {
        resultAdded:added,
        resultDeleted:deleted,
        resultModified:modified
    }
    console.log(result);
    return result;
}

function remove_duplicates(a,b){ 
    a.forEach(function(a_ele){
        for (var j = 0, len2 = b.length; j < len2; j++) { 
            if (a_ele.FirstName+ a_ele.LastName === b[j].FirstName+b[j].LastName) {
                if(a_ele.CellNumber!==b[j].CellNumber||a_ele.AlternativeNumberEmergencyOnly!==b[j].AlternativeNumberEmergencyOnly||a_ele.Title!==b[j].Title||a_ele.title!==b[j].title||a_ele.EmailAddress!==b[j].EmailAddress||a_ele.Extension!==b[j].Extension){
                    modified.push(b[j]);
                }
                b.splice(j, 1);
                len2=b.length;
                break;
            }
            if(j===len2-1){
              added.push(a_ele);  
            }          
        }        
       deleted = b;
    })   
}

//==================This section is to write json data=================
function writeOutput(output){
    var now = new Date();
    var file_name = 'files/'+'Employee-table-' + now.getFullYear()+(now.getMonth()+1)+now.getDate()+now.getHours()+now.getMinutes()+now.getSeconds() +'.json';
    fs.writeFile(file_name,output,function(err){
        if(err){
            return console.log(err);
        }      
    })
}

//==================This section is to load json data from HTML page=================
function loadTableData(url,filePath){
    http.get(url,function (res) { 
        var body = '';
        res.on('data',function(data){
            body+=data;
        })
        res.on('end',function(){
            var data = body;
            tableData = data.replace(/<tr bgcolor=DDDDDD>/gi,"<tr>").split("<tr>").splice(1,data.length-1);
            tableHeader = tableData[0].split("<th>");
            header = tableHeader.splice(1,tableHeader.length-1);
            for(var i=0;i<header.length;i++){
                header[i]=header[i].replace(/<\/?[^>]+(>|$)/g, "").replace(/-/g,'').replace(/ /g,'').trim();
            }
            for(var k=1;k<tableData.length;k++){
                employee = tableData[k].split("<td>");
                employee = employee.splice(1,employee.length-1)
                var json={}; 
                for(var h=0;h<header.length;h++){   
                   var item = employee[h].replace(/<\/?[^>]+(>|$)/g, "").trim();
                   json[header[h]] = item;
                   if(h===header.length-1){        
                      jsonData.push(json);
                   }
                }
            }
            writeOutput(JSON.stringify(jsonData));
            if(filePath!=="firstFile"){
               processFile(filePath,jsonData); 
            }
            
            })
        
    }).on('error',function(e){
        console.log("error message: "+e.message);
    });   
}
