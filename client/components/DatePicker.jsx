import React from 'react';
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};

export default class DatePickerExampleToggle extends React.Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
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
      <MuiThemeProvider>
      <div>
        <div style={optionsStyle}>
          <DatePicker
            onChange={this.handleChangeMinDate}
            floatingLabelText="Start Date"
            defaultDate={this.state.minDate}
          />
          <DatePicker
            onChange={this.handleChangeMaxDate}
            floatingLabelText="End Date"
            defaultDate={this.state.maxDate}
          />
        </div>
      </div>
    </MuiThemeProvider>
    );
  }
}
