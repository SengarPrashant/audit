import { proxy } from 'valtio';
import { http } from '../helper/http';
import { commonStore } from "./common";


export const pageStore = proxy({

    data: {},

    load(id = '') {

        //  http.get('<apiurl>').then(res=>this.list=[...res]) 

        this.data = dummydata[id];

        // commonStore.initBreadCrumb(this.data.title);

    } // load end

});




const dummydata = {
    3: {
        id: 4,
        title: 'Language',
        layout: 'list-step-form',
        emptyText: 'No data found',
        sections: [
            {
                type: 'list',
                pageId: 3,
                title: "",
                emptyText: 'No data found',
                actionItems: [],
                definition: { label: 'name', value: 'langId', dataSource: 'abc/xyz' },
            },
            {
                type: 'step-form',
                pageId: 3,
                title: "Manage language",
                emptyText: 'No data found',
                fixedActionItems: { prev: "Previous", next: "Preview Translation", save: "Save" },
                // actionItems: [
                //     {
                //         label: 'Delete', disabled: false, icon: 'delete', event: {
                //             id: 13, name: 'delete-confirmation',
                //             title: 'Delete Confirmation', message: 'Are you sure you want to delete {resourcename}? This action cannot be undone.',
                //             resourceName: "name"
                //         }
                //     }
                // ],
                steps: [
                    {
                        type: 'form',
                        title: "Preview translation",
                        event: {
                            name: 'api-preview',
                            api: "post|api/translate",
                        },
                        definition: [{
                            name: 'name',
                            label: "Language Name",
                            placeHolder: 'Enter language name',
                            helpText: '',
                            dataType: "string",
                            controleType: "text", // number, decimal, select, checkbox, radio, currency, date
                            defaultValue: "",
                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                            displayOrder: 1,
                            validations: [{ type: 'required', message: 'This is required' }],
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
                                { type: 'required', message: 'This is required' }
                            ],
                        }]
                    },
                    {
                        type: 'form-array', title: "Save translation",
                        event: {
                            name: 'api-save',
                            api: "post|api/translate",
                        },
                        definition: [{
                            name: 'name',
                            label: "Language Name",
                            placeHolder: 'Enter language name',
                            helpText: '',
                            dataType: "string",
                            controleType: "text", // number, decimal, select, checkbox, radio, currency, date
                            defaultValue: "",
                            selectList: [{}],  // this is the data for select/multiselect dropdown,
                            displayOrder: 1,
                            validations: [{ type: 'required', message: 'This is required' }],
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
                                { type: 'required', message: 'This is required' }
                            ],
                        }]
                    }
                ],

            }
        ],
    },
    33: {

        id: 4,

        title: 'Language',

        layout: 'ListDetail',

        col1: {

            pageId: 3,

            emptyText: 'No data found',

            section: 'list',

            // data: [{ "label": "Hindi", "value": "1"}, { "label": "two", "value": "2" }, { "label": "three", "value": "3" }] // each item/node will have a lable and code/Id

            data: {

                keys: { label: 'name', value: 'code' },

                list: [{ "name": "Hindi", "code": "1" }, { "name": "two", "code": "2" }, { "name": "three", "code": "3" }]

            }

        },

        col2: {

            pageId: 3,

            section: 'form',

            title: "Manage language",

            emptyText: 'No fields to display. Please configure the form fields',

            actionItems: [

                { label: 'Save', action: 'save', disabled: false, icon: 'save', submit: true },

                { label: 'Deactivate', action: 'deactivate', disabled: false, icon: 'deactivate', submit: false },

                { label: 'Delete', action: 'delete', disabled: true, icon: 'delete', submit: false },

            ],

            formDefinition: [

                {

                    name: 'name',

                    label: "Language Name",

                    placeHolder: 'Enter language name',

                    helpText: 'This is help text. Only alphabets allowed.',

                    dataType: "string",

                    controleType: "text", // number, decimal, int, select, checkbox, radio, currency, date

                    defaultValue: "",

                    selectList: [{}],  // this is the data for select/multiselect dropdown,

                    displayOrder: 1,

                    validations: [

                        { type: 'required', message: 'This is required' }

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

                        { type: 'required', message: 'This is required' }

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

                        { type: 'required', message: 'This is required' }

                    ],

                }

            ]

        }

    },

    4: {

        id: 4,

        title: 'Enums',

        layout: 'tabs-table',

        tabs: [

            {

                id: 1, title: "Enum Element Group",

                pageId: 4,

                parentId: 0,

                tableConfig: {

                    globalAction: [

                        { label: 'Reload', disabled: false, icon: 'reload', event: { id: 12, name: 'reloadtable' } },

                        {

                            label: 'Create', disabled: false, icon: 'plus', event: {

                                id: 1, name: 'open-drawer-form',

                                title: "Create Enum element Group",

                                size: 'sm', // xs/sm/md/lg/full

                                formDefinition: [{

                                    name: 'name',

                                    label: "Enum group name",

                                    placeHolder: 'Enter Enum group name',

                                    helpText: null,

                                    dataType: "string",

                                    controleType: "text", // number, select, checkbox, radio

                                    defaultValue: "",

                                    selectList: [{}],  // this is the data for select/multiselect dropdown,

                                    displayOrder: 1,

                                    validations: [

                                        { type: 'required', message: 'This is required' }

                                    ],

                                },

                                {

                                    name: 'description',

                                    label: "Description",

                                    placeHolder: 'Enter Enum group description',

                                    helpText: null,

                                    dataType: "string",

                                    controleType: "text", // number, select, checkbox, radio

                                    defaultValue: "",

                                    selectList: [{}],  // this is the data for select/multiselect dropdown,

                                    displayOrder: 1,

                                    validations: [

                                        { type: 'required', message: 'This is required' }

                                    ],

                                },

                                {

                                    name: 'status',

                                    label: "Status",

                                    placeHolder: '',

                                    helpText: null,

                                    dataType: 'bool',

                                    controleType: "checkbox", // number, select, checkbox, radio

                                    defaultValue: "",

                                    selectList: [{}],  // this is the data for select/multiselect dropdown,

                                    displayOrder: 1,

                                    validations: [],

                                }]

                            }

                        }

                    ],

                    rowActions: [

                        {

                            label: 'Edit', disabled: false, icon: 'edit', event: {

                                id: 12, name: 'open-drawer-form', title: "Update Enum element Group",

                                formDefinition: []

                            }

                        },

                        {

                            label: 'Delete', disabled: false, icon: 'delete', event: {

                                id: 13, name: 'delete-confirmation',

                                title: 'Delete Confirmation', message: 'Are you sure you want to delete {resourcename}? This action cannot be undone.'
                                , resourceName: "name"
                            }

                        }

                    ],

                    dataSource: 'api/dummydata',

                    columnDefinition: [{ label: 'Id', key: 'id', hidden: true },

                    { label: 'Name', key: 'name', type: 'link', event: { id: '1', name: "newtab", tabId: 2 } },

                    { label: 'Status', key: 'status' },

                    { label: 'Description', key: 'description' }]

                }

            }

        ]

    },

    12: {

        id: 12,

        title: 'Client configuration',

        layout: 'list-detail',

        list: {

            keys: { label: 'name', value: 'code' },

            data: [{ "name": "Client 1", "code": "1" },

            { "name": "Client 2", "code": "2" },

            { "name": "Client 3", "code": "3" },

            { "name": "Client 4", "code": "5" },

            ]

        }

    }

}


































