import { proxy } from 'valtio';

export const listDetailEventStore = proxy({
    selectedNodes: [],
    set(nodes = []) { this.selectedNodes = [...nodes]; },
});