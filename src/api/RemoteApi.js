import ajax from "./ajax";

const base = "/remote";

export default {
  yjb:{
    zhuapa:()=>ajax.get(base,{params:{id:0,url:"/alarm/getAlarmReport.do"}}),
    typeList:()=>ajax.post(base,null,{params:{id:0,url:"/basecode/getLevel2Bylevel1Name.do","level1name":"报警类型"}}),
    countByTime:()=>ajax.get(base,{params:{id:0,url:"/alarm/getAlarmReportCountByTimePoint.do"}}),
    countByType:()=>ajax.get(base,{params:{id:0,url:"/alarm/getAlarmReportByType.do"}}),
  }

}