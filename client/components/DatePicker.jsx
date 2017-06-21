import React from 'react';
import { connect } from 'react-redux'
import DatePicker from 'material-ui/DatePicker'

import{getMuiTheme, MuiThemeProvider} from 'material-ui/styles/'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import {orange500} from 'material-ui/styles/colors'

import {saveMinDate, saveMaxDate} from '../actions/users'

const styles = {
    floatingLabelStyle: {color: orange500}
}

class DatePickerExampleToggle extends React.Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      autoOk: false,
      disableYearSelection: false,
    };
  }

  //For when it is rendered by giglist page
  componentWillMount(){
    if(this.props.minDate){
      this.setState({
        minDate: this.props.minDate
      })
    }
    if(this.props.maxDate){
      this.setState({
        maxDate: this.props.maxDate
      })
    }
  }

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
    this.props.dispatch(saveMinDate(date))
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
    this.props.dispatch(saveMaxDate(date))
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme((darkBaseTheme))}>
      <div>
        <div className="datepicker">
          <DatePicker
            onChange={this.handleChangeMinDate}
            floatingLabelText="Find Concerts From"
            floatingLabelStyle={styles.floatingLabelStyle}
            textFieldStyle={{width:'10em'}}
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            floatingLabelText="Until"
            floatingLabelStyle={styles.floatingLabelStyle}
            textFieldStyle={{width:'10em'}}
          />
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

const mapState2Props = (state)=>{
  return {
    minDate:state.users.minDate,
    maxDate:state.users.maxDate
  }
}

export default connect(mapState2Props)(DatePickerExampleToggle)
