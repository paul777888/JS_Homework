var result=[],
    resultAdded=[],
    resultDeleted=[],
    resultModified = [];
//    oldData = [
//    {
//      "firstName": "Tom",
//      "lastName": "Zhang",
//      "ext": "1001",
//      "cell": "416-000-0000",
//      "alt": "",
//      "title": "Manager",
//      "email": "tomz@jsrocks.com"
//    },
//    {
//      "firstName": "Peter",
//      "lastName": "Wang",
//      "ext": "1003",
//      "cell": "647-222-2222",
//      "alt": "416-333-3333",
//      "title": "QA",
//      "email": "peterw@jsrocks.com"
//    },
//    {
//      "firstName": "Lily",
//      "lastName": "Huang",
//      "ext": "1003",
//      "cell": "647-222-2222",
//      "alt": "416-333-3333",
//      "title": "QA",
//      "email": "peterw@jsrocks.com"
//    }
//  ],
//  newData = [
//    {
//      "firstName": "Tom",
//      "lastName": "Zhang",
//      "ext": "1001",
//      "cell": "416-000-0000",
//      "alt": "416-456-4567",
//      "title": "Manager",
//      "email": "tomz@jsrocks.com"
//    },
//    {
//      "firstName": "Peter",
//      "lastName": "Wang",
//      "ext": "1003",
//      "cell": "647-222-2222",
//      "alt": "416-333-3333",
//      "title": "QA",
//      "email": "peterw@jsrocks.com"
//    },
//    {
//      "firstName": "Joe",
//      "lastName": "An",
//      "ext": "1003",
//      "cell": "647-222-2222",
//      "alt": "416-333-3333",
//      "title": "QA",
//      "email": "peterw@jsrocks.com"
//    }
//  ];     

        
//compare(oldData,newData);        
function compare(oldData,newData){
   console.log("paul");
   resultTemp = compareByContent(newData,oldData); 
   resultModified = compareByPropertyModified(oldData,resultTemp);
   resultAdded= compareByPropertyAdded(resultTemp,oldData);
   resultDeleted = compareByPropertyDeleted(oldData,newData)
   result = {
        added:resultAdded,
        deleted:resultDeleted,
        modified:resultModified
    } 
   return result;
}
//compare and filter out temporary data with content change        
function compareByContent(newData,oldData){
    return newData.filter(function(ele){
            for(var i=0;i<oldData.length;i++){
                if(JSON.stringify(ele)===JSON.stringify(oldData[i])){
                    return false;
                }  
            }
            return true;
        })
}
//compare old data with filtered data, and then filter out the same object with content change    
function compareByPropertyModified(oldData,newData){
    return oldData.filter(function(ele){
            for(var i=0;i<newData.length;i++){
                if(ele.firstName+ele.lastName===newData[i].firstName+newData[i].lastName){
                    return true;
                } 
            }       
        })
}
//compare filtered data with old data, and then filter out added object   
function compareByPropertyAdded(oldData,newData){
    return oldData.filter(function(ele){
            for(var i=0;i<newData.length;i++){
                if(ele.firstName+ele.lastName===newData[i].firstName+newData[i].lastName){
                    return false;
                } 
            }
            return true;
        })
}
//compare old data with new data, and then filter out deleted object  
function compareByPropertyDeleted(oldData,newData){
    return oldData.filter(function(ele){
            for(var i=0;i<newData.length;i++){
                if(ele.firstName+ele.lastName===newData[i].firstName+newData[i].lastName){
                    return false;
                } 
            } 
            return true;
        })
}

module.exports=compare;