import React, { useEffect, useRef, useState } from 'react';
import { Drawer, Placeholder, Button, Row, Col, Form as RSForm, HStack, Panel } from 'rsuite';

import { Formik, Form, ErrorMessage } from 'formik';
import FormField, { getInitValues, getValidationSchema } from '../../helper/formHelper';
import { dimentions } from '../main-layout/layoutConfig';
import { IconMap } from '../../assets/icons/iconMap';
import NoData from '../no-data';

const DrawerForm = ({ open = false, onClose = () => { },
    data = {}, parent = { parentId: 0, pageId: 0 },
    emptyText = ''
}) => {
    const { formDefinition, defaultData, title, size } = data;
    const formikRef = useRef(null);
    const handleSubmit = (values, e) => {
        console.log({ ...values, ...parent });
        onClose();
    }

    return (
        <>
            <Drawer open={open} backdrop={true} onClose={onClose} size={size || 'sm'}>
                <Drawer.Header>
                    <HStack justifyContent='space-between' style={{ width: '100%' }}>
                        <Drawer.Title>{title}</Drawer.Title>
                        <RSForm>
                            <Button appearance='link' onClick={onClose}>
                                <HStack><IconMap name='close' style={{ marginTop: 2 }} /> Cancel </HStack>
                            </Button>
                            <Button appearance='link' onClick={() => {
                                formikRef.current?.submitForm();
                            }}><HStack><IconMap name='save' /> Save </HStack></Button>
                        </RSForm>
                    </HStack>
                </Drawer.Header>
                <Drawer.Body style={{ height: window.innerHeight - (dimentions.header.h) }}>
                    {(!formDefinition || !formDefinition.length) && <NoData size="20%" text='No configuration found.' />}

                    {(formDefinition && formDefinition.length) && <Formik innerRef={formikRef}
                        onSubmit={handleSubmit} initialValues={getInitValues(formDefinition, defaultData)}
                        validationSchema={getValidationSchema(formDefinition)} >
                        {({ values, setFieldValue, handleSubmit }) => {
                            return <Form>
                                <RSForm>
                                    <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {formDefinition.map((field, index) => {
                                            return <Col xs={24} sm={24} md={12} lg={12} key={index}>
                                                <RSForm.Group key={index} controlId={field.name} style={{ marginBottom: 8 }}>
                                                    <FormField field={field} setFieldValue={setFieldValue} />
                                                </RSForm.Group>
                                            </Col>
                                        })}
                                    </Row>
                                </RSForm>
                            </Form>
                        }}
                    </Formik>}
                </Drawer.Body>
            </Drawer>
        </>
    );
};

export default DrawerForm;