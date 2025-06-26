import React from 'react';
import './ThemedTable.css';
import { FaSearch } from 'react-icons/fa';

const ThemedTable = ({
  heading = 'Table',
  columns = [],
  data = [],
  searchTerm = '',
  setSearchTerm = () => {},
  currentPage = 1,
  setCurrentPage = () => {},
  rowsPerPage = 15,
  loading = false,
  error = '',
  actions = null, 
}) => {
  const filteredData = data.filter(item =>
    columns.some(col =>
      item[col.accessor]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="themed-table-wrapper">
      <div className="d-flex justify-content-between mb-3">
        <button className="booking-heading">{heading}</button>
       <div className="search-container">
  <input
    type="text"
    placeholder="Search..."
    className="search-input-icon"
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    }}
  />
  <FaSearch className="search-icon" />
</div>
  

      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle shadow booking-table">
          <thead className="theme-header">
            <tr>
              {columns.map(col => (
                <th key={col.accessor}>{col.label}</th>
              ))}
              {actions && <th>ACTIONS</th>}
            </tr>
          </thead>
          <tbody style={{ fontSize: '14px' }}>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1}>Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={columns.length + 1}>{error}</td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  {columns.map(col => (
                    <td key={col.accessor}>
                      {typeof col.render === 'function'
                        ? col.render(row)
                        : row[col.accessor]}
                    </td>
                  ))}
                  {actions && <td>{actions(row)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            &lt;
          </button>

          {currentPage > 3 && (
            <>
              <button onClick={() => handlePageChange(1)}>1</button>
              {currentPage > 4 && <span className="dots">...</span>}
            </>
          )}

          {[...Array(5)].map((_, i) => {
            const page = currentPage - 2 + i;
            if (page > 0 && page <= totalPages) {
              return (
                <button
                  key={page}
                  className={page === currentPage ? 'active' : ''}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              );
            }
            return null;
          })}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className="dots">...</span>}
              <button onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
            </>
          )}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemedTable;
