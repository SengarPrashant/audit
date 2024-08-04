import { BillingIcon } from "../../assets/icons/billing"
import { ClientConfigIcon } from "../../assets/icons/clientConfig"
import { HomeIcon } from "../../assets/icons/home"
import { ModuleConfigIcon } from "../../assets/icons/moduleConfig"
import { SecurityConfigIcon } from "../../assets/icons/securityConfig"
import { SystemConfigIcon } from "../../assets/icons/systemConfig"
import { UserManagementIcon } from "../../assets/icons/userMgt"


function MenuIcons({ icon = '', w = 20, h = 20, className = '', color = 'grey', style = {} }) {
    return (
        <>
            {icon == 'billing' && <BillingIcon w={w} h={h} className={className} color={color} style={style} />}
            {icon == 'clconf' && <ClientConfigIcon w={w} h={h} className={className} color={color} style={style} />}
            {icon == 'home' && <HomeIcon w={w} h={h} className={className} color={color} style={style} />}
            {icon == 'moduleconf' && <ModuleConfigIcon w={w} h={h} className={className} color={color} style={style} />}
            {icon == 'secconf' && <SecurityConfigIcon w={w} h={h} className={className} color={color} style={style} />}
            {icon == 'sysconf' && <SystemConfigIcon w={w} h={h} className={className} color={color} style={style} />}
            {icon == 'userconf' && <UserManagementIcon w={w} h={h} className={className} color={color} style={style} />}
        </>
    )
}

export default MenuIcons
