
function Cource(props) {
    const {image, name, description, children}=props;
  return ( 
    <div className='card'>
        {children}
        <img src={image} alt={name}/>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
    );}
{/* //     <div className='card'>
//         <img src={css} alt='CSS'/>
//         <h1>CSS</h1>
//         <p>Cascading Style Sheets</p>
//     </div>
//     <div className='card'>
//         <img src={js} alt='JavaScript'/>
//         <h1>JavaScript</h1>
//         <p>Programming Language</p>
//     </div>
//     <div className='card'>
//         <img src={react} alt='React'/>
//         <h1>React</h1>
//         <p>JavaScript Library</p>
//     </div>
//     <div className='card'>
//         <img src={node} alt='Node.js'/>
//         <h1>Node.js</h1>
//         <p>JavaScript Runtime</p>
//     </div>
//   </> */}


export default Cource;