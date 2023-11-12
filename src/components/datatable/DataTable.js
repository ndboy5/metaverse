import React, { useState } from "react";

const DataTable = ({ data, columns, onRowClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(20);
  const pageCount = Math.ceil(data?.length / pageSize);
  const [sortColumn, setSortColumn] = useState(null);
  const [isSortDesc, setIsSortDesc] = useState(false);
  const [sortFunction, setSortFunction] = useState(null);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setCurrentPage(0);
  };

  const handleColumnSort = (sortF, currColumn) => {
    setSortFunction(sortF);
    setSortColumn(currColumn);
    setIsSortDesc(!isSortDesc);
  };

  const sortedData = data?.sort((a, b) => {
    const valueA = sortFunction ? sortFunction(a) : a;
    const valueB = sortFunction ? sortFunction(b) : b;

    if (typeof valueA === "string" && typeof valueB === "string") {
      return isSortDesc
        ? valueB.localeCompare(valueA)
        : valueA.localeCompare(valueB);
    } else {
      return isSortDesc ? valueB - valueA : valueA - valueB;
    }
  });

  const filteredData = sortedData?.filter((item) => {
    for (const column of columns) {
      const value = column.render(item);
      if (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm)
      ) {
        return true;
      }
    }
    return false;
  });

  const currentPageData = filteredData?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const showPagination = filteredData?.length > pageSize;

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="p-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {/*TODO: Insert search icon */}
          </div>
          <input
            type="text"
            id="table-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Search for items"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          {/* Table headers */}
          <tr>
            {columns?.map((column, index) => (
              <th
                key={index}
                scope="col"
                onClick={() =>
                  handleColumnSort(column.sortFunction, column.label)
                }
                style={{ cursor: "pointer" }}
              >
                {column.label}
                <span style={{ fontSize: "15px" }}>
                  {sortColumn === column.label ? (
                    isSortDesc ? (
                      <>
                        {/* <i className="text-12 i-Down1"></i> */}
                        {/* <i className={`text-12 i-Up1 text-black sorting-icon-color`}></i> */}
                      </>
                    ) : (
                      <>
                        {/* <i className="text-12 i-Down1 text-black sorting-icon-color"></i> */}
                        {/* <i className={`text-12 i-Up1 text-muted`}></i> */}
                      </>
                    )
                  ) : (
                    <>
                      {/* <i className={`text-12 i-Up1 text-muted`}></i> */}
                      {/* <i className={`text-12 i-Down1 text-muted`}></i> */}
                    </>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Table body */}
          {filteredData?.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="no-records-found">
                No records found
              </td>
            </tr>
          ) : (
            currentPageData?.map((item, index) => (
              <tr
                key={index}
                onClick={onRowClick ? () => onRowClick(item.id) : null}
                className="mouse-pointer"
              >
                {columns?.map((column, columnIndex) => (
                  <td key={columnIndex}>{column.render(item)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Pagination */}
      {showPagination && (
        <div className="d-flex justify-content-between align-items-center">
          <div>
            Showing {currentPage * pageSize + 1} to{" "}
            {Math.min((currentPage + 1) * pageSize, filteredData?.length)} of{" "}
            {filteredData?.length} entries
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 0 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
              </li>
              {Array.from(Array(pageCount).keys())?.map((index) => (
                <li
                  className={`page-item ${
                    currentPage === index ? "active" : ""
                  }`}
                  key={index}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(index)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageCount - 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={handleNextPage}
                  disabled={currentPage === pageCount - 1}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default DataTable;
