import { Field, FieldArray, Form, ErrorMessage } from 'formik';
import { Input, Checkbox, Button, Form as RSForm, SelectPicker, Row, Col, Panel, Text, HStack, IconButton } from 'rsuite';
import { IconMap } from '../../assets/icons/iconMap';


const FieldRender = ({ field, setFieldValue, parentIndex, parentKey, values }) => {
    return <>
        {field.controleType != 'form' && <RSForm.ControlLabel style={{ visibility: field.controleType == 'checkbox' ? 'hidden' : 'visible' }}>{field.label}</RSForm.ControlLabel>}
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
                            <Checkbox  {...formikField} onChange={(value, checked) => setFieldValue(field.name, checked)}>
                                {field.label}
                            </Checkbox>
                        );
                    case 'form':
                        return (


                            <FieldArray name={field.name}>
                                {({ remove, push }) => (
                                    <>
                                        <Panel bordered title={field.label} shaded
                                            header={<>
                                                <HStack justifyContent='space-between'>
                                                    <Text weight="semibold">{field.label}</Text>
                                                    <Button onClick={() => push({})}>
                                                        <IconMap name='plus' />
                                                    </Button>
                                                </HStack>
                                            </>}
                                        >
                                            {values[field.name] && values[field.name].map((_, index) => {

                                                return <Row key={index} style={{ display: 'flex', flexWrap: 'wrap' }}>
                                                    {field.formDefinition.map((nestedField) => {
                                                        const cols = nestedField.controleType == 'form' ? 24 : 8;
                                                        return <Col xs={24} sm={24} md={cols} lg={cols} key={nestedField.name}>
                                                            <FieldRender
                                                                field={nestedField}
                                                                setFieldValue={setFieldValue}
                                                                values={values}
                                                                parentPath={`${field.name}[${index}]`}
                                                            />
                                                        </Col>
                                                    })}
                                                </Row>
                                            })}
                                        </Panel>
                                    </>
                                )}

                            </FieldArray>

                        );
                    default:
                        return null;
                }
            }}
        </Field >
        {field.helpText && <RSForm.HelpText>{field.helpText}</RSForm.HelpText>}
        < div style={{ minHeight: 20 }
        }>
            <ErrorMessage name={field.name} component="div"
                style={{ color: 'red' }} />
        </div >
    </>

}

export default FieldRender