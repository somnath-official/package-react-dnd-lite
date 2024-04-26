# React DND Lite
Add drag and drop feature in your react app with minimal configuration using **react-dnd-lite**.

## Installation
Using NPM
```console
$ npm install react-dnd-lite
```

Using YARN
```console
$ yarn add react-dnd-lite
```

## Basic concepts
  **DNDContainer** - It is a wrapping element that handles all the drag and drop state management and give access to <code>onDrop</code> event. It internally uses react <code>createContext</code> api. Wrap your parent component inside the <code>DNDContainer</code> like so

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
<br>

**DNDItem** - It handles all the magic. <code>DNDItem</code> converts the children to a draggable item.

> Test.tsx
```js
import { DNDItem } from "react-dnd-lite"

export const Test = () => {
  return (
    <div className="container">
      <DNDItem id="1">
        <div className="box box-1">
          <span>Box 1</span>
        </div>
      </DNDItem>
      <DNDItem id="2">
        <div className="box box-2">
          <span>Box 2</span>
        </div>
      </DNDItem>
    </div>
  )
}
```

> <sup>*</sup>**Note:** DNDItem accepts only HTMLElement as direct children. It may not work properly for React component or React Fragment as direct children.

## Advance features

**DNDHandler** - It allows user to add drag handler to DNDItem. Wrap your handler element with this component like so...

> Test.tsx
```js
import { DNDHandler, DNDItem } from "react-dnd-lite"
import DragIcon from '../assets/DragIcon.svg'

export const Test = () => {
  return (
    <div className="container">
      <DNDItem id="1">
        <div className="box box-1">
          Box 1

          <DNDHandler id="1">
            <img src={DragIcon} className="drag-icon"/>
          </DNDHandler>
        </div>
      </DNDItem>
      <DNDItem id="2">
        <div className="box box-2">
          Box 2
        </div>
      </DNDItem>
    </div>
  )
}

```
![](/public/DNDHandler.gif)
> <sup>*</sup>**Note:** DNDHandler accepts only HTMLElement as direct children. It may not work properly for React component or React Fragment as direct children.

<br>

**DNDIndicator** - It allows user to add drop indicator to DNDItem. Place DNDIndicator component inside the DNDItem like so...
```js
import { DNDHandler, DNDIndicator, DNDItem } from "react-dnd-lite"
import DragIcon from '../assets/DragIcon.svg'

export const Test = () => {
  return (
    <div className="container">
      <DNDItem id="1">
        <div className="box box-1">
          Box 1

          <DNDHandler id="1">
            <img src={DragIcon} className="drag-icon"/>
          </DNDHandler>
        </div>
      </DNDItem>
      <DNDItem id="2">
        <div className="box box-2">
          Box 2

          <DNDIndicator position="left" id="2" />
          <DNDIndicator position="right" id="2" />
        </div>
      </DNDItem>
    </div>
  )
}
```
![](/public/DNDIndicator.gif)
