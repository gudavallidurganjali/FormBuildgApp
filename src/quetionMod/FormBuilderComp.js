import React from 'react';
import '../content/bootstrap.css';
import QueComp from './QueComp'


class FormBuilderComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: []
        }
        this.titleChange = this.titleChange.bind(this)
        this.descChange = this.descChange.bind(this)
        this.addQuestion = this.addQuestion.bind(this)
        this.updateQuestion = this.updateQuestion.bind(this)
        this.deleteQuestion = this.deleteQuestion.bind(this)
        this.duplicateQuestion = this.duplicateQuestion.bind(this)
        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)
    }
    render() {
        return (
            <div className="row" style={{display: this.props.activeTab == 'entry' ? 'block' : 'none' }}>
                <div className="col">
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Titel</label>
                        
                        <div className="col-sm-10">
                            <input type="text" className="form-control" ref={input=>this.txtTitle = input} onChange={this.titleChange} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                        <input type="text" className="form-control" ref={input=>this.txtDesc = input} onChange={this.descChange} />
                        </div>
                    </div>
                    <br/>
                    {
                        this.state.questions.map((que, i) => <QueComp key={i}
                            data={que}
                            index={i}
                            updateQuestion={this.updateQuestion}
                            deleteQuestion={this.deleteQuestion}
                            duplicateQuestion={this.duplicateQuestion}
                            moveUp={this.moveUp}
                            moveDown={this.moveDown}
                            />)
                    }
                    <div className='text-center'>
                        <button type="button" style={{marginBottom:'5px'}} className="btn btn-primary" onClick={this.addQuestion}>Add Question</button>
                    </div>
                </div>
            </div>
        );
    }

    //After every change, here we are updating FormPreview.
    componentDidUpdate(){
        this.props.updateFormPreview(this.state)
    }

    titleChange(){
        this.setState({title: this.txtTitle.value})
    }

    descChange(){
        this.setState({desc: this.txtDesc.value})
    }

    addQuestion(){
        let que = {que:'', queType:'1', options:[], isRequired:false, isValid:false}
        this.setState((state)=>{ return{questions:[...state.questions,que]}})
    }

    deleteQuestion(i){
        let questions = []
        this.state.questions.map((que,j)=>{
            if(i!=j)
                questions.push(que)
        });
        this.setState((state)=>{ return{questions:questions}})
    };

    duplicateQuestion(i){
        let que = this.state.questions[i]
        this.setState((state)=>{ return{questions:[...state.questions, que]}})
    };

    moveUp(i){
        if(i >= 1) {
            let temp = this.state.questions[i - 1];
            this.state.questions[i - 1] = this.state.questions[i]
            this.state.questions[i] = temp 
        }
        let que = this.state.questions[i]
        this.setState((state)=>{ return{questions:[...state.questions]}})
    };

    moveDown(i){
        if(i < this.state.questions.length -1) {
            let temp = this.state.questions[i + 1];
            this.state.questions[i + 1] = this.state.questions[i]
            this.state.questions[i] = temp 
        }
        let que = this.state.questions[i]
        this.setState((state)=>{ return{questions:[...state.questions]}})
    };

    updateQuestion(que, i){
        this.setState((state)=>{ 
                state.questions[i] = que
                return{questions:state.questions}
            }
        )
    }
}

export default FormBuilderComp