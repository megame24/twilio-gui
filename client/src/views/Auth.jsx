import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Input from '../components/Input';
import Loading from '../components/Loading';
import authActions from '../actions/authActions';
import numberActions from '../actions/numberActions';
import ErrorMessage from '../components/ErrorMessage';

/**
 * Auth component
 */
export class Auth extends React.Component {
  /**
   * @returns {undefined}
   */
  constructor() {
    super();
    this.state = {
      formData: {
        password: '',
        number: '',
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  /**
   * component did mount
   * @returns {null} null
   */
  componentDidMount() {
    const { getAvailableNums } = this.props;
    getAvailableNums();
  }

  /**
   * @param {nextProps} nextProps
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    const { availableNums } = this.props;
    if (nextProps.availableNums !== availableNums) {
      this.setState({
        formData: { password: '', number: nextProps.availableNums[0] }
      });
    }
  }

  /**
   * handle change on form fields
   * @param {Object} event event object
   * @returns {undefined}
   */
  handleChange(event) {
    event.persist();
    this.setState(state => (
      {
        ...state,
        formData: {
          ...state.formData, [event.target.name]: event.target.value
        },
      }
    ));
  }

  /**
   * handle form submit
   * @param {Object} event event object
   * @returns {undefined}
   */
  handleSubmit(event) {
    event.preventDefault();
    const { login } = this.props;
    const { formData } = this.state;
    login(formData);
  }

  /**
   * @return {undefined}
   */
  render() {
    const { formData: { password, number } } = this.state;
    const { isLoading, availableNums, errors } = this.props;
    errors.time = new Date();
    return (
      <div id="login-form">
        <div className="errors">
          <ErrorMessage
            errors={errors}
          />
        </div>
        <Loading isLoading={isLoading} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="number">Select a number</label>
          {
            availableNums.map(num => (
              <span key={num}>
                <input
                  type="radio"
                  name="number"
                  onChange={this.handleChange}
                  value={num}
                  checked={number === num}
                />
                &nbsp;
                {num}
              </span>
            ))
          }
          <Input
            type="password"
            placeholder="Password"
            className="input"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input
            className="input btn btn-primary"
            type="submit"
            id="submit-btn"
            value="Login"
          />
        </form>
      </div>
    );
  }
}

Auth.propTypes = {
  login: PropTypes.func.isRequired,
  getAvailableNums: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string
  }),
  availableNums: PropTypes.arrayOf(PropTypes.string)
};

Auth.defaultProps = {
  availableNums: [],
  errors: {},
};

export const mapStateToProps = ({
  number: { availableNums },
  auth: { isLoading, errors },
}) => ({
  availableNums,
  isLoading,
  errors,
});

export default connect(mapStateToProps, {
  login: authActions.login,
  getAvailableNums: numberActions.getAvailableNums,
})(Auth);
