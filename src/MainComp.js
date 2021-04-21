import React from 'react';
import './content/bootstrap.css';
import CarouselComp from './carouselMod/CarouselComp'
import QuetionComp from './quetionMod/MainContainerComp'

class MainComp extends React.Component {
    render() {
        return (
            <div className="container">
                {/* <div class="row">
                    <div class="col">
                        <CarouselComp/>
                    </div>
                </div>
                <br/> */}
                <div className="row">
                    <div className="col">
                        <QuetionComp/>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainComp