import { ListInterface } from "../Example"
import { DropDown } from "./DropDown"
import { LontText } from "./LontText"
import { Text } from "./Text"

export const RenderLists = ({item}: {item: ListInterface}) => {
    switch(item.type) {
        case 'text':
            return (
                <Text item={item}/>
            )
        case 'long-text':
            return (
                <LontText item={item} />
            )
        case 'dropdown':
            return (
                <DropDown item={item} />
            )
    }
}