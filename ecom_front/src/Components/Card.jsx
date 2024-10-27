import React from 'react';
import { Link } from 'react-router-dom'
// import {
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBIcon,
//   MDBBtn,
//   MDBRipple,
// } from "mdb-react-ui-kit";

const Card = ({ product }) => {
  const baseURL = 'http://localhost:8000/'; // Update to your backend URL if needed

  // Use the first image in the array if it exists
  const imageUrl = product.images && product.images.length > 0
    ? `${baseURL}${product.images[0].replace(/\\/g, '/')}` // Correct file path format for URLs
    : 'default-image.jpg'; // Fallback if no image

  return (
    <div className="col-md-3 col-sm-4 col-6">
      <Link to={`/product_details/${product._id}`} className='nav-link'>
        <div className="product_card p-3">
          <img
            src={imageUrl}
            className="product_card_img"
            alt={product.title || 'Product image'}
            width="100%"
          />
          <div className="product_card_body">
            <p className="product_card_title">{product.title}</p>
            <p className="product_card_price">
              <b>&#8377;{product.price}</b>
              <span className="text-decoration-line-through ms-2">&#8377;{product.mrp}</span>
            </p>
            <p className="product_card_last">
              <span className="fa fa-star product_card_star" /> {product.rating || 'N/A'}
              <span className="product_card_pack">{product.pack || 'Pack of 1'}</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;

    //   <MDBContainer fluid className="my-5 text-center">
    //   <h4 className="mt-4 mb-5">
    //     <strong>Bestsellers</strong>
    //   </h4>

    //   <MDBRow>
    //     <MDBCol  className="mb-4">
    //       <MDBCard>
    //         <MDBRipple
    //           rippleColor="light"
    //           rippleTag="div"
    //           className="bg-image rounded hover-zoom"
    //         >
    //           <MDBCardImage
    //             src={imageUrl}
    //             fluid
    //             className="w-100"
    //           />
    //           {/* <a href="#!">
    //             <div className="mask">
    //               <div className="d-flex justify-content-start align-items-end h-100">
    //                 <h5>
    //                   <span className="badge bg-primary ms-2">New</span>
    //                 </h5>
    //               </div>
    //             </div>
    //             <div className="hover-overlay">
    //               <div
    //                 className="mask"
    //                 style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
    //               ></div>
    //             </div>
    //           </a> */}
    //         </MDBRipple>
    //         <MDBCardBody>
    //           <Link to={`/product_details/${product._id}`} className="text-reset">
    //             <h5 className="card-title mb-3">{product.title}</h5>
    //           </Link>
    //           <a href="#!" className="text-reset">
    //             <p>&#8377;{product.mrp}</p>
    //           </a>
    //           <h6 className="mb-3">{product.rating || 'N/A'}</h6>
    //         </MDBCardBody>
    //       </MDBCard>
    //     </MDBCol>
    //   </MDBRow>
    // </MDBContainer>


// import React from "react";


// function App() {
//   return (
//     <MDBContainer fluid className="my-5 text-center">
//       <h4 className="mt-4 mb-5">
//         <strong>Bestsellers</strong>
//       </h4>

//       <MDBRow>
//         <MDBCol md="12" lg="4" className="mb-4">
//           <MDBCard>
//             <MDBRipple
//               rippleColor="light"
//               rippleTag="div"
//               className="bg-image rounded hover-zoom"
//             >
//               <MDBCardImage
//                 src={imageUrl}
//                 fluid
//                 className="w-100"
//               />
//               {/* <a href="#!">
//                 <div className="mask">
//                   <div className="d-flex justify-content-start align-items-end h-100">
//                     <h5>
//                       <span className="badge bg-primary ms-2">New</span>
//                     </h5>
//                   </div>
//                 </div>
//                 <div className="hover-overlay">
//                   <div
//                     className="mask"
//                     style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
//                   ></div>
//                 </div>
//               </a> */}
//             </MDBRipple>
//             <MDBCardBody>
//               <Link to={`/product_details/${product._id}`} className="text-reset">
//                 <h5 className="card-title mb-3">{product.title}</h5>
//               </Link>
//               <a href="#!" className="text-reset">
//                 <p>&#8377;{product.mrp}</p>
//               </a>
//               <h6 className="mb-3">{product.rating || 'N/A'}</h6>
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default App;