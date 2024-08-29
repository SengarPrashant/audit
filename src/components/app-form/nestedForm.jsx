import { useState, useRef } from "react";
import { Col, Row, Form as RSForm, Panel, HStack, Button } from "rsuite"
import { Formik, Form } from "formik";
import FieldRender from "./fieldRender";
import { IconMap } from "../../assets/icons/iconMap";

const NestedForm = ({ formDefinition = [], actions = [], emptyText, defaultData }) => {
    const _defaultData = JSON.parse(JSON.stringify(defaultData));
    const formikRef = useRef(null);
    const [action, setAction] = useState('');
    const _formDefinition = JSON.parse(JSON.stringify(formDefinition));

    const getInitValues = (formDef) => {
        let ob = {};
        formDef.map((f, i) => {
            if (f.controleType == 'form') {
                ob[f.name] = [];
                const nested = getInitValues(f.formDefinition);
                ob[f.name].push(nested);
            } else {
                ob[f.name] = '';
            }
        });
       // console.log('initvalue', JSON.stringify(ob))
        return ob;
    }

    return <>
        <RSForm>
            <HStack justifyContent='flex-end' className='py-2'>
                {actions.map((item, i) => <Button disabled={item.disabled} onClick={() => {
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
        </RSForm>
        <Panel bordered>
            <Formik innerRef={formikRef}
                initialValues={getInitValues(_formDefinition)}
                onSubmit={(vals) => {
                    console.log(vals);
                }}
            >
                {({ values, setFieldValue, handleSubmit }) => {
                    return <Form>
                        <RSForm>
                            <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {_formDefinition.map((field, index) => {
                                    const isForm = field.controleType == 'form';
                                    return <Col xs={24} sm={24} md={isForm ? 24 : 8} lg={isForm ? 24 : 8} key={index}>
                                        <RSForm.Group key={index} controlId={field.name} style={{ marginBottom: 0 }}>
                                            <FieldRender field={field} setFieldValue={setFieldValue} values={values} />
                                        </RSForm.Group>
                                    </Col>
                                })}
                            </Row>
                        </RSForm>
                    </Form>
                }}
            </Formik>
        </Panel>
    </>
}



export default NestedForm