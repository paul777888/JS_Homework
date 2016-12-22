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

//------------------To be continued--------
//function remove_duplicates(a,b){
//    b.forEach(function(b_ele){
//        newArray.push(b_ele.ext);
//    })
//    
//    a.forEach(function(a_ele, index){
//        var idx = newArray.indexOf(a_ele.ext)
//        if(idx!==-1){
//            if(a_ele.firstName===b[idx].firstName){      if(a_ele.ext!==b[idx].ext||a_ele.cell!==b[idx].cell||a_ele.alt!==b[idx].alt||a_ele.title!==b[idx].title||a_ele.email!==b[idx].email) {
//                       modified.push(a_ele);
//                 }       
//            }else{
//               deleted.push(a_ele);
//               added.push(b[idx]);  
//            }  
//        }else{    
//               deleted.push(a_ele);
//               if(index>0){
//                 added.push(b[index-1]);  
//               }
//                 
//        }                  
//    });
//}


module.exports=compare02;