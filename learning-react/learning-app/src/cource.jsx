
function Cource(props) {
    const {image, name, description}=props;
  return ( 


    <div className='card'>
        <img src={image} alt={name}/>
        <h1>{name}</h1>
        <p>{description}</p>

    </div>
    );}


export default Cource;