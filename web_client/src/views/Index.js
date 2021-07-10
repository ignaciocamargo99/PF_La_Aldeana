import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Index() {

    const [productsExample, setProductsExample] = useState(null);

    useEffect(() => {
        Axios.get('http://localhost:3001/api/product')
            .then((response) => setProductsExample(response.data))
            .catch((err) => console.error(err))
    }, [])

    console.log(productsExample);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">First</th>
                </tr>
            </thead>
            <tbody>
                {
                    productsExample?.map((element, i) => {
                        return (
                            <tr key={i} key={i}>
                                <td scope="row">{element.id}</td>
                                <td>{element.nombre}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}