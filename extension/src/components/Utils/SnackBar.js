import React, { PureComponent } from 'react'

export class SnackBar extends PureComponent {

    message = '';
    showError = false;
    showSuccess = false;

    constructor(props) {
        super(props)
    
        this.state = {
             isActive : false
        }
    }
    
    showErrorMessage = (message="oops something went wrong", timeInMs = 3000) => {
        this.message = message;
        this.showError = true;
        this.showSuccess = false;
        this.setState({ isActive: true },
             () => {
                 setTimeout(() => {
                     this.showError = false;
                     this.setState({ isActive: false });
                }, timeInMs);
             });
    }

    showSuccessMessage = (message="success", timeInMs = 3000) => {
        this.message = message;
        this.showError = false;
        this.showSuccess = true;
        this.setState({ isActive: true },
             () => {
                 setTimeout(() => {
                     this.showSuccess = false;
                     this.setState({ isActive: false });
                }, timeInMs);
             });
    }

    render() {
        const isActive = this.state.isActive;
        return (
                    <div className = {isActive ? "snackbar show" : "snackbar"}>
                        {this.message}
                    </div>
        )
        
    }
}

export default SnackBar
