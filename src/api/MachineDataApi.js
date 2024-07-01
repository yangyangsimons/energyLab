import ajax from "./ajax";

const base = "/awl/machine-data/"

export default {
  list   : (params) => ajax.get(base+"list",{params}),
  page   : (params) => ajax.get(base+"page",{params}),
  newList :(typeId)=>ajax.get(base+"page",{params:{dataType:typeId,current:1,size:60,searchCount:false}}).then(r=>{
    if(r.data.ok){
      return Promise.resolve(r.data.data.records);
    }else{
      return Promise.reject(r.data)
    }
  })
}