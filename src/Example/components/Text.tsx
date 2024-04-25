import { DNDIndicator, DNDItem } from "../../../lib/main"
import { ListInterface } from "../Example"
import DragSvgIcon from '../icons/DragSvgIcon.svg'

export const Text = ({item}: {item: ListInterface}) => {
  return (
    <DNDItem id={item.id.toString()}>
      <div className="col-6 mt-3">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <img
            src={DragSvgIcon}
            style={{width: '20px', cursor: 'pointer', marginRight: '8px'}}
          />
          <input type="text" className="form-control" disabled placeholder={item.label} />
        </div>
        
        <DNDIndicator
          position='left'
          id={item.id.toString()}
          style={{width: '100px'}}
          hoveredStyle={{width: '150px'}}
        />
            
        <DNDIndicator
          position='right'
          id={item.id.toString()}
          style={{width: '100px'}}
          hoveredStyle={{width: '150px'}}
        />
      </div>
    </DNDItem>
  )
}
