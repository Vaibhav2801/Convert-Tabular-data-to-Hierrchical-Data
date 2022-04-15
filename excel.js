let selectfile;

document.getElementById('input').addEventListener("change",(event)=>{
selectfile=event.target.files[0];
})

const obj=[]
document.getElementById('button').addEventListener("click",()=>{
  console.log(selectfile)
  if(selectfile){
    let fileReader=new FileReader();
    fileReader.readAsBinaryString(selectfile);
    fileReader.onload = (event)=>{
      console.log(event.target.result);
      let data=event.target.result;
      let workbook= XLSX.read(data,{type:"binary"})
      console.log(workbook);
      workbook.SheetNames.forEach(sheet => {
        let rowObject=XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet])
      //  console.log(rowObject);
        obj.push(rowObject)
        
       // document.getElementById("jsondata").innerHTML=JSON.stringify(rowObject,undefined,4)
      });
    }
  }
  })
  const partial = (obj = [], condition) => {
    const result = [];
    for (let i = 0; i < obj.length; i++) {
       if(condition(obj[i])){
          result.push(obj[i]);
       }
    }
    return result;
 }
 const findNodes = (parentKey,items) => {
   p=MANAGEREMPLOYEE_ID;
    let subItems = partial(items, n => n.p === parentKey);
    const result = [];
    for (let i = 0; i < subItems.length; i++) {
       let subItem = subItems[i];
       let resultItem = {
          reportees: {  id:subItem.EMPLOYEE_ID }
       };
       let kids = findNodes(subItem.EMPLOYEE_ID , items);
       if(kids.length){
          resultItem.children = kids;
       }
       result.push(resultItem);
    }
    return result;
 }
 document.getElementById("jsondata").innerHTML=JSON.stringify(findNodes('ROOT', obj), undefined, 4)