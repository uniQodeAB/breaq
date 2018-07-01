import * as React from 'react';
import { IClient } from '../types';

export interface IProps {
  client: IClient;
  submitClient: (client:IClient) => Promise<void>;
}

export interface IState {
  readonly client: IClient;
}

class AddClient extends React.Component<IProps, IState> {
  constructor(props:IProps) {
    super(props);

    this.state = {
      client: {
        name: ''
      }
    }
  }

  public render() {
    const { client } = this.state;

    return (
      <div>
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
      client: {
        ...this.state.client,
        name: e.target.value
      }
    })
  }

  private onSubmit = async () => {
    const { submitClient } = this.props;
    const { client } = this.state;

    await submitClient(client);

    // Reset state
    this.setState({
      client: {
        name: ''
      }
    })
  }
}

export default AddClient;

