const styles = {
    "mission.levelname": "<color=#FFDE00>{0}</color>",
    "mission.number": "<color=#FFDE00>{0}</color>",
    "lv.item": "<color=#FFFFFF>{0}</color>",
    "lv.rem": "<color=#FFFFFF>{0}</color>",
    "lv.fs": "<color=#FF0000>{0}</color>",
    "lv.sp": "<color=#fd4600>{0}</color>",
    "tu.kw": "<color=#0098DC>{0}</color>",
    "tu.imp": "<color=#FF0000>{0}</color>",
    "cc.vup": "<color=#0098DC>{0}</color>",
    "cc.vdown": "<color=#FF6237>{0}</color>",
    "cc.rem": "<color=#F49800>{0}</color>",
    "cc.kw": "<color=#00B0FF>{0}</color>",
    "cc.pn": "<i>{0}</i>",
    "cc.talpu": "{0}",
    "ba.vup": "<color=#0098DC>{0}</color>",
    "ba.vdown": "<color=#FF6237>{0}</color>",
    "ba.rem": "<color=#F49800>{0}</color>",
    "ba.kw": "<color=#00B0FF>{0}</color>",
    "ba.pn": "<i>{0}</i>",
    "ba.talpu": "<color=#F49800>{0}</color>",
    "eb.key": "<color=#00FFFF>{0}</color>",
    "eb.danger": "<color=#FF0000>{0}</color>",
    "ro.get": "<color=#0098DC>{0}</color>",
    "ro.lose": "<color=#C82A36>{0}</color>",
    "rolv.rem": "<color=#FF4C22>{0}</color>",
    "rc.title": "<color=#FFFFFF>{0}</color>",
    "rc.subtitle": "<color=#FFC90E>{0}</color>",
    "rc.em": "<color=#FF7F27>{0}</color>",
    "rc.eml": "<color=#32CD32>{0}</color>",
    "ga.title": "<color=#FFFFFF>{0}</color>",
    "ga.subtitle": "<color=#FFC90E>{0}</color>",
    "ga.up": "<color=#FF7F27>{0}</color>",
    "ga.adgacha": "<color=#00C8FF>{0}</color>",
    "ga.nbgacha": "<color=#00DDBB>{0}</color>",
    "ga.limadgacha": "<color=#FF7E1F>{0}</color>",
    "ga.percent": "<color=#FFD800>{0}</color>",
    "ga.attention": "<color=#FF3126>{0}</color>",
    "limtedga.title": "<color=#FFFFFF>{0}</color>",
    "limtedga.subtitle": "<color=#FFC90E>{0}</color>",
    "limtedga.up": "<color=#FF7F27>{0}</color>",
    "limtedga.21": "<color=#D7BCFF>{0}</color>",
    "limtedga.percent": "<color=#FFD800>{0}</color>",
    "limtedga.attention": "<color=#E1322C>{0}</color>",
    "limtedga.lattention": "<color=#FF9E58>{0}</color>",
    "vc.newyear10": "<color=#FF3823>{0}</color>",
    "vc.adgacha": "<color=#0098DC>{0}</color>",
    "vc.attention": "<color=#FFD800>{0}</color>",
    "act.missiontips": "<color=#d9bd6a>{0}</color>",
    "act.spreward": "<color=#FF5001>{0}</color>",
    "act.timelimit": "<color=#ffe300>{0}</color>",
    "vc.text": "<color=#898989>{0}</color>",
    "vc.endtime": "<color=#ff0327>{0}</color>"
}

const stylesKeys = Object.keys(styles);
const stylesValues = Object.values(styles);

export function formatText(format1: string, format2: string, text: string, target?: number, preSymbol?: string, percentMult?: string, postSymbol?: string): string {
    const key = format1 + '.' + format2
    const idx = stylesKeys.findIndex(x => x === key);
    const color = stylesValues[idx]
    const transformedTargetData = (percentMult && target) ? (Math.abs(target) * 100).toFixed(1) : target
    if (color.startsWith("<color=")) {
        const textColor = color.slice(7, 14);
        if (target) {
            return `<span style="color: ${textColor}">${preSymbol ? preSymbol : ''}${transformedTargetData || text}${percentMult && '%'}${postSymbol ? postSymbol : ''}</span>`
        } else {
            return `<span style="color: ${textColor}">${preSymbol ? preSymbol : ''}${text}${postSymbol ? postSymbol : ''}</span>`
        }
    } else if (color.startsWith("<i")) {
        if (target) {
            return `<i>${preSymbol ? preSymbol : ''}${transformedTargetData || text}${percentMult && '%'}${postSymbol ? postSymbol : ''}</i>`
        } else {
            return `<i>${preSymbol ? preSymbol : ''}${preSymbol ? preSymbol : ''}${text}${postSymbol ? postSymbol : ''}</i>`
        }
    } else {
        return `${transformedTargetData || text}${percentMult && '%'}${postSymbol ? postSymbol : ''}`
    }
}

export default null;