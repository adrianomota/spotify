import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as ErrorsActions } from '../../store/ducks/error';
import { Container } from './styles';
import CloseIcon from '../../assets/images/close.svg';

const ErrorBox = ({ error: { type, message, visible }, hideError }) => visible && (
<Container type={type}>
  <p>{message}</p>
  <button type="button" onClick={hideError}>
    <img src={CloseIcon} alt="Fechar" />
  </button>
</Container>
);

ErrorBox.propTypes = {
  error: PropTypes.shape({
    visible: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  hideError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => bindActionCreators(ErrorsActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorBox);
