import {proxy} from 'valtio';
import { http } from '../helper/http';

export const commonStore = proxy({
    loading:false,
    error:[],
    startLoading() {this.loading=true;},
    stopLoading() {this.loading=false;},
    showError(errors=[]) {this.error=[...errors];},
    closeError() {this.error=[...[]];},
});


export const mainMenuStore = proxy({
    list:[],
    current:{},
    setCurrent(_current={}) {this.current={..._current};},
    load(){
        // fetch from api
        //  http.get('json-api').then(res=>this.list=[...res]) 
        const menuData=[{"ConfigMetaId":1,"name":"Home","icon":"home","children":[]},{"ConfigMetaId":2,"name":"System Configuration","icon":"sysconf","children":[{"ConfigMetaId":3,"name":"Language","children":[]},{"ConfigMetaId":4,"name":"Enums","children":[]},{"ConfigMetaId":5,"name":"Country Codes and Currency","children":[]},{"ConfigMetaId":6,"name":"System Default Parameters","children":[]},{"ConfigMetaId":7,"name":"License Configuration","children":[]}]},{"ConfigMetaId":8,"name":"Client Configuration","icon":"clconf","children":[{"ConfigMetaId":9,"name":"Client Configuration","children":[]},{"ConfigMetaId":10,"name":"License Assignments","children":[]},{"ConfigMetaId":11,"name":"Authentication configuration","children":[]},{"ConfigMetaId":12,"name":"Organizations and Organizational structure","children":[]}]},{"ConfigMetaId":13,"name":"User Management Configuration","icon":"userconf","children":[{"ConfigMetaId":14,"name":"Application User Management","children":[]},{"ConfigMetaId":15,"name":"Role Management","children":[]},{"ConfigMetaId":16,"name":"User to Organization mapping","children":[]}]},{"ConfigMetaId":17,"name":"Module Configuration","icon":"moduleconf","children":[{"ConfigMetaId":18,"name":"Standards Management Module","children":[]},{"ConfigMetaId":19,"name":"Audit Module","children":[]},{"ConfigMetaId":20,"name":"Evidence Management Module","children":[]},{"ConfigMetaId":21,"name":"Finding Module","children":[]},{"ConfigMetaId":22,"name":"Asset Management Module","children":[]},{"ConfigMetaId":23,"name":"Risk Assessment Module","children":[]}]},{"ConfigMetaId":24,"name":"Security Configuration","icon":"secconf","children":[]},{"ConfigMetaId":25,"name":"Billing","icon":"billing","children":[]}];
        this.list=[...menuData];
        this.current={...menuData[0]};
    }
});


export const userStore = proxy({
    profile:{},
    token:'',
    init(_profile={},_token='') {
        this.profile={..._profile};
        this.token=_token;
    }
});