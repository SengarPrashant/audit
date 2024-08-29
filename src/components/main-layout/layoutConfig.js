export const dimentions = {
    header: { h: 56 },
    menu: { expanded: 270, collapsed: 56 },
    crumb: { h: 33.14 },
    actions: { h: 36 },
    getHeight: function (add = 0) {
        return this.header.h + this.crumb.h + add
    },
    calCulatedViewPortHeight: function (add = 0) {
        return window.innerHeight - this.header.h - this.crumb.h + add;
    }
}



export const colors = {
    primary: { main: '#21348a' },
    spacing: {}
}

export const constants = {
    actionCodes: { create: 'create', save: 'save', delete: 'delete', cancel: 'cancel', detail: 'detail' },
    events: { openDrawerForm: 'open-drawer-form',openmultiStepDrawerForm: 'open-multistep-drawer-form', newTab: 'newtab', deleteConfirm:'delete-confirmation',
        submit: 'submit', next: 'next', prev: 'prev', reloadtable: 'reloadtable', previewTranslation:'preview-translation' }
}