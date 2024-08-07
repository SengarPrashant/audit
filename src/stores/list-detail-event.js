import { proxy } from 'valtio';

export const listDetailEventStore = proxy({
    selected: [],
    set(_data = []) { this.tree = [..._data]; },
    load() {
        //  http.get('<apiurl>').then(res=>this.list=[...res]) 
       
    }
});