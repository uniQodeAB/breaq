import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InfoBox, { icons } from './InfoBox';
import { EditorSearchBox, EditorButtons, EditorInput } from './Editor';
import ColorPicker from './ColorPicker';

import '../styles/Editor.css';

class CompanyEditor extends Component {
  constructor(props) {
    super(props);

    const { company } = props;

    if (company && company.id) {
      this.state = {
        company: {
          ...company
        }
      };
    } else {
      this.state = {
        company: {
          name: ''
        }
      };
    }
  }

  render() {
    const {
      placeholders,
      endAddCompany,
      endEditCompany,
      company: { id },
      addCompany,
      updateCompany
    } = this.props;
    const { company } = this.state;

    return (
      <div className={'Editor'}>
        <EditorInput
          placeholder={placeholders.name}
          value={company.name}
          onChange={name =>
            this.setState({
              company: {
                ...company,
                name
              }
            })
          }
        />

        <EditorSearchBox
          placeholder="Company address"
          addressCallback={address =>
            this.setState({
              company: {
                ...company,
                address: address.address,
                location: address.location
              }
            })
          }
        />

        <ColorPicker
          color={company.color}
          onColorChange={color =>
            this.setState({
              company: {
                ...company,
                color
              }
            })
          }
        />

        <InfoBox
          title={company.name}
          icon={icons.company}
          address={company.address}
          color={company.color}
        />

        <EditorButtons
          isUpdate={!!id}
          onCancelUpdate={() => endEditCompany(id)}
          onUpdate={() => updateCompany(company)}
          onCancelAdd={endAddCompany}
          onAdd={() => addCompany(company)}
        />
      </div>
    );
  }
}

CompanyEditor.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    project: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      postalAddress: PropTypes.string,
      prefecture: PropTypes.string,
      country: PropTypes.string
    }),
    color: PropTypes.string
  }),
  placeholders: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string
  }),
  endAddCompany: PropTypes.func.isRequired,
  endEditCompany: PropTypes.func.isRequired,
  addCompany: PropTypes.func.isRequired,
  updateCompany: PropTypes.func.isRequired
};

CompanyEditor.defaultProps = {
  company: {},
  placeholders: {
    name: 'Name',
    address: 'Address'
  }
};

export default CompanyEditor;
