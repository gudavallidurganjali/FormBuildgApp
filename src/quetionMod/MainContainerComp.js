import React from 'react';
import '../content/bootstrap.css';
import FormBuilderComp from './FormBuilderComp';
import FormPreviewComp from './FormPreviewComp';

class MainContainerComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'entry',
        };
        this.updateFormPreview = this.updateFormPreview.bind(this)
    }
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs">
                            <li className="nav-item">
                                <a className={this.state.activeTab == 'entry' ? 'nav-link active' : 'nav-link'} onClick={() => this.handleTabClick('entry')}>Entry</a>
                            </li>
                            <li className="nav-item">
                                <a className={this.state.activeTab == 'preview' ? 'nav-link active' : 'nav-link'} onClick={() => this.handleTabClick('preview')}>Preview</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <FormBuilderComp
                            activeTab={this.state.activeTab}
                            updateFormPreview={this.updateFormPreview} />
                        <FormPreviewComp
                            ref={node => this.formPreviewComp = node}
                            activeTab={this.state.activeTab} />
                    </div>
                </div>
            </div>

        );
    }

    //Switching between FprmBuilder & FormPreview
    handleTabClick(tabName) {
        this.setState({activeTab: tabName });
    }

    //This function is responsible to update FormPreview as per changes in FormBuilder
    updateFormPreview(formBuilderData) {
        if (this.formPreviewComp)
            this.formPreviewComp.update(formBuilderData)
    }
}

export default MainContainerComp