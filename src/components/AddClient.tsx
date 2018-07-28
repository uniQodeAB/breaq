import * as React from 'react';
import Autocomplete from '../containers/ClientAutocomplete';
import { firestore } from '../firebase';
import { IClient, ILocation } from '../types';
import { ISuggestion } from './Autocomplete';
import LocationSearchBox from './LocationSearchBox';
export interface IProps {
  createClient: (client:IClient) => Promise<void>;
  updateClient: (client:IClient) => Promise<void>
}
interface IState {
  readonly client: IClient;
  readonly message: string;
  readonly addLocation: boolean;
  readonly location: ILocation;
  readonly update: boolean;
}
class AddClient extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);

    this.state = {
      addLocation: false,
      client: {
        id: '',
        locations: [],
        name: ''
      },
      location: {
        address: '',
        id: '',
        lat: NaN,
        lng: NaN
      },
      message: '',
      update: false
    }
  }

  public render() {
    const { client, message, addLocation, location: { address}, update } = this.state;

    return (
      <div>
        {message && (
          <span>{message}</span>
        )}

        <Autocomplete
          placeholder={'Client name'}
          value={client.name}
          onChange={this.onAutocompleteChange}
          onSelect={this.onClientSelect}
        />

        <button id="add-location" onClick={this.toggleAddLocation}>
          Add location
        </button>

        {addLocation && (
          <div>
            <LocationSearchBox
              onChange={this.onLocationChange}
              placeholder={"Add location"}
            />
            <button onClick={this.onSaveLocation} disabled={!address}>Save location</button>
          </div>
        )}

        <ol>
          {client.locations && client.locations.map((location:ILocation) => (
              <li key={location.id}>
                {location.address}
                {// tslint:disable-next-line:jsx-no-lambda
                  <button onClick={() => this.onRemoveLocation(location, client)}>
                    Remove
                  </button>
                }
              </li>
          ))}
        </ol>

        <div>
          <button onClick={this.resetState}>Cancel</button>
          {update
            ? <button onClick={this.onUpdate}>Update</button>
            : <button onClick={this.onCreate}>Save</button>}
        </div>
      </div>
    )
  }

  /**
   * Callback function for change of input of Autocomplete
   */
  private onAutocompleteChange = (newValue:string) => {
    this.setState({
      ...this.state,
      client: {
        ...this.state.client,
        name: newValue
      }
    })
  }

  /**
   * Callback when a suggestion is selected in Autocomplete
   */
  private onClientSelect = async (event:React.FormEvent<any>, { suggestion } : { suggestion:ISuggestion }) => {
    const data = await this.fetchClient(suggestion.id);

    if (data) {
      const client:IClient = data.client;

      this.setState({
        ...this.state,
        client: {
          ...client,
          locations: client.locations || []
        },
        update: true
      })
    }
  }

  /**
   * Toggles visibility of add location to client
   */
  private toggleAddLocation = () => {
    this.setState({
      ...this.state,
      addLocation: !this.state.addLocation
    });
  }

  /**
   * Callback when location is changed in LocationSearchBox
   */
  private onLocationChange = (location:ILocation) => {
    this.setState({
      ...this.state,
      location
    })
  }

  /**
   * Saves a location on the client in the state and resets the location state
   */
  private onSaveLocation = () => {
    this.setState({
      ...this.state,
      addLocation: false,
      client: {
        ...this.state.client,
        locations: [ ...this.state.client.locations, this.state.location ]
      },
      location: {
        address: '',
        id: '',
        lat: NaN,
        lng: NaN
      }
    });
  }

  /**
   * Create a client in Firestore
   */
  private onCreate = async () => {
    const { createClient } = this.props;
    const { client } = this.state;

    try {
      await createClient(client);
    } catch(e) {
      this.setState({
        ...this.state,
        message: e.message
      });

      return;
    }

    this.resetState();
  }

  /**
   * Update a client in Firestore
   */
  private onUpdate = async () => {
    const { updateClient } = this.props;
    const { client } = this.state;

    try {
      await updateClient(client);
    } catch(e) {
      this.setState({
        ...this.state,
        message: e.message
      });

      return;
    }

    this.resetState();
  }

  /**
   * Fetch a client from the Firestore. Returns undefined if no client is found
   */
  private fetchClient = async (id:string) => {
    const clientDoc = await firestore.doc(`clients/${id}`).get();

    return clientDoc.exists ? clientDoc.data() : undefined;
  }

  /**
   * Remove a location from the client state
   */
  private onRemoveLocation = (location: ILocation, client:IClient) => {
    this.setState({
      ...this.state,
      client: {
        ...this.state.client,
        locations: client.locations.filter((loc) => {
          return loc.id !== location.id;
        })
      }
    })
  }

  /**
   * Reset state to its initial state
   */
  private resetState = () => {
    this.setState({
      addLocation: false,
      client: {
        id: '',
        locations: [],
        name: ''
      },
      message: '',
      update: false
    });
  }
}




export default AddClient;



