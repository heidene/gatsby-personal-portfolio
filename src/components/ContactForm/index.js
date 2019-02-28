import React, { Component } from 'react';
import { Trans, i18nMark, I18n } from '@lingui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Form, Field } from 'formik';
import { withGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Button from '../Button';
import './index.scss';

class ContactForm extends Component {
  state = {
    mailsendSuccess: null,
  };
  constructor(props) {
    super(props);
  }

  _inputField = ({
    field: { name, ...field },
    form: { touched, errors },
    ...props
  }) => (
    <div className="contact_form__input-group">
      <input
        name={name}
        id={'frm' + name}
        {...field}
        {...props}
        className={`${touched[name] ? 'touched' : ''}`}
      />
      <span
        className={`contact_form__input-group-bar ${
          touched[name] && errors[name] ? 'error' : ''
        }`}
      />
      <label htmlFor={'frm' + name}>{props.label}</label>
    </div>
  );

  _textAreaField = ({
    field: { name, ...field },
    form: { touched, errors },
    ...props
  }) => (
    <div className="contact_form__input-group">
      <textarea
        name={name}
        id={'frm' + name}
        {...field}
        {...props}
        className={`${touched[name] ? 'touched' : ''}`}
      />
      <span
        className={`contact_form__input-group-bar textarea ${
          touched[name] && errors[name] ? 'error' : ''
        }`}
      />
      <label htmlFor={'frm' + name}>{props.label}</label>
    </div>
  );

  _validate = (values) => {
    const { realname, email, subject, message } = values;
    const errors = {};
    if (!realname) {
      errors.realname = i18nMark('contactform.error.name');
    }
    if (!email) {
      errors.email = i18nMark('contactform.error.email');
    }
    if (!subject) {
      errors.subject = i18nMark('contactform.error.subject');
    }
    if (!message) {
      errors.message = i18nMark('contactform.error.message');
    }
    return errors;
  };

  async _requestReCaptchaToken() {
    return await this.props.googleReCaptchaProps.executeRecaptcha(
        'contactForm'
    );
  }

  _handleSubmit = (values, actions) => {
    this.setState({ mailsendSuccess: null });
    const formData = new FormData();
    formData.append('submit', 'submit');
    for (const value in values) {
      if (values.hasOwnProperty(value)) {
        if (value === 'humans' && values[values] !== undefined) {
          alert('Bot detected!!');
          return null;
        }
        formData.append(value, values[value]);
      }
    }

    return this._requestReCaptchaToken().then((token) => {
      formData.append('g-recaptcha-response', token);
      return fetch('https://nico.vandenhove.me/backend/mail.php', {
        method: 'POST',
        body: formData,
      })
          .then((response) => {
            if (response.status !== 201) {
              console.log(
                  'Looks like there was a problem. Status Code: ' + response.status
              );
              actions.setSubmitting(false);
              this.setState({ mailsendSuccess: false });
              return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
            });
            actions.resetForm();
            this.setState({ mailsendSuccess: true });
          })
          .catch((error) => {
            console.log(error.body);
            actions.setSubmitting(false);
            this.setState({ mailsendSuccess: false });
          });
    });
  };

  render() {
    return (
      <div className="contact_form__div">
        {this.state.mailsendSuccess && (
          <div className="contact_form__div-feedback contact_form__div-success">
            <FontAwesomeIcon icon="check" size="lg" />
            <span>
              <Trans id="contactform.feedback.success" />
            </span>
          </div>
        )}
        {!this.state.mailsendSuccess && this.state.mailsendSuccess !== null && (
          <div className="contact_form__div-feedback contact_form__div-error">
            <FontAwesomeIcon icon="exclamation-triangle" size="lg" />
            <span>
              <Trans id="contactform.feedback.error" />
            </span>
          </div>
        )}
        <I18n>
          {({ i18n }) => (
            <Formik
              initialValues={{
                realname: '',
                email: '',
                subject: '',
                message: '',
              }}
              onSubmit={this._handleSubmit}
              validate={this._validate}
              render={(props) => (
                <Form className="contact_form ">
                  <div>
                    <Field
                      name="realname"
                      component={this._inputField}
                      type="text"
                      label={i18n._('contactform.lbl.name')}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <Field
                      name="email"
                      component={this._inputField}
                      type="email"
                      autoComplete="email"
                      label={i18n._('contactform.lbl.email')}
                      required
                    />
                  </div>
                  <div>
                    <Field
                      name="subject"
                      component={this._inputField}
                      type="text"
                      label={i18n._('contactform.lbl.subject')}
                      autoComplete="subject"
                      required
                    />
                  </div>
                  <div className="contact_form__message">
                    <Field
                      name="message"
                      component={this._textAreaField}
                      label={i18n._('contactform.lbl.message')}
                      autoComplete="message"
                      required
                    />
                  </div>
                  <span style={{ fontSize: 12 }}>
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a href="https://policies.google.com/privacy">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="https://policies.google.com/terms">
                      Terms of Service
                    </a>{' '}
                    apply.
                  </span>
                  <input
                    className="contact_form__humans"
                    name="humans"
                    type="text"
                    autoComplete="none"
                    tabIndex="-1"
                  />
                  <div className="contact_form__button">
                    <Button
                      contained
                      disabled={!props.dirty || props.isSubmitting}
                      submit
                    >
                      {props.isSubmitting ? (
                        <FontAwesomeIcon
                          icon="spinner"
                          spin
                          className="btn-icon"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon="paper-plane"
                          className="btn-icon"
                        />
                      )}

                      <Trans id="contactform.submit" />
                    </Button>
                  </div>
                </Form>
              )}
            />
          )}
        </I18n>
      </div>
    );
  }
}

export default withGoogleReCaptcha(ContactForm);
