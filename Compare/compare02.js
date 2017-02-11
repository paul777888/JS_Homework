var added = [],
    deleted = [],
    modified = [],
    newArray = [];
        
function compare02(oldData,newData){    
    remove_duplicates(oldData,newData);
    
    result = {
        resultAdded:added,
        resultDeleted:deleted,
        resultModified:modified
    }
    return result;
}
        
//==================This method only runs up to 100,000=================
function remove_duplicates(a,b){ 
    console.log(a);
    a.forEach(function(a_ele){
        for (var j = 0, len2 = b.length; j < len2; j++) { 
            if (a_ele.firstName+ a_ele.lastName === b[j].firstName+b[j].lastName) {
                if(a_ele.ext!==b[j].ext||a_ele.cell!==b[j].cell||a_ele.alt!==b[j].alt||a_ele.title!==b[j].title||a_ele.email!==b[j].email){
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

module.exports=compare02;