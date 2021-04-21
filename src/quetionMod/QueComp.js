import React from 'react';
import '../content/bootstrap.css';
import QueCheckBoxComp from './QueCheckBoxComp'
import QueRadioOptComp from './QueRadioOptComp'
import QueDropDownComp from './QueDropDownComp'
import DateTimePicker from 'react-datetime-picker';

class QueComp extends React.Component {
    constructor(props) {
        super(props);
        this.options = []
        this.queType = "1"
        this.state = {

        }
    }
    render() {
        return (
            <div className={this.props.data.isValidQue? "card" : "card bg-secondary"} style={{ marginBottom: '5px' }}>
                <div className="card-body">
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Que:&nbsp;{this.props.index + 1}</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.props.data.que} className="form-control" ref={input => this.txtQue = input} onChange={this.queChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={this.props.data.isRequired} ref={input => this.chkReq = input} onChange={this.isRequiredChange}/>
                            <label className="form-check-label">
                                Required
                            </label>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Answer Type</label>
                        <div className="col-sm-10">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="1" name={this.props.index} checked={this.props.data.queType == "1"} onChange={this.queTypeChange} />
                                <label className="form-check-label">
                                    Short Answer
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="2" name={this.props.index} checked={this.props.data.queType == "2"} onChange={this.queTypeChange} />
                                <label className="form-check-label">
                                    Long Answer
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="3" name={this.props.index} checked={this.props.data.queType == "3"} onChange={this.queTypeChange} />
                                <label className="form-check-label">
                                    Radio Options
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="4" name={this.props.index} checked={this.props.data.queType == "4"} onChange={this.queTypeChange} />
                                <label className="form-check-label">
                                    Multi-select checkbox
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="5" name={this.props.index} checked={this.props.data.queType == "5"} onChange={this.queTypeChange} />
                                <label className="form-check-label">
                                    Dropdown selection
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" value="6" name={this.props.index} checked={this.props.data.queType == "6"} onChange={this.queTypeChange} />
                                <label className="form-check-label">
                                    Date-Time
                                </label>
                            </div>
                        </div>
                    </div>
                    {
                        this.getQueTypeUI()
                    }
                </div>
                <div className='card-footer text-center'>
                    <button type="button" style={{ marginLeft: '5px' }} className="btn btn-warning" onClick={() => this.props.moveUp(this.props.index)}>Move Up</button>
                    <button type="button" style={{ marginLeft: '5px' }} className="btn btn-warning" onClick={() => this.props.moveDown(this.props.index)}>Move Down</button>
                    <button type="button" style={{ marginLeft: '5px' }} className="btn btn-info" onClick={() => this.props.duplicateQuestion(this.props.index)}>Duplicate</button>
                    <button type="button" style={{ marginLeft: '5px' }} className="btn btn-danger" onClick={() => this.props.deleteQuestion(this.props.index)}>Delete</button>
                </div>
            </div>
        );
    }

    //As per Answer-Type, required UI is return.
    getQueTypeUI = () => {
        switch (this.props.data.queType) {
            case "1": return <input type="text" className="form-control" />
            case "2": return <textarea type="text" className="form-control" />
            case "3": return <QueRadioOptComp options={this.props.data.options} addOption={this.addOption} />
            case "4": return <QueCheckBoxComp options={this.props.data.options} addOption={this.addOption} />
            case "5": return <QueDropDownComp options={this.props.data.options} addOption={this.addOption} />
            case "6": return <DateTimePicker/>
        }
    };

    //Question validation is done here.
    //If Que is blank or Answer type is belongs to radio/checkbox/dropdown and number of options are less than 2
    //then  Que is invalid.
    isValidQue = (que, queType, options)=>{
        if(!que || que.trim() == "")
            return false;
        if(queType == "3" || queType == "4" || queType == "5"){
            if(options && options.length <= 1)
                return false;
        }    
        return true;
    }
    
    queChange = () => {
        this.props.updateQuestion(this.getState(), this.props.index);
    };

    isRequiredChange = () => {
        this.props.updateQuestion(this.getState(), this.props.index);
    };

    queTypeChange = e => {
        this.options = []
        this.queType = e.target.value;
        this.props.updateQuestion(this.getState(), this.props.index);
    };

    //Here we are capturing whole state of Question.
    getState = () => {
        return {
            que: this.txtQue.value,
            queType: this.queType,
            options: this.options,
            isRequired: this.chkReq.checked,
            isValidQue: this.isValidQue(this.txtQue.value, this.queType, this.options)
        };
    };

    //We are using same options object for checkbox/radio/drpdown
    addOption = (option) => {
        this.options.push(option)
        this.props.updateQuestion(this.getState(), this.props.index);
    }
}

export default QueComp