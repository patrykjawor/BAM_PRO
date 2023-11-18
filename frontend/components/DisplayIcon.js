import {AntDesign, FontAwesome, FontAwesome5, Entypo, Feather, Fontisto} from '@expo/vector-icons';

export default function DisplayIcon ({iconString, size = 32, color = "green"}) {
    if(iconString === undefined || iconString === null)
        return <></>
    
    const ico = (iconString.constructor === "str".constructor) ? JSON.parse(iconString) : iconString;

    if(ico.type === "fa") 
        return <FontAwesome name={ico.name} size={size} color={color}/>
    else if(ico.type === "ad")
        return <AntDesign name={ico.name} size={size} color={color}/>
    return <></>
}