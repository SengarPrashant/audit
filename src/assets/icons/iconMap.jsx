import PlusIcon from '@rsuite/icons/Plus';
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
        default:
            return null
    }
}