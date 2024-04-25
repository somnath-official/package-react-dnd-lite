import { useEffect, useState } from "react"
import { IElementDrop } from "../../lib/main"
import { DNDContainer } from "../../lib/main"
import { RenderLists } from "./components/RenderLists"

export interface ListInterface {
    id: number
    type: 'text' | 'long-text' | 'dropdown'
    label: string
}

export const Example = () => {
    const [lists, setLists] = useState<Array<ListInterface>>([])

    useEffect(() => {
        setLists([
            {id: 1, type: 'text', label: '1'},
            {id: 2, type: 'text', label: '2'},
            {id: 3, type: 'long-text', label: '3'},
            {id: 4, type: 'text', label: '4'},
            {id: 5, type: 'long-text', label: '5'},
            {id: 6, type: 'dropdown', label: '6'},
        ])
    }, [])

    const onDrop = (data: IElementDrop) => {
        console.log(data)
    }

    return (
        <div className='container bg-secondary p-5 rounded'>
            <DNDContainer onDrop={onDrop}>
                <div className="row">
                {
                    lists.map((item) => <RenderLists item={item} key={item.id} />)
                }
                </div>
            </DNDContainer>
        </div>
    )
}
