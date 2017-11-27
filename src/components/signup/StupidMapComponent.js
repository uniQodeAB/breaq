import React, { Component } from 'react';

class StupidMapComponent extends Component {
    render() {
        return (
            <div>
                <ol>
                    {this.props.places.map(({ place_id, formatted_address, geometry: { location } }) =>
                        <li key={place_id}>
                            {formatted_address}
                            {" at "}
                            ({location.lat()}, {location.lng()})
                        </li>
                    )}
                </ol>
            </div>
        );
    }
}

export default StupidMapComponent;
