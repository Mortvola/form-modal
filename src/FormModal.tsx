import React, { ReactElement, ReactNode } from 'react';
import {
  Formik, Form, FormikContextType, FormikHelpers, FormikErrors, FormikValues,
} from 'formik';
import { ModalBody, ModalDialog } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';

type PropsType<T> = {
  initialValues: T,
  title: string,
  formId?: string,
  children?: ReactNode,
  setShow: (show: boolean) => void,
  onSubmit: ((values: T, bag: FormikHelpers<T>) => Promise<void>),
  validate: ((values: T) => FormikErrors<T>),
  onDelete?: ((bag: FormikContextType<T>) => void) | null,
  errors?: string[],
}

function FormModal<ValueType extends FormikValues>({
  setShow,
  initialValues,
  title,
  formId,
  children,
  onSubmit,
  validate,
  onDelete,
  errors,
}: PropsType<ValueType>): ReactElement {
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  async function handleSubmit<T extends ValueType>(values: T, bag: FormikHelpers<ValueType>) {
    setIsSubmitting(true);
    await onSubmit(values, bag)
    setIsSubmitting(false);
  }

  return (
    <Formik<ValueType>
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      <Form id={formId} className="scrollable-form">
        <Header title={title} />
        <ModalBody>
          {children}
        </ModalBody>
        <Footer<ValueType>
          setShow={setShow}
          onDelete={onDelete}
          errors={errors}
          isSubitting={isSubmitting}
        />
      </Form>
    </Formik>
  );
}

export default FormModal;
