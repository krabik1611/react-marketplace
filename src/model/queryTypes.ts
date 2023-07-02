export  interface IQuery {
  limit?:number,
  sort?:'asc'|'desc',
  start?:number,
  startdate?:string,
  enddate?:string,
}