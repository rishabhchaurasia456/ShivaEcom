// import React, { useState } from 'react';
// // import { Slider } from '@mui/material';

// const FilterSiderbar = () => {
//   const [range, setRange] = React.useState([5, 20]);
//   function handleChanges(event, newValue) {
//     setRange(newValue);
//   }

//   return (
//     <div>
//       <div className="shadow">


//         <div className="row mt-3">
//           {/* right side col  */}
//           <div className="col-md-12 mt-5 p-3">
//             <div className="border bg-light">


//               <div>
//                 {/* Price filter box */}
//                 <p className="mx-5 mt-5 text-dark"><b>Filter by price</b></p>
//                 {/* <Slider
//                 className="mx-5 w-75 text-warning"
//                 value={range}
//                 onChange={handleChanges}
//                 valueLabelDisplay="auto"
//                 min={50}
//                 max={100}
//             /> */}
//                 <p className="mx-5">Selected Price is $ {range[0]} - {range[1]}</p>
//               </div>

//               <div className="mb-5">
//                 <p className='mx-5 mt-3 text-dark'><b>Filter by Category</b></p>
//                 <div className='mx-5 fs-5'>
//                   <div className="form-check m-2">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault1"
//                     // onChange={() => setSelectedBrand('GUCCI')}
//                     // checked={selectedBrand === 'GUCCI'}
//                     />
//                     <label className="form-check-label" htmlFor="flexRadioDefault1">
//                       Stencils
//                     </label>
//                   </div>
//                   <div className="form-check m-2">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault1"
//                     // onChange={() => setSelectedBrand('GUCCI')}
//                     // checked={selectedBrand === 'GUCCI'}
//                     />
//                     <label className="form-check-label" htmlFor="flexRadioDefault1">
//                       Roller
//                     </label>
//                   </div>
//                 </div>

//                 <p className='mx-5 mt-3 text-dark'><b>Filter by size</b></p>
//                 <div className='mx-5 fs-5'>
//                   <div className="form-check m-2">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault1"
//                     // onChange={() => setSelectedBrand('GUCCI')}
//                     // checked={selectedBrand === 'GUCCI'}
//                     />
//                     <label className="form-check-label" htmlFor="flexRadioDefault1">
//                       16*24inch
//                     </label>
//                   </div>
//                   <div className="form-check m-2">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault1"
//                     // onChange={() => setSelectedBrand('GUCCI')}
//                     // checked={selectedBrand === 'GUCCI'}
//                     />
//                     <label className="form-check-label" htmlFor="flexRadioDefault1">
//                       16*24inch
//                     </label>
//                   </div>
//                   <div className="form-check m-2">
//                     <input
//                       className="form-check-input"
//                       type="radio"
//                       name="flexRadioDefault"
//                       id="flexRadioDefault1"
//                     // onChange={() => setSelectedBrand('GUCCI')}
//                     // checked={selectedBrand === 'GUCCI'}
//                     />
//                     <label className="form-check-label" htmlFor="flexRadioDefault1">
//                       16*24inch
//                     </label>
//                   </div>
//                 </div>
//               </div>

//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default FilterSiderbar

import React from 'react';

const FilterSiderbar = ({ range, setRange, selectedCategory, setSelectedCategory, selectedSize, setSelectedSize }) => {
  function handleRangeChange(event, newValue) {
    setRange(newValue);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    console.log(event.target.value)
  }

  function handleSizeChange(event) {
    setSelectedSize(event.target.value);
    console.log(event.target.value)

  }

  return (
    <div>
      <div className='container-fluid'>
        <div className="row mt-3">
          <div className="col-md-12 my-5 p-3">
            <div className="card shadow border bg-light">
              <div>
              <h4 className='mx-5 mt-4'>Filter</h4>
                {/* Price filter box */}
                {/* <p className="mx-5 mt-5 text-dark"><b>Filter by price</b></p> */}
                {/* <p className="mx-5">Selected Price is $ {range[0]} - {range[1]}</p> */}

                <div className="mb-5">
                  <p className='mx-5 mt-3 text-dark'><b>Filter by Category</b></p>
                  <div className='mx-5 fs-5'>
                    <div className="form-check m-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Stencils"
                        checked={selectedCategory === 'Stencils'}
                        onChange={handleCategoryChange}
                      />
                      <label className="form-check-label">
                        Stencils
                      </label>
                    </div>
                    <div className="form-check m-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="Roller"
                        checked={selectedCategory === 'Roller'}
                        onChange={handleCategoryChange}
                      />
                      <label className="form-check-label">
                        Roller
                      </label>
                    </div>
                  </div>
                </div>

                <p className='mx-5 mt-3 text-dark'><b>Filter by size</b></p>
                <div className='mx-5 fs-5'>
                  <div className="form-check m-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="16*24inch"
                      checked={selectedSize === '16*24inch'}
                      onChange={handleSizeChange}
                    />
                    <label className="form-check-label">
                      16*24inch
                    </label>
                  </div>
                  {/* Add more sizes as necessary */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSiderbar;
