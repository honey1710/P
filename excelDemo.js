const exceljs=require('exceljs');

async function excelTest(search,replaceValue)
{       const path="C:/Users/hchauha1/Downloads/download.xlsx";
       // const search="Banana";
        const obj=readExcel(path,search);
        console.log(obj.r,obj.c);
        const workbook=new exceljs.Workbook(); //create object for excel workbook
        const sheet= workbook.getWorksheet('Sheet1'); //get worksheet
        await workbook.xlsx.readFile(path); //open & read workbook
        const cell1=sheet.getCell(obj.r,obj.c+2); //get cell with desired row & col number 
        cell1.value=replaceValue; // assigne value to that cell 
        await workbook.xlsx.writeFile(path); // write it to workbook

}

async function readExcel(path,search){
    const obj={r:-1,c:-1};
    const workbook=new exceljs.Workbook(); //create object for excel workbook
    await workbook.xlsx.readFile(path); //open & read workbook
    const sheet= workbook.getWorksheet('Sheet1'); //get worksheet
    sheet.eachRow((row,rownumber) => //iterate through each row 
        {
            row.eachCell((cell,colnumber)=> //iterate through each cell in that row 
                {
                    if(cell.value===search)
                    {
                        obj.r=rownumber;  //assign row number of desired cell to object for later reference 
                        obj.c=colnumber; //assign col number of desired cell 
                    }
                })
        })
        readExcel=obj;
}
excelTest("Banana",1000);