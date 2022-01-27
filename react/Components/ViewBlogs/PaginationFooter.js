import React, { useEffect } from "react";
 import styles from "./PaginationFooter.css";

export const PaginationFooter = ({ range, setPage, page, slicedData }) => {
  useEffect(() => {
    if (slicedData.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slicedData, page, setPage]);
  return (
    <div className={styles.PagnationContainer} >
      {range.map((element, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === element ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(element)}
        >
          {element}
        </button>
      ))}
    </div>
  );
};



export const FilterPaginationFooter = ({ rangeF, setPageFilter, pageFilter, slicedFData }) => {
  useEffect(() => {
    if (slicedFData.length < 1 && pageFilter !== 1) {
      setPageFilter(pageFilter - 1);
    }
  }, [
     pageFilter, setPageFilter
  ]);
  return (
    <div className={styles.PagnationContainer} >
      {rangeF.map((element, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            pageFilter === element ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPageFilter(element)}
        >
          {element}
        </button>
      ))}
    </div>
  );
};