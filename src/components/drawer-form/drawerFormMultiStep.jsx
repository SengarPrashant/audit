import React, { useEffect, useRef, useState } from 'react';
import { Drawer, Placeholder, Button, Row, Col, Form as RSForm, HStack, Panel, Text } from 'rsuite';

import { Formik, Form, ErrorMessage } from 'formik';
import FormField, { getInitValues, getValidationSchema } from '../../helper/formHelper';
import { constants, dimentions } from '../main-layout/layoutConfig';
import { IconMap } from '../../assets/icons/iconMap';
import NoData from '../no-data';

const DrawerFormMultistep = ({ open = false, onClose = () => { },
    data = {}, parent = { parentId: 0, pageId: 0 },
}) => {
    const { formSteps, defaultData, title, size } = data;
    const [steps, setSteps] = useState({ currentStep: 0, values: {}, loading: false });
    const formikRef = useRef(null);

    useEffect(() => {
        if (defaultData && defaultData.length) {
            setSteps({ currentStep: 0, values: { 0: defaultData[0] }, loading: false })
        }
    }, [defaultData])

    const onNext = (vals) => {
        const nextStepData = formSteps[steps.currentStep + 1];
        if (nextStepData.type == constants.events.previewTranslation) {
            // api call nextStepData.translate
            const apiData = [
                {
                    lang: 'en', label: "English",
                    data: [
                        { label: 'Enum element name', value: 'Test Enum element Name' },
                        { label: 'Enum element description', value: 'Test English enum element description' },
                        { label: 'Status', value: 'Active' }
                    ]
                },
                {
                    lang: 'sp', label: "Spanish",
                    data: [
                        { label: 'Enum element name', value: 'Nombre del elemento de enumeración en inglésNombre del elemento de enumeración en español' },
                        { label: 'Enum element description', value: 'Descripción del elemento Enum en español.' },
                        { label: 'Status', value: 'Activa' }
                    ]
                }
            ]
            setSteps({ ...steps, currentStep: steps.currentStep + 1, values: { ...steps.values, [steps.currentStep]: vals, [steps.currentStep + 1]: apiData } })
        } else {
            setSteps({ ...steps, currentStep: steps.currentStep + 1, values: { ...steps.values, [steps.currentStep]: vals } })
        }

    }
    const onPrev = () => {
        setSteps({ ...steps, currentStep: steps.currentStep - 1 })
    }
    const handleSubmit = (values, e) => {
        console.log(values);
        onNext(values);
    }

    const onCloseDrawer = () => {
        setSteps({ currentStep: 0, values: {}, loading: false });
        onClose();
    }

    return (
        <>
            <Drawer open={open} backdrop={true} onClose={onCloseDrawer} size={size || 'sm'}>
                <Drawer.Header>
                    <HStack justifyContent='space-between' style={{ width: '100%' }}>
                        <Drawer.Title>{title || ""}</Drawer.Title>
                        <RSForm>
                            <Button appearance='link' disabled={steps.currentStep == 0} onClick={onPrev}>
                                <HStack><IconMap name='prev' style={{ marginTop: 2 }} /> Previous </HStack>
                            </Button>
                            <Button appearance='link' disabled={(formSteps && steps.currentStep == formSteps.length - 1)}
                                onClick={() => {
                                    formikRef.current?.submitForm();
                                }}><HStack>Next <IconMap name='next' style={{ marginTop: 3 }} /> </HStack></Button>

                            <Button appearance='link' disabled={(formSteps && steps.currentStep < formSteps.length - 1)}
                                onClick={() => {
                                    console.log(parent, steps);
                                    onClose();
                                }}><HStack> <IconMap name='save' style={{ marginTop: 3 }} /> Save </HStack></Button>
                        </RSForm>
                    </HStack>
                </Drawer.Header>
                <Drawer.Body style={{ height: window.innerHeight - (dimentions.header.h) }}>
                    {(!formSteps || !formSteps.length) && <NoData size="20%" text='No configuration found.' />}

                    {(formSteps && formSteps[steps.currentStep]?.type == 'form') && <>
                        {<Formik innerRef={formikRef} enableReinitialize
                            onSubmit={handleSubmit} initialValues={getInitValues(formSteps[steps.currentStep].formDefinition, steps.values[steps.currentStep])}
                            validationSchema={getValidationSchema(formSteps[steps.currentStep].formDefinition)} >
                            {({ values, setFieldValue, handleSubmit }) => {
                                return <Form>
                                    <RSForm>
                                        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {formSteps[steps.currentStep].formDefinition.map((field, index) => {
                                                return <Col xs={24} sm={24} md={12} lg={12} key={index}>
                                                    <RSForm.Group key={index} controlId={field.name} style={{ marginBottom: 8 }}>
                                                        <FormField field={field} setFieldValue={setFieldValue} values={values} />
                                                    </RSForm.Group>
                                                </Col>
                                            })}
                                        </Row>
                                    </RSForm>
                                </Form>
                            }}
                        </Formik>}
                    </>}
                    {(formSteps && formSteps[steps.currentStep]?.type == constants.events.previewTranslation) && <>
                        {steps.values[steps.currentStep] && steps.values[steps.currentStep].map((x, i) => {
                            return <>
                                <Panel key={x.lang} bordered className='mb-3'>
                                    <Text className='info-text mb-2' weight='bold'>{x.label}</Text>
                                    {x.data && x.data.map((ob, index) => {
                                        return <Row>
                                            <Col xs={12}><Text weight="semibold" >{`${ob.label}:`}</Text> </Col>
                                            <Col xs={12}><Text>{ob.value}</Text></Col>
                                        </Row>
                                    })}
                                </Panel >
                            </>
                        })}
                    </>}
                </Drawer.Body>
            </Drawer >
        </>
    );
};

export default DrawerFormMultistep;