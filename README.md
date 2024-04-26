# React DND Lite
Add drag and drop feature in your react app with minimal configuration with **react-dnd-lite**.

### Installation
Using NPM
```console
$ npm install react-dnd-lite
```

Using YARN
```console
$ yarn add react-dnd-lite
```

### Basic concepts
  <dl>
    <dt>DNDContainer -</dt>
  </dl>
  <dl>
  It is a wrapping element that handles all the drag and drop state management and give access to <code>onDrop</code> event. It internally uses react <code>createContext</code> api. Wrap your parent component inside the <code>DNDContainer</code> like so
  </dl>

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

<dl>
  <dt>DNDItem - </dt>
</dl>
<dl>
  It handles all the magic. <code>DNDItem</code> converts the children to a draggable item.
</dl>

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

> <span style="color: red;">*</span> **Note:** DNDItem accepts only HTMLElement as direct children. It may not work properly for React component or React Fragment as direct children.

### Advance features

<dl>
  <dt>DNDHandler -</dt>
</dl>
<dl>
  It allows user to add drag handler to DNDItem. Wrap your handler element with this component like so...
</dl>

> Test.tsx
```js
import { DNDHandler, DNDItem } from "react-dnd-lite"

export const Test = () => {
  return (
    <div className="container">
      <DNDItem id="1">
        <div className="box box-1">
          <span>Box 1</span>
          
          <DNDHandler id="1">
            <button>Drag me</button>
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
![](/public/2024-04-26%2013-05-10.gif)
