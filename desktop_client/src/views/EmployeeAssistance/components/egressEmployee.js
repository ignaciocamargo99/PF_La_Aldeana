import swal from '@sweetalert/with-react';

export default function egressEmployee(nameEmployee) {

    return (
        swal(
            <div>
                <h1 style={{ fontWeight: 'bold' }}>Hasta luego {nameEmployee}</h1>
                <hr />
                <h2>¡Éxitos!</h2>
            </div>
        )
    );
}