import * as React from 'react';
import { IClient } from '../types';

export interface IProps {
  client: IClient;
  submitClient: (client:IClient) => Promise<void>;
}
interface IState {
  readonly client: IClient;
  readonly showMessage: boolean;
}
class AddClient extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);

    this.state = {
      client: {
        name: ''
      },
      showMessage: false,
    }
  }

  public render() {
    const { client, showMessage } = this.state;

    return (
      <div>
          {showMessage && (
            <span>You need add a client before submitting</span>
          )}
          <input
            type={'text'}
            className={'form-input'}
            placeholder={'Add a client name'}
            value={client.name}
            onChange={this.onChange} />

          <div>
            <button onClick={this.onSubmit}>Add</button>
          </div>
        </div>
    )
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      client: {
        ...this.state.client,
        name: e.target.value
      }
    })
  }

  private clientIsValid = (client:IClient):boolean => !!client.name;

  private onSubmit = async () => {
    const { submitClient } = this.props;
    const { client } = this.state;

    // Check if input is empty
    if (this.clientIsValid(client)) {
      this.setState({
        ...this.state,
        showMessage: false
      });

      await submitClient(client);

      // Reset state
      this.setState({
        client: {
          name: ''
        }
      });
    } else {
      this.setState({
        ...this.state,
        showMessage: true
      });
    }
  }
}

export default AddClient;