// // Nested form data

// 4: {

//     layout: 'ListDetail',

//     col1: {

//         emptyText: 'No data found',

//         section: 'list',

//         // data: [{ "label": "Hindi", "value": "1"}, { "label": "two", "value": "2" }, { "label": "three", "value": "3" }] // each item/node will have a lable and code/Id

//         data: {

//             keys: { label: 'name', value: 'code' },

//             list: [{ "name": "Hindi", "code": "1" }, { "name": "two", "code": "2" }, { "name": "three", "code": "3" }]

//         }

//     },

//     col2: {

//         section: 'nestedForm',

//         title: 'Enum group',

//         formDefinition: [

//             {

//                 name: 'name',

//                 label: "Enum group name",

//                 placeHolder: 'Enter Enum group name',

//                 helpText: null,

//                 dataType: "string",

//                 controleType: "text", // number, select, checkbox, radio

//                 defaultValue: "",

//                 selectList: [{}],  // this is the data for select/multiselect dropdown,

//                 displayOrder: 1,

//                 validations: [

//                     { type: 'required', message: 'This is required' }

//                 ],

//             },

//             {

//                 name: 'description',

//                 label: "Description",

//                 placeHolder: 'Enter Enum group description',

//                 helpText: null,

//                 dataType: "string",

//                 controleType: "text", // number, select, checkbox, radio

