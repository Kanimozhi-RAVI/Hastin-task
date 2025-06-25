import React, { useEffect } from 'react';
import './BookingTable.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBookinglistRequest } from '../Action_file/HclBookingAction';

function BookingTable() {
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.bookinguser?.bookinguser || []);
  // console.log("Redux Booking Data:", Data);
    // const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    dispatch(getBookinglistRequest());
  }, [dispatch]);

  return (
    <div className="p-5 mt-5">
      <h3 className="booking-heading ">Booking List</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped align-middle shadow booking-table">
          <thead className="theme-header">
            <tr>
              <th>BOOKING NO</th>
              <th>REF NO</th>
              <th>BOL</th>
              <th>VOLUME</th>
              <th>SHIPPER</th>
              <th>POL</th>
              <th>FPOD</th>
              <th>PRE-CARR</th>
              <th>PRE-CARR SOB</th>
              <th>MOV</th>
              <th>ON-CARR VSL</th>
              <th>ON-CARR SOB</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {Data?.length > 0 ? (
              Data.map(userlist => (
                <tr key={userlist.id}>
                  <td>{userlist.bookingNo}</td>
                  <td>{userlist.shipperAgentRefNo}</td>
                  <td>{userlist.blNo}</td>
                  <td>{userlist.volume}</td>
                  <td>{userlist.forwarderCode}</td>
                  <td>{userlist.polCode}</td>
                  <td>{userlist.fdCode}</td>
                  <td>{userlist.preCarriageVsl}</td>
                  <td>{userlist.preCarriageSob}</td>
                  <td>{userlist.movCarriageVsl}</td>
                  <td>{userlist.onCarriageVsl}</td>
                  <td>{userlist.onCarriageSob}</td>
                  <td>{userlist.bookingStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingTable;
