import { DNDHandler, DNDIndicator, DNDItem } from "../../../lib/main"
import { ListInterface } from "../Example"
import DragSvgIcon from '../icons/DragSvgIcon.svg'

export const DropDown = ({item}: {item: ListInterface}) => {
  return (
    <DNDItem id={item.id.toString()}>
      <div className="col-6 mt-3">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <DNDHandler id={item.id.toString()}>
            <img
              src={DragSvgIcon}
              style={{width: '20px', cursor: 'pointer', marginRight: '8px'}}
            />
          </DNDHandler>
          <select className="form-control" disabled value=''>
            <option>First</option>
            <option>Second</option>
            <option>Third</option>
          </select>
        </div>

        <DNDIndicator
          position='left'
          id={item.id.toString()}
          style={{width: '100px', backgroundColor: 'green'}}
          hoveredStyle={{width: '150px', backgroundColor: 'red'}}
        />
            
        <DNDIndicator
          position='right'
          id={item.id.toString()}
          style={{width: '100px', backgroundColor: 'green'}}
          hoveredStyle={{width: '150px', backgroundColor: 'red'}}
        />
      </div>
    </DNDItem>
  )
}
