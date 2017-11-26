import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className={'row footer'}>
                <p><b>footer</b> (fixed height)</p>
                <div className='user-profile'>
                    {this.props.loggedIn ?
                        <img src={this.props.photoURL} alt={''}/>
                        :
                        <p>&nbsp;</p>
                    }
                </div>
            </footer>
        );
    }
}

export default Footer;