//                 defaultValue: "",

//                 selectList: [{}],  // this is the data for select/multiselect dropdown,

//                 displayOrder: 1,

//                 validations: [

//                     { type: 'required', message: 'This is required' }

//                 ],

//             },

//             {

//                 name: 'status',

//                 label: "Status",

//                 placeHolder: '',

//                 helpText: null,

//                 dataType: 'bool',

//                 controleType: "checkbox", // number, select, checkbox, radio

//                 defaultValue: "",

//                 selectList: [{}],  // this is the data for select/multiselect dropdown,

//                 displayOrder: 1,

//                 validations: [],

//             },

//             {

//                 name: 'enumElement',

//                 label: "Enum element",

//                 controleType: "form", // number, select, checkbox, radio

//                 displayOrder: 1,

//                 formDefinition: [{

//                     name: 'elementName',

//                     label: "Element name",

//                     placeHolder: '',

//                     helpText: null,

//                     dataType: 'string',

//                     controleType: "text", // number, select, checkbox, radio

//                     defaultValue: "",

//                     selectList: [{}],  // this is the data for select/multiselect dropdown,

//                     displayOrder: 1,

//                     validations: ['required'],

//                 },

//                 {

//                     name: 'status',

//                     label: "Status",

//                     placeHolder: '',

//                     helpText: null,

//                     dataType: 'bool',

//                     controleType: "checkbox", // number, select, checkbox, radio

//                     defaultValue: "",

//                     selectList: [{}],  // this is the data for select/multiselect dropdown,

//                     displayOrder: 1,

//                     validations: [],

//                 },

//                 {

//                     name: 'enumElementLng',

//                     label: "Enum element language",

//                     controleType: "form", // number, select, checkbox, radio

//                     displayOrder: 1,

//                     formDefinition: [{

//                         name: 'langName',

//                         label: "Language name",

//                         placeHolder: '',

//                         helpText: null,

//                         dataType: 'string',

//                         controleType: "text", // number, select, checkbox, radio

//                         defaultValue: "",

//                         selectList: [{}],  // this is the data for select/multiselect dropdown,

//                         displayOrder: 1,

//                         validations: ['required'],

//                     },

//                     {

//                         name: 'status',

//                         label: "Status",

//                         placeHolder: '',

//                         helpText: null,

//                         dataType: 'bool',

//                         controleType: "checkbox", // number, select, checkbox, radio

//                         defaultValue: "",

//                         selectList: [{}],  // this is the data for select/multiselect dropdown,

//                         displayOrder: 1,

//                         validations: [],

//                     }

//                     ]

//                 }

//                 ]

//             }

//         ],

//         emptyText: 'No fields to display. Please configure the form fields',

//         actionItems: [

//             { label: 'Save', action: 'save', disabled: false, icon: 'save', submit: true },

//             { label: 'Deactivate', action: 'deactivate', disabled: false, icon: 'deactivate', submit: false },

//             { label: 'Delete', action: 'delete', disabled: true, icon: 'delete', submit: false },

//         ],

//         data: [

//             {

//                 name: 'name',

//                 label: "Enum group",

//                 placeHolder: 'Enter language name',

//                 helpText: 'This is help text. Only alphabets allowed.',

//                 dataType: "string",

//                 controleType: "text", // number, select, checkbox, radio

//                 defaultValue: "",

//                 selectList: [{}],  // this is the data for select/multiselect dropdown,

//                 displayOrder: 1,

//                 validations: [

//                     { type: 'required', message: 'This is required' }

//                 ],

//             },

//             {

//                 name: 'code',

//                 label: "Language Code",

//                 placeHolder: 'Enter language code',

//                 helpText: '',

//                 dataType: "string",

//                 controleType: "text",

//                 defaultValue: "",

//                 selectList: [{}],  // this is the data for select/multiselect dropdown,

//                 displayOrder: 2,

//                 validations: [

//                     { type: 'required', message: 'This is required' }

//                 ],

//             },

//             {

//                 name: 'test',

//                 label: "Test select",

//                 placeHolder: 'Select',

//                 helpText: '',

//                 dataType: "string",

//                 controleType: "select",

//                 defaultValue: "",

//                 selectList: [{ value: '1', label: 'India' }],  // this is the data for select/multiselect dropdown,

//                 displayOrder: 3,

//                 validations: [

//                     { type: 'required', message: 'This is required' }

//                 ],

//             }

//         ]

//     }

// },