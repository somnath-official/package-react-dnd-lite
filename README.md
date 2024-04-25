# React DND Lite
Add drag and drop feature in your react app with minimal configuration with **react-dnd-lite**.

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
        <div className="box box-1">Box 1</div>
      </DNDItem>
      <DNDItem id="2">
        <div className="box box-2">Box 2</div>
      </DNDItem>
    </div>
  )
}
```

> Note
> `DNDItem` accepts only HTMLElement as direct children. It will not work for `React component` or `React Fragment` as direct children.