import { proxy } from 'valtio';
import { http } from '../helper/http';

export const clientStore = proxy({
    tree: [],
    set(_data = []) { this.tree = [..._data]; },
    load() {
        //  http.get('<apiurl>').then(res=>this.list=[...res]) 
        this.tree = [{ "label": "Web", "value": "1", "children": [{ "label": "Engineer", "value": "1-1", "children": [{ "label": "German", "value": "1-1-1" }, { "label": "Christopher", "value": "1-1-2" }, { "label": "Guadalupe", "value": "1-1-3" }, { "label": "Maymie", "value": "1-1-4" }] }, { "label": "Orchestrator", "value": "1-2", "children": [{ "label": "Murray", "value": "1-2-1" }, { "label": "Shyanne", "value": "1-2-2" }, { "label": "Shanny", "value": "1-2-3" }, { "label": "Ciara", "value": "1-2-4" }] }, { "label": "Liaison", "value": "1-3", "children": [{ "label": "Rico", "value": "1-3-1" }, { "label": "Kristin", "value": "1-3-2" }, { "label": "Marian", "value": "1-3-3" }, { "label": "Raoul", "value": "1-3-4" }] }] }, { "label": "Functionality", "value": "2", "children": [{ "label": "Facilitator", "value": "2-1", "children": [{ "label": "Johnathon", "value": "2-1-1" }, { "label": "Amya", "value": "2-1-2" }, { "label": "Emmie", "value": "2-1-3" }, { "label": "Eunice", "value": "2-1-4" }] }, { "label": "Agent", "value": "2-2", "children": [{ "label": "Fredrick", "value": "2-2-1" }, { "label": "Thelma", "value": "2-2-2" }, { "label": "Marcelo", "value": "2-2-3" }, { "label": "Orland", "value": "2-2-4" }] }, { "label": "Director", "value": "2-3", "children": [{ "label": "Gloria", "value": "2-3-1" }, { "label": "Cristobal", "value": "2-3-2" }, { "label": "Alexandra", "value": "2-3-3" }, { "label": "Madison", "value": "2-3-4" }] }] }, { "label": "Creative", "value": "3", "children": [{ "label": "Designer", "value": "3-1", "children": [{ "label": "Lucy", "value": "3-1-1" }, { "label": "Camryn", "value": "3-1-2" }, { "label": "Eleazar", "value": "3-1-3" }, { "label": "Lorna", "value": "3-1-4" }] }, { "label": "Agent", "value": "3-2", "children": [{ "label": "Lucinda", "value": "3-2-1" }, { "label": "Timmy", "value": "3-2-2" }, { "label": "Matilda", "value": "3-2-3" }, { "label": "Julian", "value": "3-2-4" }] }, { "label": "Engineer", "value": "3-3", "children": [{ "label": "Nicole", "value": "3-3-1" }, { "label": "Penelope", "value": "3-3-2" }, { "label": "Liliana", "value": "3-3-3" }, { "label": "Amparo", "value": "3-3-4" }] }] }];
    }
});