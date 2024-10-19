import React from 'react'
import why1 from "../images/why1.webp"
import why2 from "../images/download.png"
import why3 from "../images/why3.webp"
import why4 from "../images/why4.webp"

const whydata=[
    {
        img: why1,
        heading: "Simple & Easy to Use",
        para: "Stencils-the simple DIY tool to paint trending patterns on all surfaces. Cut from durable mylar plastic, and designed for easy use and longevity."
    },
    {
        img: why2,
        heading: "Affordable home decor",
        para: "Stencils-a money saving alternative to messy home renovations. Upcycle tired vinyl & tile floors, furniture, walls and more with just paint & stencils."
    },
    {
        img: why3,
        heading: "Satisfying DIY Project",
        para: "Create a home with heart & personality. Stenciling is easy to learn + offers instant rewards. Enjoy the process of creativity and pride in your creativity"
    },
    {
        img: why4,
        heading: "Make it uniquely yours",
        para: "Choose the stencil patterns + paints you love to add your unique personal design touch to your home. The creative possibilities are limitless!"
    }
]

const WhyStencils = () => {
  return (
    <div>
        <div className="container">
            <h1 className='text-center mt-5'>Why Stencils?</h1>
            <div className="row">
            {whydata.map((items, index) =>(
                <div className="col-lg-3 col-md-6">
                    <div className="why_section">
                        <img src={items.img} className='why_img' alt=''/>
                        <h2 className='why_heading'>{items.heading}</h2>
                        <p className='why_para'>{items.para}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default WhyStencils