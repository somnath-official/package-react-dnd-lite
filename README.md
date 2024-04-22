# React DND Lite
---
Add drag and drop feature in your react app with minimal configuration with **react-dnd-lite**.

## Installation
```console
$ npm install react-dnd-lite
```

## Basic concepts
DNDContainer
: It is a wrapping element that handles all the drag and drop state management and give access to `onDrop` event. It internally uses `createContext` api. Wrap your parent component inside the `DNDContainer` like so

> App.tsx
```js
import { DNDContainer, IElementDrop } from 'react-dnd-lite'
import { Test } from './components/Test'

function App() {
  const onDrop = (e: IElementDrop) => {
    console.log(e)
  }
  
  return (
    <DNDContainer onDrop={onDrop}>
      <Test />
    </DNDContainer>
  )
}

export default App

```

DNDItem
: It handles all the magic. `DNDItem` converts the children to a draggable item.

> Test.tsx
```js
import { DNDItem } from "react-dnd-lite"

export const Test = () => {
  return (
    <div className="container">
      <DNDItem id="1">
        <div className="box box-1">Box 1</div>
      </DNDItem>
      <DNDItem id="2">
        <div className="box box-2">Box 2</div>
      </DNDItem>
    </div>
  )
}
```
> `*`Note: `DNDItem` accepts only HTMLElement as direct children. It will not work for `React component` or `React Fragment` as direct children.