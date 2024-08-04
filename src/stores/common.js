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
    set(_list=[]) {this.list=[..._list];},
    load(){
        //  http.get('json-api').then(res=>this.list=[...res]) 
        this.list = [{"name":"Home","icon":"home","children":[]},{"name":"System Configuration","icon":"sysconf","children":[{"name":"Language Config","children":[]},{"name":"Enums","children":[]},{"name":"Country Codes and Currency","children":[]},{"name":"System Default Parameters","children":[]},{"name":"License Configuration","children":[]}]},{"name":"Client Configuration","icon":"clconf","children":[{"name":"Client Configuration","children":[]},{"name":"License Assignments","children":[]},{"name":"Authentication configuration","children":[]},{"name":"Organizations and Organizational structure","children":[]}]},{"name":"User Management Configuration","icon":"userconf","children":[{"name":"Application User Management","children":[]},{"name":"Role Management","children":[]},{"name":"User to Organization mapping","children":[]}]},{"name":"Module Configuration","icon":"moduleconf","children":[{"name":"Standards Management Module","children":[]},{"name":"Audit Module","children":[]},{"name":"Evidence Management Module","children":[]},{"name":"Finding Module","children":[]},{"name":"Asset Management Module","children":[]},{"name":"Risk Assessment Module","children":[]}]},{"name":"Security Configuration","icon":"secconf","children":[]},{"name":"Billing","icon":"billing","children":[]}]
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