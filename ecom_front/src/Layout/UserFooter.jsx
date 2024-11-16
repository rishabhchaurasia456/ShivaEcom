import React from 'react'
import { Link } from "react-router-dom"

const sections = [
  {
    heading: 'Important link',
    links: [
      {
        to: '/',
        text: 'Kite Camps',
      },
      {
        to: '/',
        text: 'Discover KiteActive',
      },
      {
        to: '/',
        text: 'KiteActive Team',

      },
      {
        to: '/',
        text: 'Kitesurfing Packages',
      },
      {
        to: '/',
        text: 'Become Teamrider',
      },
    ],
  },
  {
    heading: 'Links',
    links: [
      {
        to: '/',
        text: 'About Us',
      },
      {
        to: '/',
        text: 'Booking & Payment',
      },
      {
        to: '/',
        text: 'Privacy Policy',
      },
      {
        to: '/',
        text: 'Terms & Condition',
      },
      {
        to: '/',
        text: 'Cookies Policy',
      },
    ],
  },
];

const footerdata = {
  maindesc: "Join the KiteActive community! Discover the best kitespots in the world and make new friends! Together with our team we will make sure you will have the adventure of a lifetime!",

  heading: "Contact Us",
  para: "For kitesurfing trips and inquiries, reach out to us! Contact our team today for the ride of your life!",
};

const UserFooter = () => {
  return (
    <div>
      <div className='container-fluid'>
        <div className="row">
          <div className="footer footer_bg">
            <section className="py-4 py-md-5 py-xl-8">
              <div className="container-fluid overflow-hidden">
                <div className="row gy-4 gy-lg-0 justify-content-xl-between">

                  {/* col one  */}
                  <div className="col-12 col-md-4 col-lg-4 col-xl-3 p-0 m-0 mx-2">
                    <div className="widget">
                      <Link to="/demo/gfastreact/">
                        {/* <img src={footerlogo} alt="Logo" className='footerlogo' /> */}
                        Shiva Mega Mart
                      </Link>
                    </div>

                    <div className='text-light'>
                      <p className='mt-4'>{footerdata.maindesc}</p>
                    </div>


                  </div>

                  {sections.map((section, index) => (
                    <div className="col-12 col-md-4 col-lg-2 col-xl-2 text-light p-0 m-0" key={index}>
                      <div>
                        <h4 className="fw-bold mb-4">{section.heading}</h4>
                        <ul className="list-unstyled">
                          {section.links.map((link, index) => (
                            <li className="mb-3" key={index}>
                              <Link to={link.to} className="footer_link">
                                <i className="fa fa-angle-double-right me-2"></i>
                                {link.text}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}

                  {/* col three  */}
                  <div className="col-12 col-md-4 col-lg-4 col-xl-3 text-light m-0 p-0">
                    <div className="">
                      <h4 className="fw-bold">{footerdata.heading}</h4>
                      <p className='mt-4'>{footerdata.para}</p>

                    </div>

                    <div className="navbar-nav TNB mt-3">
                      {/* socila icons  */}
                      <div className='d-flex'>
                        <Link to="/" className="nav-link me-5"> <i className='fa fa-facebook fa_icon_footer'></i></Link>
                        <Link to="/" className="nav-link me-5"> <i className='fa fa-instagram  fa_icon_footer'></i></Link>
                        <Link to="/" className="nav-link me-5"> <i className='fa fa-youtube fa_icon_footer '></i></Link>
                        <Link to="/" className="nav-link me-5"> <i className='fa fa-twitter fa_icon_footer '></i></Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* <!-- Copyright - Section --> */}
            <div className="container-fluid p-3">
              <div className="row border-top">
                <div className="col">
                  <div className="copyright text-center mt-3">
                    &copy; Shiva Mega Mart™ – Travel brand since 2011
                  </div>
                </div>
              </div>
            </div>
            {/* copyright end  */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserFooter