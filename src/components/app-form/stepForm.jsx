import React, { useState, useRef, useEffect } from 'react';
import { Button, Col, Content, Divider, HStack, Panel, Row, Text, Form as RSForm, } from 'rsuite';
import { IconMap } from '../../assets/icons/iconMap';
import { Formik, Form } from 'formik';
import FormField, { getInitValues, getValidationSchema } from '../../helper/formHelper';
import { constants } from '../main-layout/layoutConfig';
import AppConfirmation from '../app-modals/AppConfirmation';

const StepForm = ({ config = {}, defaultData }) => {
    const [stepData, setStepData] = useState({ currentStep: 0, values: {}, loading: false });
    const formikRef = useRef(null);
    const [confirmartion, setConfirmation] = useState({open, });
    const { steps, fixedActionItems, actionItems } = config;
    useEffect(() => {
        if (defaultData) {
            setStepData({ currentStep: 0, values: { 0: defaultData }, loading: false })
        } else {
            setStepData({ currentStep: 0, values: { 0: {} }, loading: false })
        }
    }, [config, defaultData])


    const handleSubmit = (values, e) => {
        console.log(values);
        onNext(values);
    }
    const onNext = (vals) => {
        const nextStepData = steps[stepData.currentStep + 1];
        const currentStep = steps[stepData.currentStep];
        if (currentStep.type == 'form' && currentStep.event) {
            if (currentStep.event.name == constants.events.apiPreview) {
                // call api to submit data and get data
                const apiData = [
                    {
                        lang: 'en', label: "English",
                        data: [
                            { label: 'Name', value: 'English' },
                            { label: 'Code', value: 'en' },
                        ]
                    },
                    {
                        lang: 'sp', label: "Spanish",
                        data: [
                            { label: 'Name', value: 'Inglesa' },
                            { label: 'Code', value: 'sp' },
                        ]
                    }
                ]

                setStepData({ ...stepData, currentStep: stepData.currentStep + 1, values: { ...stepData.values, [stepData.currentStep]: vals, [stepData.currentStep + 1]: apiData } })
                return
            }
        }

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
            setStepData({ ...stepData, currentStep: stepData.currentStep + 1, values: { ...stepData.values, [stepData.currentStep]: vals, [stepData.currentStep + 1]: apiData } })
        } else {
            setStepData({ ...stepData, currentStep: stepData.currentStep + 1, values: { ...stepData.values, [stepData.currentStep]: vals } })
        }

    }
    const onPrev = () => {
        setStepData({ ...stepData, currentStep: stepData.currentStep - 1 })
    }

    const onActionClick = (item) => {
        const { event } = item;

        if(event.name == constants.events.deleteConfirm){
            event.message = event.message.replace('{resourcename}', `#h${event.metaData?.name}#h`)
            setConfirmation()
        }
    }

    return (
        <>
            <AppConfirmation  />
            <HStack>
                <RSForm>
                    <Button appearance='link' disabled={stepData.currentStep == 0} onClick={onPrev}>
                        <HStack><IconMap name='prev' style={{ marginTop: 2 }} /> {fixedActionItems.prev} </HStack>
                    </Button>
                    <Button appearance='link' disabled={(steps && stepData.currentStep == steps.length - 1)}
                        onClick={() => {
                            formikRef.current?.submitForm();
                        }}>
                        <HStack>{fixedActionItems.next} <IconMap name='next' style={{ marginTop: 2 }} /> </HStack>
                    </Button>
                    <Button appearance='link' disabled={(steps && stepData.currentStep < steps.length - 1)}
                        onClick={() => {
                            console.log(stepData);
                        }}>
                        <HStack><IconMap name='save' style={{ marginTop: 2 }} /> {fixedActionItems.save} </HStack>
                    </Button>

                    {actionItems.map(item => {
                        return <Button appearance='link' disabled={defaultData == undefined}
                            onClick={() => {
                                onActionClick(item);
                            }}>
                            <HStack><IconMap name={item.icon} style={{ marginTop: 2 }} /> {item.label} </HStack>
                        </Button>
                    })}

                </RSForm>
            </HStack>
            <Divider style={{ margin: 0 }} />
            <Content style={{ maxWidth: '100%', padding: 16 }}>
                {(steps && steps[stepData.currentStep]?.type == 'form') &&
                    <>
                        <Formik innerRef={formikRef} enableReinitialize
                            onSubmit={handleSubmit} initialValues={getInitValues(steps[stepData.currentStep].definition, stepData.values[stepData.currentStep])}
                            validationSchema={getValidationSchema(steps[stepData.currentStep].definition)}>
                            {({ values, setFieldValue, handleSubmit }) => {
                                return <Form>
                                    <RSForm>
                                        <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                                            {steps[stepData.currentStep].definition.map((field, index) => {
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
                        </Formik>
                    </>
                }
                {(steps && steps[stepData.currentStep]?.type == constants.events.previewTranslation) && <>
                    {stepData.values[stepData.currentStep] && stepData.values[stepData.currentStep].map((x, i) => {
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
            </Content>
        </>
    );
};

export default StepForm;