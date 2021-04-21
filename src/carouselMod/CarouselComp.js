import React from 'react';
import './CarouselComp.css'
import '../content/bootstrap.css';
import img1 from '../content/img/img1.jpeg'
import img2 from '../content/img/img2.jpeg'
import img3 from '../content/img/img3.jpeg'
import img4 from '../content/img/img4.jpeg'
import img5 from '../content/img/img5.jpeg'
import img6 from '../content/img/img6.jpeg'
import img7 from '../content/img/img7.jpeg'
import img8 from '../content/img/img8.jpeg'
import img9 from '../content/img/img9.jpeg'

const IMGCOL = [img1,img2,img3,img4,img5,img6,img7,img8,img9,img1,img2,img3,img4,img5,img6,img7,img8,img9]
const IMGPERBATCH = 4
const MAXBATCH = IMGCOL.length / IMGPERBATCH
const CAROUSEL_INTERVAL = 4000

class CarouselComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentBatch: 0
        }
    }

    render() {
        let imgs = []
        for(let i = 0; i < IMGPERBATCH; i++) {
            if(this.state.currentBatch * IMGPERBATCH + i < IMGCOL.length) {
                imgs.push(
                    <div className='img' style={{display:'inline-block'}} >
                        <img src={IMGCOL[this.state.currentBatch * IMGPERBATCH + i]} className='img-cont' />
                    </div>
                )
            }
        }
         
        return (
            <div className="card">
                <div className="card-header">
                    CarouselComp
                </div>
                <div className="card-body">
                    <div className="row text-center">
                        <div className='col'>
                        {
                            imgs
                        }
                        <button type="button" className="btn btn-primary next-img" onClick={this.nextBatch} disabled={this.state.currentBatch > MAXBATCH -1}>Next</button>
                        <button type="button" className="btn btn-primary prev-img" onClick={this.prevBatch} disabled={this.state.currentBatch < 1 }>Prev</button>
                        </div>
                        
                    </div>
                </div>
                <div className='card-footer text-center'>
                    {
                        imgs.map((imgPos, i)=>{
                            return <div className="img-pos"></div>
                        })
                    }        
                    
                </div>
            </div>
        );
    }
    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.carousel(),
        //     CAROUSEL_INTERVAL
        //   );
    }
    carousel = ()=>{
        this.nextBatch()
        if(this.state.currentBatch > MAXBATCH -1){
            this.state.currentBatch = 0;
        }
    }
    nextBatch = ()=>{
        this.setState({currentBatch:this.state.currentBatch + 1})
    }
    prevBatch = ()=>{
        this.setState({currentBatch:this.state.currentBatch - 1})
    }
}

export default CarouselComp