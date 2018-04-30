// @flow

import {Form as FormType} from '@tna/common/definitions/form.d';
import type {State} from '../../../definitions/state.d';

import React from 'react';
import {connect} from 'react-redux';
import {compose, withHandlers, lifecycle} from 'recompose';

import Button from '@tna/common/components/controls/Button';
import Link from '@tna/common/components/controls/Link';
import Form from '@tna/common/components/forms/Form';
import Field from '@tna/common/components/forms/Field';
import Input from '@tna/common/components/forms/Input';

import styles from './reset-password-form.scss';

type Props = {
  dispatch: Function,
  form: FormType<{username?: string, email: string}>,
  submit: Function,
};

const LoginForm = (props: Props) => {
  const {form: {values, loading, valid}, submit} = props;

  return (
    <section className={styles.loginForm}>
      <h1 className={styles.title}>Forgot your password?</h1>
      <h2 className={styles.intro}>
        Fill in the form below to reset your password
      </h2>

      <Form onSubmit={submit} loading={loading}>
        <Field
          form="resetPassword"
          name="email"
          component={Input}
          value={values.email}
          placeholder="Email"
        />
        <Field
          form="resetPassword"
          name="username"
          component={Input}
          value={values.username}
          placeholder="Username (optional)"
        />
      </Form>

      <div className={styles.actions}>
        <div>
          <Button
            onClick={submit}
            shape="round"
            loading={loading}
            loadingText="Requesting password"
            disabled={!valid}
          >
            Reset password
          </Button>
        </div>
        <div>
          <Link screen={{id: 'Login'}}>Back to login</Link>
        </div>
      </div>
    </section>
  );
};

function mapStateToProps(state: State): Object {
  return {form: state.forms.resetPassword};
}

export default compose(
  connect(mapStateToProps),
  lifecycle({
    componentDidMount() {
      this.props.dispatch({
        type: 'form/INITIALIZE',
        payload: {form: 'resetPassword'},
      });
    },
  }),
  withHandlers({
    submit: (props: Props) => () =>
      props.dispatch({
        type: 'form/SUBMIT_FORM',
        payload: {form: 'resetPassword'},
      }),
  })
)(LoginForm);
