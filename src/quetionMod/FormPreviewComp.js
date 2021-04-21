import React from 'react';
import '../content/bootstrap.css';
import QueCheckBoxComp from './QueCheckBoxComp'
import QueRadioOptComp from './QueRadioOptComp'
import QueDropDownComp from './QueDropDownComp'
import DateTimePicker from 'react-datetime-picker';

class FormPreviewComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            desc: '',
            questions: []
        };
    }
    render() {
        //console.log(this.state)
        return (
            <div className="row" style={{ display: this.props.activeTab == 'preview' ? 'block' : 'none' }}>
                <div className="col">
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Titel</label>
                        <div className="col-sm-10">
                            <h1>{this.state.title}</h1>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <h2>{this.state.desc}</h2>
                        </div>
                    </div>
                    {
                        this.state.questions.map((que, i) =>
                            que.isValidQue?
                            <div className={que.isRequired? 'card bg-info' : 'card'} style={{marginBottom:'5px'}} key={i}>
                                <div className='card-body'>
                                    <div className="mb-3 row">
                                        <label className="col-sm-1 col-form-label">Que:&nbsp;{i + 1}</label>
                                        <div className="col-sm-10">
                                            <h4>{que.que}</h4> 
                                        </div>
                                    </div>
                                    {
                                        this.getQueTypeUI(que)
                                    }
                                </div>
                            </div>
                            :
                            null
                        )
                    }
                </div>
            </div>
        );
    }
    getQueTypeUI = (que) => {
        switch(que.queType){
            case "1": return <input type="text" className="form-control"/>
            case "2": return <textarea type="text" className="form-control"/>
            case "3": return <QueRadioOptComp options={que.options} mode='preview'/>
            case "4": return <QueCheckBoxComp options={que.options} mode='preview'/>
            case "5": return <QueDropDownComp options={que.options} mode='preview'/>
            case "6": return <DateTimePicker/>
        }
    };

    update(formBuilderData) {
        this.setState(formBuilderData)
    }
}

export default FormPreviewComp