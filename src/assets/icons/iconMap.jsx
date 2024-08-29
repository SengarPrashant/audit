import PlusIcon from '@rsuite/icons/Plus';
import ReloadIcon from '@rsuite/icons/Reload';
import EditIcon from '@rsuite/icons/Edit';
import MoreIcon from '@rsuite/icons/More';
import RemindFillIcon from '@rsuite/icons/RemindFill';
import CloseIcon from '@rsuite/icons/Close';
import PageNextIcon from '@rsuite/icons/PageNext';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';



import { SaveIcon } from "./save";
import { DeleteIcon } from "./delete";
import { DeactivateIcon } from "./deactivate";

export const IconMap = ({ key, name = '', className = '', color, h, w, style }) => {
    switch (name?.toLocaleLowerCase()) {
        case 'save':
            return <SaveIcon className={className} color={color} h={h} w={w} style={style} key={key} />
        case 'delete':
            return <DeleteIcon className={className} color={color} h={h} w={w} style={style} key={key} />
        case 'plus':
            return <PlusIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        case 'deactivate':
            return <DeactivateIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        case 'reload':
            return <ReloadIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        case 'edit':
            return <EditIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        case 'more':
            return <MoreIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        case 'warn':
            return <RemindFillIcon className={className ? 'warning-text' : className} color={color} height={h} width={w} style={style} key={key} />
        case 'error':
            return <RemindFillIcon className={className ? 'error-text' : className} color={color} height={h} width={w} style={style} key={key} />
        case 'close':
            return <CloseIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        case 'next':
            return <PageNextIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        case 'prev':
            return <PagePreviousIcon className={className} color={color} height={h} width={w} style={style} key={key} />
        default:
            return null
    }
}