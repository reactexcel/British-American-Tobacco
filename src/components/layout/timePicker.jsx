import React from 'react';
import TimePicker from 'material-ui/TimePicker';

export default class TimePick extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <TimePicker
          textFieldStyle={{
            boxSizing: 'border-Box',
            height: '43px',
            width: '40%',
            border: '0.5px solid #C8C7CC',
            borderRadius: '5px',
            backgroundColor: '#FFFFFF',
          }}
        />
      </div>
    );
  }
}
