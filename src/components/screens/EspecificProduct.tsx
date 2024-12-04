import withAuth from '../contexts/AuthContext';

function EspecificProduct (){
    return(
        <div>
            <h1>produto específico</h1>
        </div>
    )
}
export default withAuth(EspecificProduct);