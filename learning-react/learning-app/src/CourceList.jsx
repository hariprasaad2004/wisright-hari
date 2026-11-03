import Cource from './cource.jsx'
import HTML from './assets/html.png'
import CSS from './assets/css.png'
import JS from './assets/js.jpg'
import React from './assets/react.png'
import Node from './assets/node.png'

function CourceList() {

    const cources = [
        {
            name: "HTML",
            description: "HyperText Markup Language",
            image: HTML
        },
        {
            name: "CSS",
            description: "Cascading Style Sheets",
            image: CSS
        },
        {
            name: "JavaScript",
            description: "Programming Language",
            image: JS
        },
        {
            name: "React",
            description: "JavaScript Library",
            image: React
        },
        {
            name: "Node.js",
            description: "JavaScript Runtime",
            image:Node
        }

    ]

    const courceList = cources.map((cource, index) => {
        return <Cource key={index} name={cource.name} description={cource.description} image={cource.image} />
    })
    

    return (<>
    {courceList}
    </>


    );

}



export default CourceList;
