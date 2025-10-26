export function useSearch(searchStr, dataList) {
  if (!searchStr) {
    return dataList;
  }
  const query = searchStr.toLowerCase();
  const result=dataList.filter((item)=>{
    return item.title.toLowerCase().includes(query)
  })
  return result;
}
