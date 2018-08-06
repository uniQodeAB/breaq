import * as React from 'react';
import * as Autosuggest from 'react-autosuggest';

export interface IProps {
  suggestions:ISuggestion[], // Used for autocompletion
  placeholder:string,
  loading:boolean,
  value:string,
  onChange:(newValue:string) => void;
  onSelect?:(event:React.FormEvent<any>, { suggestion } : { suggestion:ISuggestion }) => void;
}

export interface ISuggestion {
  name:string;
  id:string;
}

interface IState {
  readonly suggestions:ISuggestion[],
}

const getSuggestionValue = (suggestion:ISuggestion) => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = (suggestion:ISuggestion) => (
  <div>
    {suggestion.name}
  </div>
);

class Autocomplete extends React.Component<IProps, IState> {
  constructor(props:any) {
    super(props);

    this.state = {
      suggestions: []
    };
  }

  public render() {
    const { suggestions } = this.state;
    const { loading, placeholder, onSelect, value } = this.props;

    const inputProps:any = {
      disabled: loading,
      onChange: this.onChange,
      placeholder,
      value: loading ? 'Loading...' : value,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={onSelect}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }

  private getSuggestions = (value:string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const { suggestions } = this.props;

    return inputLength === 0 ? [] : suggestions.filter(suggest =>
      suggest.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  private onChange = (_:any, { newValue } : { newValue:string}) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(newValue);
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  private onSuggestionsFetchRequested = ({ value } : { value:string }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  private onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
}

export default Autocomplete;
