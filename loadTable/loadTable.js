var fs = require('fs');
var employee = [];
var header = [];
var jsonData = [];
var tableData,tableHeader=[];
 
loadTableData('data.html');

function loadTableData(theURL){

    fs.readFile(theURL, 'utf8', function (err,data) {
        if (err) {
                return console.log(err);
              }
        tableData = data.replace(/<tr bgcolor=DDDDDD>/gi,"<tr>").split("<tr>").splice(1,data.length-1); 
        tableHeader = tableData[0].split("<th>");
        header = tableHeader.splice(1,tableHeader.length-1);
        for(var i=0;i<header.length;i++){
            header[i]=header[i].replace(/<\/?[^>]+(>|$)/g, "").trim(); 
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
        console.log(jsonData);
    });
}

module.exports=loadTableData;