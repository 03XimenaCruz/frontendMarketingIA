import React from 'react';

// Columnas que queremos mostrar en la tabla
const desiredColumns = [
    'ORDERNUMBER',
    'QUANTITYORDERED',
    'PRICEEACH',
    'ORDERLINENUMBER',
    'SALES',
    'ORDERDATE',
    'STATUS',
    'QTR_ID',
    'MONTH_ID',
    'YEAR_ID',
    'ADDRESSLINE1',
    'ADDRESSLINE2',
    'CITY',
    'STATE',
    'POSTALCODE',
    'COUNTRY',
    'TERRITORY',
    'CONTACTLASTNAME',
    'CONTACTFIRSTNAME',
    'DEALSIZE',
];

const DataTable = ({ data }) => {
    // Si no hay datos, mostramos un mensaje
    if (!data || data.length === 0) {
        return <p>No hay datos disponibles.</p>;
    }

    // Obtener las columnas del primer objeto de datos y filtrarlas
    const columns = Object.keys(data[0]).filter((col) =>
        desiredColumns.includes(col)
    );

    // Reordenar las columnas según el orden de desiredColumns
    const orderedColumns = desiredColumns.filter((col) => columns.includes(col));

    return (
        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {orderedColumns.map((column) => (
                            <th
                                key={column}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '8px',
                                    backgroundColor: '#f2f2f2',
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {orderedColumns.map((column) => (
                                <td
                                    key={column}
                                    style={{
                                        border: '1px solid #ddd',
                                        padding: '8px',
                                        textAlign: 'center',
                                    }}
                                >
                                    {row[column] !== null && row[column] !== undefined
                                        ? row[column].toString()
                                        : '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;