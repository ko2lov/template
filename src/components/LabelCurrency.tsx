


export default function LabelCurrency({value}: {value : string}) {

    const label = ["КУРС ДОЛЛАРА, $/₽","КУРС ЕВРО, €/₽","КУРС ЮАНЯ, ¥/₽"]
    let current: string = ''
    switch (value) {
        case '$':
            current = label[0]
            break;
    
        case "€":
            current = label[1]
            break;
    
        case "¥":
            current = label[2]
            break;
    
        default:
            break;
    }

    return <h1>
        {current}
    </h1>
}