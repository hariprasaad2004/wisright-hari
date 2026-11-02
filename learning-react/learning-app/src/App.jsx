import './App.css'
import Cource from './cource.jsx'
import HTML from './assets/html.png'
import CSS from './assets/css.png'
import JS from './assets/js.jpg'
import React from './assets/react.png'
import Node from './assets/node.png'


function App() {

  return (<>
    <Cource name="HTML" description="HyperText Markup Language" image={HTML} > <h1>HTML new</h1> </Cource> 

    <Cource name="CSS" description="Cascading Style Sheets" image={CSS}> <h1>CSS new</h1> </Cource> 

    <Cource name="JavaScript" description="Programming Language"image={JS}> <h1>JavaScript new</h1> </Cource>

    <Cource name="React" description="JavaScript Library"image={React}> <h1>React new</h1><p>JavaScript Library</p></Cource> 
    
    <Cource name="Node.js" description="JavaScript Runtime"image={Node}> <h1>Node.js new</h1> </Cource>


  </>)
}
export default App
