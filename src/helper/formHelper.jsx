import * as Yup from 'yup';
import { Field, FieldArray, ErrorMessage } from 'formik';
import { Input, Checkbox, Button, Form as RSForm, SelectPicker, Row, Col, Panel, Text, HStack } from 'rsuite';
import { IconMap } from '../assets/icons/iconMap';


export const getValidationSchema = (formDefinition = []) => {
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
    return validationSchema;
}

export const getValidationSchemaArray = (formDefinition = []) => {
    const schema = Yup.object().shape({
        data: Yup.array().of(
            Yup.object().shape(
                formDefinition.reduce((schema, field) => {
                    let validator;
                    switch (field.type) {
                        case 'string':
                            validator = Yup.string();
                            break;
                        case 'number':
                            validator = Yup.number();
                            break;
                        default:
                            validator = Yup.string(); // Default to string if type not specified
                    }
                    
                    if (field.validations) {
                        field.validations.forEach(rule => {
                            if (rule.type === 'required') {
                                validator = validator.required(rule.message);
                            }
                            if (rule.type === 'email') {
                                validator = validator.email(rule.message);
                            }
                            if (rule.type === 'min') {
                                validator = validator.min(rule.value, rule.message);
                            }
                            if (rule.type === 'max') {
                                validator = validator.max(rule.value, rule.message);
                            }
                            // Add other validation rules as needed
                        });
                    }

                    return { ...schema, [field.name]: validator };
                }, {})
            )
        )
    });

    return schema;
};


// export const getValidationSchemaArray = (formDefinition = []) => {

//     const schema = Yup.object().shape({
//         data: Yup.array()
//             .of(
//                 Yup.object().shape(formDefinition.reduce((schema, field) => {
//                     let validator = Yup.string(); // Default to string
//                     if (field.validations) {
//                         field.validations.forEach(rule => {
//                             if (rule.type === 'required') {
//                                 validator = validator.required(rule.message);
//                             }
//                             if (rule.type === 'email') {
//                                 validator = validator.email(rule.message);
//                             }
//                             if (rule.type === 'number') {
//                                 validator = Yup.number().required(rule.message);
//                             }
//                         });
//                     }

//                     return { ...schema, [field.name]: validator };
//                 }, {}))
//             )
//     });

//     return schema;

// }

export const getInitValues = (formDefinition = [], defaultData) => {
    const _defaultData = defaultData || [];
    var vals = formDefinition.reduce((acc, field) => {
        acc[field.name] = _defaultData[field.name] || field.defaultValue || '';
        return acc;
    }, {})
    console.log(vals);
    return vals;
}

const FormField = ({ field, setFieldValue, values }) => {
    const isReq = field.validations && field.validations.filter(x => x.type.toLocaleLowerCase() == 'required').length > 0
    return <>
        {field.controleType != 'form' && <RSForm.ControlLabel style={{ visibility: field.controleType == 'checkbox' ? 'hidden' : 'visible' }}>
            {isReq && <span className='req-label'> | </span>}{field.label}
        </RSForm.ControlLabel>}
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
                            <Checkbox  {...formikField} checked={values?.[field.name]} onChange={(value, checked) => setFieldValue(field.name, checked)}>
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
export default FormField;