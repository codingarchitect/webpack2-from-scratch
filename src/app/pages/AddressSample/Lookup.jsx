import React from 'react';
import Rx from 'rxjs';
import PropTypes from 'prop-types';

import { DebounceTimeForFormFieldChange } from 'shared/constants';

class Lookup extends React.Component {
  constructor(props) {
    super(props);
    const { options } = props;
    const { normalizer } = options;
    this.state = {
      lookupValue: props.value,
      id: props.id,
      onChange: props.onChange,
      onBlur: props.onBlur,
      debouncedValue: props.value,
      normalizer,
    };
    this.onLookupValueChange$ = new Rx.Subject();
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const lookupThis = this;
    const normalizer = this.state.normalizer ? this.state.normalizer : x => x;
    this.subscription = this.onLookupValueChange$
      .debounceTime(DebounceTimeForFormFieldChange)
      .map(normalizer)
      .subscribe((debouncedValue) => {
        this.setState({ debouncedValue });
        if (lookupThis.state.onChange) lookupThis.state.onChange(debouncedValue);
      });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleChange(e) {
    const lookupValue = e.target.value;
    this.setState({ lookupValue });
    this.onLookupValueChange$.next(lookupValue);
  }

  render() {
    const { lookupValue, id, onBlur } = this.state;
    return (<div className="input-group add-on">
      <input className="form-control" type="text" onChange={this.handleChange} value={lookupValue} id={id} onBlur={onBlur(id, lookupValue)} />
      <div className="input-group-btn">
        <button className="btn btn-default"><i className="glyphicon glyphicon-search" /></button>
      </div>
    </div>);
  }
}

Lookup.propTypes = {
  value: PropTypes.string,
  options: PropTypes.object, // eslint-disable-line
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

Lookup.defaultProps = {
  value: '',
  options: {},
};

export default Lookup;
