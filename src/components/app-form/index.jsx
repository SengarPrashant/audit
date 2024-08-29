import React, { useEffect, useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Panel, Button, Form as RSForm, HStack, Row, Col, Divider, Text } from 'rsuite';
import NoData from '../no-data';
import { IconMap } from '../../assets/icons/iconMap';
import FieldRender from './fieldRender';

const AppForm = ({ formDefinition = [], actions = [], emptyText, defaultData }) => {
    const _defaultData = JSON.parse(JSON.stringify(defaultData));

    const formikRef = useRef(null);
    const [action, setAction] = useState('');
    const [preView, setPreView] = useState();

    const handleSubmit = (values, e) => {
        // make api call here
        console.log('Form data', values, action);
        setPreView({
            ...values, langData: [
                { lang: 'en', label: 'Name', value: values.name },
                { lang: 'sp', label: 'Name', value: 'spanish translation' },
                { lang: 'en', label: 'Description', value: values.description },
                { lang: 'sp', label: 'Description', value: 'spanish description translation' },
            ]
        })
    };

    const validationSchema = Yup.object().shape(
        formDefinition.reduce((schema, field) => {
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
                <HStack justifyContent='flex-start'>
                    {actions.map((item, i) => <Button appearance='link' color='blue' disabled={item.disabled} onClick={() => {
                        setAction(item.action);
                        if (item.submit) {
                            formikRef.current?.submitForm();
                        } else {
                            // make api call for delete/deactivate
                        }
                    }}>
                        <HStack><IconMap name={item.icon} /> {item.label} </HStack>
                    </Button>)}
                </HStack>
                <Divider style={{ margin: 0 }} />
            </RSForm>
            <Panel>

                {(formDefinition.length == 0 && !preview) && <NoData size={"12%"} text={emptyText} />}
                {!preView && <Formik enableReinitialize
                    innerRef={formikRef}
                    initialValues={formDefinition.reduce((acc, field) => {
                        acc[field.name] = _defaultData[field.name] || field.defaultValue || '';
                        return acc;
                    }, {})}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, handleSubmit }) => (
                        <Form>
                            <RSForm>
                                <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {formDefinition.map((field, index) => (
                                        <Col xs={24} sm={24} md={12} lg={12} key={index}>
                                            <RSForm.Group key={index} controlId={field.name} style={{ marginBottom: 8 }}>
                                                <FieldRender field={field} setFieldValue={setFieldValue} />
                                            </RSForm.Group>
                                        </Col>
                                    ))}
                                </Row>
                            </RSForm>
                        </Form>
                    )}
                </Formik>}
                {preView && <Panel>
                    <Row>
                        {preView.langData.map((item, i) => {
                            return <Col xs={12} key={i}>
                                <HStack className='p-2'>
                                    <Text weight='bold'>{item.label}</Text>
                                    <Text>{item.value}</Text>
                                </HStack>
                            </Col>
                        })}
                    </Row>
                </Panel>}
            </Panel>
        </>
    );
};

export default AppForm;
