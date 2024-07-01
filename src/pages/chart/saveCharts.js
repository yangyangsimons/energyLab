const saveCharts = (type="png",ele=document.body,name="图片") => {
  console.debug(type,ele);
  type = type.toLowerCase();
  if(type=='jpg' ) {
    type = "jpeg";
  }
  if(ele instanceof HTMLElement){
    ele = getCanvas(ele);
  }else if(ele.value instanceof HTMLElement){
    ele = getCanvas(ele.value);
  }else {
    throw new Error("未出入html元素参数");
  }
  console.debug(type,ele);
  name +=new Date().format("-yyyy-MM-dd_HH_mm_ss")
  if(type.toLowerCase()=="pdf"){
    savePdf(ele,name);
  }else {
    saveImage(type,ele,name);
  }


}

const getCanvas = (ele) => {
  if(ele instanceof HTMLCanvasElement) {
    return ele;
  }else {
    return ele.querySelector("canvas");
  }
}


const saveImage = (type,ele,name) =>{
    let data = ele.toDataURL("image/"+type, 1.0);
    let a = document.createElement("a");
    a.href=data;
    a.download = name+"."+type;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}


import jsPDF from "jspdf";
const savePdf = (ele,name) =>{
  let pdf = new jsPDF('l', 'pt', [ele.width, ele.height])
  let pageData = ele.toDataURL('image/jpeg', 1.0) 
  pdf.addImage(pageData, 'JPEG', 0, 0, ele.width, ele.height)
  pdf.save(`${name}.pdf`)
}

export {saveCharts}