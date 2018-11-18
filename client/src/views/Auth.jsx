import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Input from '../components/Input';
import Loading from '../components/Loading';
import authActions from '../actions/authActions';
import numberActions from '../actions/numberActions';

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
        authToken: '',
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
    const { hideSideNav, getAvailableNums } = this.props;
    hideSideNav();
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
        formData: { authToken: '', number: nextProps.availableNums[0] }
      });
    }
  }

  /**
   * @returns {undefined}
   */
  componentWillUnmount() {
    const {
      unhideSideNav
    } = this.props;
    unhideSideNav();
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
    const { formData: { authToken, number } } = this.state;
    const { isLoading, availableNums } = this.props;
    return (
      <div id="login-form">
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
            placeholder="Auth token"
            className="input"
            name="authToken"
            value={authToken}
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
  hideSideNav: PropTypes.func.isRequired,
  unhideSideNav: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  availableNums: PropTypes.arrayOf(PropTypes.string)
};

Auth.defaultProps = {
  availableNums: [],
};

export const mapStateToProps = ({
  number: { availableNums },
  auth: { isLoading },
}) => ({
  availableNums,
  isLoading,
});

export default connect(mapStateToProps, {
  hideSideNav: authActions.hideSideNav,
  unhideSideNav: authActions.unhideSideNav,
  login: authActions.login,
  getAvailableNums: numberActions.getAvailableNums,
})(Auth);
