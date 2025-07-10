import React, { useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

function DropCard() {
  const [selectedCro, setSelectedCro] = useState(null);
  const [croError, setCroError] = useState('');

  const croOptions = [
    { value: 1, label: 'CRO123' },
    { value: 2, label: 'CRO456' },
    { value: 3, label: 'CRO789' },
  ];

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card p-4 shadow-sm rounded-4">
            <div className="position-relative mb-2">
              <label
                htmlFor="croSelect"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: selectedCro ? '-10px' : '10px',
                  fontSize: '13px',
                  padding: '0 5px',
                  backgroundColor: '#fff',
                  color: '#6c757d',
                  transition: 'all 0.2s ease-in-out',
                  zIndex: 2,
                }}
              >
                Against CRO
              </label>

              <Select
                inputId="croSelect"
                options={croOptions}
                value={croOptions.find((opt) => opt.value === selectedCro)}
                onChange={(selectedOption) => {
                  setSelectedCro(selectedOption?.value || '');
                  setCroError('');
                }}
                placeholder=""
                styles={{
                  container: (base) => ({
                    ...base,
                    fontSize: '12px',
                  }),
                  control: (base, state) => ({
                    ...base,
                    minHeight: '38px',
                    height: '38px',
                    backgroundColor: 'transparent',
                    border: state.isFocused
                      ? '1px solid #0d6efd'
                      : '1px solid #ced4da',
                    boxShadow: state.isFocused
                      ? '0 0 0 0.2rem rgba(13, 110, 253, 0.25)'
                      : 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    transition: 'all 0.15s ease-in-out',
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    paddingTop: '2px',
                    paddingLeft: '8px',
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#212529',
                    fontSize: '13px',
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#999',
                    fontSize: '13px',
                  }),
                  indicatorSeparator: () => ({
                    display: 'none',
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: '#999',
                    padding: 4,
                  }),
                  menu: (base) => ({
                    ...base,
                    border: '1px solid #ccc',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                    zIndex: 5,
                    fontSize: '12px',
                  }),
                  option: (base, state) => ({
                    ...base,
                    fontSize: '13px',
                   
                    color: state.isSelected ? '#fff' : '#212529',
                    backgroundColor: state.isSelected
                      ? '#0d6efd'
                      : state.isFocused
                      ? '#f8f9fa'
                      : 'transparent',
                    cursor: 'pointer',
                  }),
                }}
              />

              {croError && <div className="text-danger small mt-1">{croError}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropCard;
