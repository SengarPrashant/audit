import { proxy } from 'valtio';
import _ from 'lodash';
import { http } from '../helper/http';

export const commonStore = proxy({
    loading: false,
    error: [],
    startLoading() { this.loading = true; },
    stopLoading() { this.loading = false; },
    showError(errors = []) { this.error = [...errors]; },
    closeError() { this.error = [...[]]; },
});


export const mainMenuStore = proxy({
    list: [],
    current: {},
    setCurrent(_current = {}) { this.current = { ..._current }; },
    setCurrentById(id) { 
        const ob= findMenuByConfigMetaId(this.list,id);
        this.current=ob;
        return JSON.parse(JSON.stringify(ob));
     },
    load() {
        // fetch from api
        //  http.get('json-api').then(res=>this.list=[...res]) 
        const menuData = [{ "configMetaId": 1, "name": "Home", "icon": "home", "children": [] }, { "configMetaId": 2, "name": "System Configuration", "icon": "sysconf", "children": [{ "configMetaId": 3, "name": "Language", "children": [] }, { "configMetaId": 4, "name": "Enums", "children": [] }, { "configMetaId": 5, "name": "Country Codes and Currency", "children": [] }, { "configMetaId": 6, "name": "System Default Parameters", "children": [] }, { "configMetaId": 7, "name": "License Configuration", "children": [] }] }, { "configMetaId": 8, "name": "Client Configuration", "icon": "clconf", "children": [{ "configMetaId": 9, "name": "Client Configuration", "children": [] }, { "configMetaId": 10, "name": "License Assignments", "children": [] }, { "configMetaId": 11, "name": "Authentication configuration", "children": [] }, { "configMetaId": 12, "name": "Organizations and Organizational structure", "children": [] }] }, { "configMetaId": 13, "name": "User Management Configuration", "icon": "userconf", "children": [{ "configMetaId": 14, "name": "Application User Management", "children": [] }, { "configMetaId": 15, "name": "Role Management", "children": [] }, { "configMetaId": 16, "name": "User to Organization mapping", "children": [] }] }, { "configMetaId": 17, "name": "Module Configuration", "icon": "moduleconf", "children": [{ "configMetaId": 18, "name": "Standards Management Module", "children": [] }, { "configMetaId": 19, "name": "Audit Module", "children": [] }, { "configMetaId": 20, "name": "Evidence Management Module", "children": [] }, { "configMetaId": 21, "name": "Finding Module", "children": [] }, { "configMetaId": 22, "name": "Asset Management Module", "children": [] }, { "configMetaId": 23, "name": "Risk Assessment Module", "children": [] }] }, { "configMetaId": 24, "name": "Security Configuration", "icon": "secconf", "children": [] }, { "configMetaId": 25, "name": "Billing", "icon": "billing", "children": [] }];
        this.list = [...menuData];
        this.current = { ...menuData[0] };
    },
    
});

const findMenuByConfigMetaId = (menu, id) => {
    return _.reduce(menu, (result, item) => {
        if (result) return result; // If found, return result to exit early
        if (item.configMetaId === id) return item; // If the current item matches the ID, return it
        if (item.children && item.children.length > 0) {
            return findMenuByConfigMetaId(item.children, id); // Recursively search in children
        }
        return result;
    }, null);
};


export const userStore = proxy({
    profile: {},
    token: '',
    init(_profile = {}, _token = '') {
        this.profile = { ..._profile };
        this.token = _token;
    }
});