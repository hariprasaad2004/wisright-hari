import {useState} from 'react';


function Cource(props) {
    const {image, name, description}=props;

      // let purchased = false;
      const [isPurchased, setIsPurchased] = useState(false);

// let handleIncrement = () => {
//     setCount(count + 1);
// }
      
//         let [count, setCount] = useState(0);
        return ( 


    <div className='card'>
        <img src={image} alt={name}/>
        <h1>{name}</h1>
        <p>{description}</p>
        <button onClick={() => setIsPurchased(!isPurchased)}>
            {isPurchased ? "Unenroll" : "Enroll"}
        </button>
        <p>{isPurchased ? "Enrolled" : "Not Enrolled"}</p>


         {/* <button onClick={()=>setCount(count - 1)}>-</button>
        <span> { count } </span>


        <button onClick={handleIncrement}>+</button> */}
        <button onClick={props.delete}>Delete</button>
        
    </div>
    );}


export default Cource;