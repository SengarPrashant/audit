import { proxy } from 'valtio';
import { http } from '../helper/http';

export const pageStore = proxy({
    data: {},
    load(id='') {
        //  http.get('<apiurl>').then(res=>this.list=[...res]) 
        this.data = {
            layout: 'ListDetail',
            col1: {
                emptyText:'No data found',
                section: 'list',
                data: [{ "label": "Hindi", "value": "1" }, { "label": "two", "value": "2" }, { "label": "three", "value": "3" }] // each item/node will have a lable and code/Id
            },
            col2: {
                section: 'form',
                emptyText:'No fields to display. Please configure the form fields',
                actionItems:[
                    { label: 'Update', action: 'save', disabled: false },
                    { label: 'Deactivate', action: 'deactivate', disabled: false },
                    { label: 'Delete', action: 'delete', disabled: true },
                ],
                data: [
                    {
                        name: 'name',
                        label: "Language Name",
                        placeHolder: 'Enter language name',
                        helpText: 'This is help text. Only alphabets allowed.',
                        dataType: "string",
                        controleType: "text", // number, select, checkbox, radio
                        defaultValue: "",
                        selectList: [{}],  // this is the data for select/multiselect dropdown,
                        displayOrder: 1,
                        validations: [
                            {type:'required', message:'This is required'}
                        ],
                    },
                    {
                        name: 'code',
                        label: "Language Code",
                        placeHolder: 'Enter language code',
                        helpText: '',
                        dataType: "string",
                        controleType: "text",
                        defaultValue: "",
                        selectList: [{}],  // this is the data for select/multiselect dropdown,
                        displayOrder: 2,
                        validations: [
                            {type:'required', message:'This is required'}
                        ],
                    },
                    {
                        name: 'test',
                        label: "Test select",
                        placeHolder: 'Select',
                        helpText: '',
                        dataType: "string",
                        controleType: "select",
                        defaultValue: "",
                        selectList: [{ value: '1', label: 'India' }],  // this is the data for select/multiselect dropdown,
                        displayOrder: 3,
                        validations: [
                            {type:'required', message:'This is required'}
                        ],
                    }
                ]
            }
        };
    } // load end
});