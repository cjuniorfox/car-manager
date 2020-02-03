export function updateOps(data: any){
    let arr = [];
    Object.keys(data).map(function (key) {
      if (data[key] && data[key].length > 0) {
        arr.push({ propName: key, value: data[key] })
      }
    });
    return arr;
}