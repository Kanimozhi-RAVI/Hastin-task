import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookinglistRequest } from '../Action_file/HclBookingAction';
import ThemedTable from '../ReusableCode.jsx/ThemedTable';
import '../Hcl_Page/BookingTable.css'

const BookingTable = () => {
  const dispatch = useDispatch();
  const bookingData = useSelector(state => state.bookinguser?.bookinguser || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getBookinglistRequest());
  }, [dispatch]);

  const columns = [
    { label: 'BOOKING NO', accessor: 'bookingNo' },
    { label: 'REF NO', accessor: 'shipperAgentRefNo' },
    { label: 'BOL', accessor: 'blNo' },
    { label: 'VOLUME', accessor: 'volume' },
    { label: 'SHIPPER', accessor: 'forwarderCode' },
    { label: 'POL', accessor: 'polCode' },
    { label: 'FPOD', accessor: 'fdCode' },
    { label: 'PRE-CARR', accessor: 'preCarriageVsl' },
    { label: 'SOB', accessor: 'preCarriageSob' },
    { label: 'MOV', accessor: 'movCarriageVsl' },
    { label: 'SOB', accessor: 'motherVesselSob' },
    { label: 'ON-CARR', accessor: 'onCarriageVsl' },
    { label: 'SOB', accessor: 'onCarriageSob' },
    { label: 'STATUS', accessor: 'bookingStatus' },
  ];

  return (
    <ThemedTable
      heading="BOOKING LIST"
      columns={columns}
      data={bookingData}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      rowsPerPage={15}
    />
  );
};

export default BookingTable;
