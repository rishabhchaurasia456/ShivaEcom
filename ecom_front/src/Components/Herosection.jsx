import React from 'react'
import Hero from "../images/Hero.jpeg"

const Herosection = () => {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 p-0">
                        <img src={Hero} className='hero_img' width="100%" alt='hero'/>
                    </div>
                    <div className="col-md-6 background_color">
                        <div className="hero_text_container">
                            <p className='hero_top_h'>New Collection</p>
                            <p className='hero_heading'>
                                STYLE<br/>
                                YOUR<br/>
                                WALLS<br/>
                            </p>
                            <button className='btn btn-dark rounded-pill mt-2 ms-2 px-4 fs-5'>
                                Shop Now &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Herosection