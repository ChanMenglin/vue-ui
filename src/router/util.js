// routers util
import tools from '@/tools/index'

function IsRouters(routers) {
    if (routers
        && routers.Modules
        && typeof (routers.Modules) == 'object'
        && routers.SubsystemName
        && typeof (routers.SubsystemName) == `string`
        && ![...routers.SubsystemName].includes('-'))
        return true
    else
        return false
}

function IsPath(item) {
    if (item
        && item.path
        && typeof (item.path) == `string`
        && item.name
        && typeof (item.name) == `string`
        && item.component
        && typeof (item.component) == `function`)
        return true
    else
        return false
}

function FormatSubsystemName(routers ,SubsystemName) {
    return SubsystemName
        ? SubsystemName + '-' + routers.SubsystemName
        : routers.SubsystemName
}

function FormatPath(item, SubsystemName) {
    return '/' + SubsystemName + '-' + item.path
}

function FormatRouters(routers, SubsystemName = '', array = []) {
    if (!IsRouters(routers)) return []

    SubsystemName = FormatSubsystemName(routers, SubsystemName)

    for (let item of routers.Modules) {
        if (IsRouters(item)) {
            FormatRouters(item, SubsystemName, array)
        } else {
            if (!IsPath(item)) continue
            item.path = FormatPath(item, SubsystemName)
            array.push(item)
        }
    }
    return array
}

function FormatModels(routers, SubsystemName = '') {
    if (IsRouters(routers) && !routers.hide) {
        SubsystemName = FormatSubsystemName(routers, SubsystemName)
        if (!routers.hide) {
            for (let i = 0; i < routers.Modules.length; i++) {
                let item = routers.Modules[i]
                if (IsPath(item) && !item.hide) {
                    item.path = FormatPath(item, SubsystemName)
                } else if (IsPath(item) && item.hide) {
                    // 连接为 hide: true,
                    routers.Modules.splice(i, 1)
                    i--
                } else if (IsRouters(item) && !(item.hide || item.Modules.length == 0)) {
                    item = FormatModels(item, SubsystemName)
                    if (!IsRouters(item)) {
                        // 子模块 均为 hide: true,
                        routers.Modules.splice(i, 1)
                        i--
                    }
                } else if (IsRouters(item) && (item.hide || item.Modules.length == 0)) {
                    routers.Modules.splice(i, 1)
                    i--
                }
            }
        }
        if (routers.Modules.length == 0) {
            // 子系统根结点没有设置 hide: true,
            // 但所有子模块 和 链接 均设置为 hide: true,
            return {}
        }
    } else {
        // 子系统根结点设置 hide: true,
        return {}
    }

    return routers
}

function GetRouters(routers) {
    // return FormatRouters(routers)
    return FormatRouters(tools.clone(routers, false))
}

function GetModels(models) {
    // return FormatModels(models)
    return FormatModels(tools.clone(models, false))
}

export default {
    IsRouters,
    IsPath,
    GetRouters,
    GetModels,
}
