import { useState, useEffect } from "react";
const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  console.log("data",data,range);
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  console.log("data",data,data.slice((page - 1) * rowsPerPage, page * rowsPerPage));
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export const usePagination = ( data, page, rowsPerPage) => {
    

  const [tableRange, setTableRange] = useState([]);
  const [slicedData, setSlicedData] = useState([]);
    
    
    useEffect(() => {      
     
        const range = data && calculateRange(data, rowsPerPage);
        const updatedrange = range&&[...range];
      setTableRange(updatedrange);

        const sliceDat = data && sliceData(data, page, rowsPerPage);
       const updatedSlicedData= sliceDat && [...sliceDat]
            setSlicedData(updatedSlicedData);
  }, [data, setTableRange, page, setSlicedData]);

  return { slicedData, range: tableRange };
};

//filteredByCategory hook-----------------------------------------------------------------------------
export const useFilterPagination = (categorySelected,filterData, pageFilter, rowsPerPage) => {
  
console.log(filterData);
  const [tableFRange, setTableFRange] = useState([]);
  const [slicedFData, setSlicedFData] = useState([]);
    
 

    useEffect(() => {      
     
      const rangeF = filterData && calculateRange(filterData, rowsPerPage);
      console.log(rangeF);
        const updatedrange = rangeF&&[...rangeF];
      setTableFRange(updatedrange);

        const sliceFDat = filterData && sliceData(filterData, pageFilter, rowsPerPage);
      const updatedSlicedData = sliceFDat && [...sliceFDat];
      setSlicedFData(updatedSlicedData);
      console.log(updatedSlicedData);
    }, [
      categorySelected,pageFilter ,setTableFRange,setSlicedFData
    ]);
  

  return { slicedFData, rangeF: tableFRange };
};

 