import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn,  signOut } from '../actions';

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '574396518798-9s7p3qehdqkjl87j1bo8rg65624hpg8v.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                // this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange); //change in future
            })
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
        // this.setState({ isSignedIn: this.auth.isSignedIn.get() }) before Redux
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return <div>{this.props.isSignedIn}</div>;
        } else if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return (
        <div>
            {this.renderAuthButton()}
        </div>
        )
     }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
    mapStateToProps, {signIn, signOut}
)(GoogleAuth);