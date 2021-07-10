import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const PORT = require('../config');

export default function Index() {

    const [productsExample, setProductsExample] = useState(null);

    useEffect(() => {
        Axios.get(PORT() + '/api/product')
            .then((response) => setProductsExample(response.data))
            .catch((err) => console.error(err))
    }, [])

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
                            <tr key={i}>
                                <td>{element.id}</td>
                                <td>{element.nombre}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}