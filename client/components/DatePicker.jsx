import React from 'react';
import { connect } from 'react-redux'
import {orange400, orange300, orange800, grey50, grey100, grey300 ,grey400, grey700, grey900, blueGrey900} from 'material-ui/styles/colors'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

const styles = {
    floatingLabelStyle: {
        color: orange400
    }
}

const muiTheme = getMuiTheme({
 fontFamily: 'Roboto, sans-serif',
 palette: {
   primary1Color: orange800,
   primary2Color: orange400,
   primary3Color: grey400,
   accent1Color: grey400,
   accent2Color: grey400,
   accent3Color: grey700,
   hintColor: orange400,
   textColor: grey50,
   alternateTextColor: grey700,
   canvasColor: grey900,
   borderColor: grey300,
   pickerHeaderColor: orange300,
   shadowColor: grey900,
 },
});

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

  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        <div style={optionsStyle} className="datepicker">
          <DatePicker
            onChange={this.handleChangeMinDate}
            floatingLabelText="Find Concerts From"
            defaultDate={this.state.minDate}
            floatingLabelStyle={styles.floatingLabelStyle}
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            floatingLabelText="Until"
            defaultDate={this.state.maxDate}
            floatingLabelStyle={styles.floatingLabelStyle}
          />
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}

const mapState2Props = (state)=>{
  return {
    minDate:state.minDate,
    maxDate:state.maxDate
  }
}

export default connect(mapState2Props)(DatePickerExampleToggle)
