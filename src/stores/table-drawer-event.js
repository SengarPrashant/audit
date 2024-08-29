import { proxy } from 'valtio';

export const tableDrawerEventStore = proxy({
    selectedRow: undefined,
    selecteRow(row) { this.selectedRow = { ...row }; },
    unSelecteRow() { this.selectedRow = undefined; },
});