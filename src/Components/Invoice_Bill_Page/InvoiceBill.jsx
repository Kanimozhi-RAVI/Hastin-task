// InvoiceBill.js
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  fetchChargeNamesRequest,
  fetchTaxMastersRequest,
  getAgentRequest,
  getBookingAgentRequest,
  getHeaderRequest,
  getInvoiceBillRequest,
  getInvoicePartydetailsRequest,
  billtoRequest,
  getCustomerDetailRequest
} from '../Action_file/HclBookingAction';

import { fetchCurrenciesRequest } from '../Action_file/VendorAction';

import InvoiceHeader from './InvoiceHeader';
import InvoiceFormAdd from './InvoiceFormAdd';
import InvoiceFormView from './InvoiceFormView';

import '../Invoice_Bill_Page/InvoiceBill.css';

function InvoiceBill() {
  const dispatch = useDispatch();
  const { id, invoiceId } = useParams();

  const [activeInvoiceId, setActiveInvoiceId] = useState(invoiceId || null);
  const [mode, setMode] = useState('view');

  // Redux state
  const invoiceList = useSelector((state) => state.bookinginvoice?.invoice?.invoices || []);
  const invoicePartyData = useSelector((state) => state.bookinginvoice?.invoiceDetail || {});
  const currencies = useSelector((state) => state.vendor?.currencies || []);
  const rawHeaders = useSelector((state) => state.bookinginvoice?.header || []);
  const accountHeads = useMemo(() => rawHeaders, [rawHeaders]);
  const bookinguser = useSelector((state) => state.bookinginvoice?.bookinguser || []);
  const suggestions = useSelector((state) => state.bookinginvoice?.suggestions || []);
  const customerDetail = useSelector((state) => state.bookinginvoice?.customerDetail || null);

  const invoice = invoicePartyData.invoice || {};
  const invoiceItems = invoicePartyData.invoicesComponents || [];

  // 🔁 Initial API dispatches
  useEffect(() => {
    dispatch(fetchCurrenciesRequest());
    dispatch(getHeaderRequest());
    dispatch(getAgentRequest());
    dispatch(getBookingAgentRequest());
    dispatch(fetchTaxMastersRequest());
    dispatch(fetchChargeNamesRequest());

    if (id) dispatch(getInvoiceBillRequest(id));
  }, [dispatch, id]);

  // 🔁 Fetch invoice party details
  useEffect(() => {
    if (invoiceId) {
      setActiveInvoiceId(invoiceId);
      dispatch(getInvoicePartydetailsRequest({ id: invoiceId }));
    }
  }, [dispatch, invoiceId]);

  // 🧠 On invoice tab click
  const handleInvoiceClick = (invId) => {
    if (activeInvoiceId === invId) {
      setActiveInvoiceId(null);
    } else {
      setActiveInvoiceId(invId);
      setMode('view');
      dispatch(getInvoicePartydetailsRequest({ id: invId }));
    }
  };

  const handleBillToSearch = (text) => {
    console.log("🚀 Dispatching BILLTO_REQUEST for:", text);
    dispatch(billtoRequest(text));
  };

  // 📋 Select suggestion to fetch customer details
  const handleCustomerSelect = (customerId) => {
    console.log("📥 Dispatching GET_CUSTOMER_DETAIL_REQUEST for:", customerId);
    dispatch(getCustomerDetailRequest(customerId));
  };

  return (
    <div className="invoice-wrapper">
      <InvoiceHeader onAddClick={() => setMode('add')} />

      {mode === 'add' ? (
       <InvoiceFormAdd
  currencies={currencies}
  setMode={setMode}
  invoiceData={invoice}
  accountHeads={accountHeads}
  bookinguser={bookinguser}
  suggestions={suggestions}
  customerDetail={customerDetail}
  onBillToSearch={handleBillToSearch}
  onCustomerSelect={handleCustomerSelect}
/>
      ) : (
        <div className="invoice-tab-header">
          {invoiceList.map((inv) => (
            <div key={inv.id} className="invoice-section">
              <div
                className={`invoice-tab ${inv.id === activeInvoiceId ? 'active' : ''}`}
                onClick={() => handleInvoiceClick(inv.id)}
              >
                <div className="tab-label">INVOICE #: {inv.invoiceNo}</div>
                <div className="tab-subtext">Customer: {inv.custName}</div>
              </div>

              {inv.id === activeInvoiceId && (
                <InvoiceFormView
                  invoice={invoice}
                  invoiceItems={invoiceItems}
                  currencies={currencies}
                  accountHeads={accountHeads}
                  bookinguser={bookinguser}
                  suggestions={suggestions}
                  customerDetail={customerDetail}
                  onBillToSearch={handleBillToSearch}
                  onCustomerSelect={handleCustomerSelect}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InvoiceBill;
