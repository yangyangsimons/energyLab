import { ElMessage } from "element-plus";
import ajax from "./ajax";

const base = "/awl/network-device/";

let ss = [];

export const doOpen = (id) =>{
  if(ss[id]){
    ElMessage.info("您点击太快了,请稍后!");
    return;
  }
  ss[id]=true;
  window.setTimeout(()=>{
    ss[id]=false;
  },2000);
  return  ajax.post(base+"s-"+id);
}

export const  doSet =  (opens)=>{
  return  ajax.post(base+"set",opens);
}