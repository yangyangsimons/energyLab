import ajax from "./ajax";

const base = "/awl/config/"

export default {
  get   : (id)=>ajax.get(base+id,{token:false}).then(r=>{
    if(r.data.ok){
      r.data.data = JSON.parse(r.data.data);
    }
    return Promise.resolve(r);
  }),
  update   : (id,config)=>ajax.put(base+id,ajax.params({config:JSON.stringify(config)}),{token:false}),

}