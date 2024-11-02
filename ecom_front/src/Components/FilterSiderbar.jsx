import React, { useState } from 'react';
// import { Slider } from '@mui/material';

const FilterSiderbar = () => {
  const [range, setRange] = React.useState([5, 20]);
  function handleChanges(event, newValue) {
    setRange(newValue);
  }

  return (
    <div>
      <div className="shadow">


        <div className="row mt-3">
          {/* right side col  */}
          <div className="col-md-12 mt-5 p-3">
            <div className="border bg-light">


              <div>
                {/* Price filter box */}
                <p className="mx-5 mt-5 text-dark"><b>Filter by price</b></p>
                {/* <Slider
                className="mx-5 w-75 text-warning"
                value={range}
                onChange={handleChanges}
                valueLabelDisplay="auto"
                min={50}
                max={100}
            /> */}
                <p className="mx-5">Selected Price is $ {range[0]} - {range[1]}</p>
              </div>

              <div className="mb-5">
                <p className='mx-5 mt-3 text-dark'><b>Filter by Category</b></p>
                <div className='mx-5 fs-5'>
                  <div className="form-check m-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    // onChange={() => setSelectedBrand('GUCCI')}
                    // checked={selectedBrand === 'GUCCI'}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      GUCCI
                    </label>
                  </div>
                  <div className="form-check m-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    // onChange={() => setSelectedBrand('GUCCI')}
                    // checked={selectedBrand === 'GUCCI'}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      GUCCI
                    </label>
                  </div>
                  <div className="form-check m-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                    // onChange={() => setSelectedBrand('GUCCI')}
                    // checked={selectedBrand === 'GUCCI'}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      GUCCI
                    </label>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSiderbar