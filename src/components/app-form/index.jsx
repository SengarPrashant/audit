import React, { useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Input, Checkbox, Button, Form as RSForm, HStack, SelectPicker, Row, Col } from 'rsuite';
import NoData from '../no-data';

const AppForm = ({ formData = [], actions = [], emptyText }) => {
    const formikRef = useRef(null);
    const [action, setAction] = useState('');
  

    const handleSubmit = (values, e) => {
        // make api call here
        console.log('Form data', values, action);
    };

    const validationSchema = Yup.object().shape(
        formData.reduce((schema, field) => {
            let validator = Yup.string(); // Default to string
            if (field.validations) {
                field.validations.forEach(rule => {
                    if (rule.type === 'required') {
                        validator = validator.required(rule.message);
                    }
                    if (rule.type === 'email') {
                        validator = validator.email(rule.message);
                    }
                    if (rule.type === 'number') {
                        validator = Yup.number().required(rule.message);
                    }
                });
            }

            return { ...schema, [field.name]: validator };
        }, {})
    );

    return (
        <>
            <RSForm>
                <HStack justifyContent='flex-end' className='py-2'>
                    {actions.map((item, i) => <Button key={item.action} disabled={item.disabled} appearance="primary" onClick={() => {
                        setAction(item.action);
                        formikRef.current?.submitForm();
                    }}>{item.label}</Button>)}
                </HStack>
            </RSForm>
            {formData.length==0 && <NoData size={"12%"} text={emptyText} />}
            <Formik
                innerRef={formikRef}
                initialValues={formData.reduce((acc, field) => {
                    acc[field.name] = field.defaultValue || '';
                    return acc;
                }, {})}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, handleSubmit }) => (
                    <Form>
                        <RSForm>
                            <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {formData.map((field, index) => (
                                    <Col xs={24} sm={24} md={12} lg={12} key={index}>
                                        <RSForm.Group key={index} controlId={field.name} style={{ marginBottom: 8 }}>
                                            <RSForm.ControlLabel>{field.label}</RSForm.ControlLabel>
                                            <Field name={field.name}>
                                                {({ field: formikField }) => {
                                                    switch (field.controleType) {
                                                        case 'text':
                                                            return <Input
                                                                {...formikField}
                                                                type={field.controleType}
                                                                onChange={(value) => setFieldValue(field.name, value)}
                                                                placeholder={field.placeHolder}
                                                            />;
                                                        case 'email':
                                                            return ("NA")
                                                        case 'select':
                                                            return (<SelectPicker block
                                                                data={field.selectList}
                                                                onChange={(value) => {
                                                                    // console.log(value);
                                                                    setFieldValue(field.name, value)
                                                                }} />)
                                                        case 'number':
                                                            return (
                                                                <Input
                                                                    {...formikField}
                                                                    type={field.controleType}
                                                                    onChange={(value) => setFieldValue(field.name, value)}
                                                                    placeholder={field.placeHolder}
                                                                />
                                                            );
                                                        case 'checkbox':
                                                            return (
                                                                <Checkbox
                                                                    {...formikField}
                                                                    checked={values[field.name]}
                                                                    onChange={(value, checked) =>
                                                                        setFieldValue(field.name, checked)
                                                                    }
                                                                >
                                                                    {field.label}
                                                                </Checkbox>
                                                            );
                                                        default:
                                                            return null;
                                                    }
                                                }}
                                            </Field>
                                            {field.helpText && <RSForm.HelpText>{field.helpText}</RSForm.HelpText>}
                                            <div style={{ minHeight: 20 }}>
                                                <ErrorMessage name={field.name} component="div"
                                                    style={{ color: 'red' }} />
                                            </div>
                                        </RSForm.Group>
                                    </Col>
                                ))}
                            </Row>
                        </RSForm>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default AppForm;
