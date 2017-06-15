import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm, formValueSelector} from 'redux-form'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {AutoComplete as MUIAutoComplete} from 'material-ui'
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  SelectField,
  Slider,
  TextField,
  Toggle,
} from 'redux-form-material-ui';

import {fetchLocations} from '../actions/locations'
import SearchResults from './SearchResults'

const renderTextField = props => (
  <TextField hintText={props.label}
    {...props}
  />
)

class SearchBar extends React.Component{
  componentDidMount() {
  this.refs.name // the Field
    .getRenderedComponent() // on Field, returns ReduxFormMaterialUITextField
    .getRenderedComponent() // on ReduxFormMaterialUITextField, returns TextField
    .focus(); // on TextField
  }
  render(){
    const {handleSubmit, reset, submitting} = this.props;
    return (
    <MuiThemeProvider>
      <form className='search-bar' onSubmit={handleSubmit}>
        <div>
          <Field
          name='location'
          component={AutoComplete}
          floatingLabelText="Search for a city.."
          openOnFocus
          filter={MUIAutoComplete.fuzzyFilter}
          dataSourceConfig={{text: 'name', value: 'id'}}
          dataSource={[
              {id: 0, name: 'Facebook'},
              {id: 1, name: 'Yelp'},
              {id: 2, name: 'TV Ad'},
              {id: 3, name: 'Friend'},
              {id: 4, name: 'Other'},
          ]}
          />
        </div>
        <div>
          <button type='submit' disabled={submitting}>Go</button>
          <button type='button' disabled={submitting} onClick={reset}>Clear</button>
        </div>
      </form>
    </MuiThemeProvider>
    )
  }
}

SearchBar = reduxForm({
  form: 'searchBar'  // a unique identifier for this form
})(SearchBar)

export default connect()(SearchBar)
