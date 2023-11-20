import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  ErrorMessageStyled,
  FieldGroup,
  FieldStyled,
  FormStyled,
} from './ContactFormStyled';

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .matches(
      /^[A-Z][a-z]{1,} [A-Z][a-z]{1,}$/,
      'Insert Name and Surname please'
    )
    .required('Required'),
  number: Yup.number()
    .test('is-twelve-digits', '12 digits needed', value =>
      value ? value.toString().length === 12 && !isNaN(value) : false
    )
    .required('Required'),
});

export const ContactForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={contactSchema}
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      <FormStyled>
        <FieldGroup>
          Name
          <FieldStyled name="name" type="string" placeholder="John Smith" />
          <ErrorMessageStyled name="name" component="span" />
        </FieldGroup>

        <FieldGroup>
          Phone Number
          <FieldStyled name="number" type="number" placeholder="130123456789" />
          <ErrorMessageStyled name="number" component="span" />
        </FieldGroup>

        <Button type="submit">Add Contact</Button>
      </FormStyled>
    </Formik>
  );
};
