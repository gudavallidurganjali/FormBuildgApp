import React from 'react';
import '../content/bootstrap.css';

//We can write this as a functional component.
class QueCheckBoxComp extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <div>
                    {
                        this.props.options.map((option, i) =>
                            <div className="form-check" key={i}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label">
                                    {option}
                                </label>
                            </div>
                        )
                    }
                </div>
                <div style={{display: this.props.mode == 'preview' ? 'none' : 'block' }}>
                    <div className="input-group mb-3">
                        <input type="text" ref={node=>this.txtOption = node} className="form-control" placeholder="Answer option" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button className="btn btn-success" type="button" onClick={()=>this.props.addOption(this.txtOption.value)} id="button-addon2">Add Option</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default QueCheckBoxComp