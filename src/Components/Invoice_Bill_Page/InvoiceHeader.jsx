const InvoiceHeader = ({ onAddClick }) => (
  <div className="invoice-header-bar">
    <button className="add-button" onClick={onAddClick}>Add</button>
  </div>
);
export default InvoiceHeader;
