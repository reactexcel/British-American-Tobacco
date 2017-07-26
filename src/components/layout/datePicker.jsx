import React from 'react';
import DatePicker from 'material-ui/DatePicker';

export default class DatePick extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <DatePick
          autoOk
          hintText="Start Date"
          label="Start Date"
          textFieldStyle={{
            boxSizing: 'border-Box',
            height: '43px',
            width: '101%',
            border: '0.5px solid #C8C7CC',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF',
          }}
        />
      </div>

    );
  }
}
