import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import DataTable from '../components/DataTable';

// Importar la fuente Roboto desde Google Fonts
const loadGoogleFonts = () => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
};

const Home = () => {
    // Estados para los datos de cada visualización
    const [data, setData] = useState([]);
    const [salesTrend, setSalesTrend] = useState(null);
    const [countryBar, setCountryBar] = useState(null);
    const [histogramsOrderNumber, setHistogramsOrderNumber] = useState([]);
    const [histogramsQuantityOrdered, setHistogramsQuantityOrdered] = useState([]);
    const [heatmap, setHeatmap] = useState(null);
    const [pcaScatter, setPcaScatter] = useState(null);
    // Estados para manejo de carga y errores
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Funciones para consumir los endpoints del backend
    const getDataFrame = async () => {
        const response = await axios.get('http://localhost:8000/api/data/dataframe');
        return response.data;
    };

    const getSalesTrend = async () => {
        const response = await axios.get('http://localhost:8000/api/visualizations/sales-trend');
        return response.data;
    };

    const getCountryBar = async () => {
        const response = await axios.get('http://localhost:8000/api/visualizations/country-bar');
        return response.data;
    };

    const getHistograms = async (column) => {
        const response = await axios.get(`http://localhost:8000/api/visualizations/histograms/${column}`);
        return response.data;
    };

    const getCorrelationHeatmap = async () => {
        const response = await axios.get('http://localhost:8000/api/visualizations/correlation-heatmap');
        return response.data;
    };

    const getPCAScatter = async () => {
        const response = await axios.get('http://localhost:8000/api/visualizations/pca-scatter');
        return response.data;
    };

    // useEffect para cargar todos los datos al montar el componente
    useEffect(() => {
        // Cargar la fuente Roboto
        loadGoogleFonts();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Realiza todas las solicitudes en paralelo
                const [df, trend, bar, histOrder, histQuantity, corr, pca] = await Promise.all([
                    getDataFrame(),
                    getSalesTrend(),
                    getCountryBar(),
                    getHistograms('ORDERNUMBER'),
                    getHistograms('QUANTITYORDERED'),
                    getCorrelationHeatmap(),
                    getPCAScatter(),
                ]);

                // Depuración: Imprime los datos recibidos
                console.log('Datos recibidos para la tabla:', df);
                console.log('Primeras 5 filas:', df.slice(0, 5));
                console.log('Datos de sales-trend:', trend);
                console.log('Datos de country-bar:', bar);
                console.log('Datos de histograms (ORDERNUMBER):', histOrder);
                console.log('Datos de histograms (QUANTITYORDERED):', histQuantity);
                console.log('Datos de correlation-heatmap:', corr);
                console.log('Datos de pca-scatter:', pca);

                // Actualiza los estados
                setData(df);
                setSalesTrend(trend);
                setCountryBar(bar);
                setHistogramsOrderNumber(histOrder);
                setHistogramsQuantityOrdered(histQuantity);
                setHeatmap(corr);
                setPcaScatter(pca);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('No se pudieron cargar los datos. Por favor, verifica que el backend esté corriendo.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Se ejecuta solo al montar el componente

    // Estilos CSS
    const styles = {
        container: {
            padding: '30px',
            fontFamily: "Times New Roman, Georgia, Garamond",
            backgroundColor: '#ffff', // Fondo claro
            minHeight: '100vh',
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c3e50', // Color oscuro
            textAlign: 'center',
            marginBottom: '40px',
        },
        sectionTitle: {
            fontSize: '1.8rem',
            fontWeight: '400',
            color: '#2e4053 ', // Color gris oscuro
            textAlign: 'center',
            marginBottom: '20px',
        },
        subSectionTitle: {
            fontSize: '1.3rem',
            fontWeight: '400',
            color: '#7f8c8d', // Color gris claro
            textAlign: 'center',
            marginBottom: '15px',
        },
        section: {
            backgroundColor: ' #d4e6f1', // Fondo blanco para las secciones
            borderRadius: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.17)', // Sombra suave
            padding: '20px',
            marginBottom: '40px',
        },
        centeredPlot: {
            display: 'flex',
            justifyContent: 'center', // Centra horizontalmente
            alignItems: 'center', // Centra verticalmente (opcional)
            width: '100%',
        },
        loading: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#7f8c8d',
        },
        error: {
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#e74c3c', // Color rojo para errores
            marginBottom: '20px',
        },
        histogramsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>MARKETING IA</h1>

            {/* Estado de carga */}
            {loading && <p style={styles.loading}>Cargando datos...</p>}

            {/* Mensaje de error */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Tabla de datos */}
            {!loading && !error && data.length > 0 && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>DataSet</h2>
                    <DataTable data={data} />
                </div>
            )}

            {/* Gráfico de tendencia de ventas */}
            {!loading && !error && salesTrend && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Tendencia de Ventas</h2>
                    <Plot
                        data={salesTrend.data}
                        layout={salesTrend.layout}
                        style={{ width: '100%', height: '400px' }}
                    />
                </div>
            )}

            {/* Gráfico de barras (Ventas por País) */}
            {!loading && !error && countryBar && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Ventas por País</h2>
                    <Plot
                        data={countryBar.data}
                        layout={countryBar.layout}
                        style={{ width: '100%', height: '600px' }}
                    />
                </div>
            )}

            {/* Histogramas por clúster */}
            {!loading && !error && (histogramsOrderNumber.length > 0 || histogramsQuantityOrdered.length > 0) && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Histogramas por Clúster</h2>
                    {/* Fila para ORDERNUMBER */}
                    {histogramsOrderNumber.length > 0 && (
                        <div>
                            <h3 style={styles.subSectionTitle}>Histogramas de ORDERNUMBER</h3>
                            <div style={styles.histogramsGrid}>
                                {histogramsOrderNumber.map((hist, index) => (
                                    <div key={`ordernumber-${index}`}>
                                        <Plot
                                            data={hist.data}
                                            layout={hist.layout}
                                            style={{ width: '100%', height: '300px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Fila para QUANTITYORDERED */}
                    {histogramsQuantityOrdered.length > 0 && (
                        <div style={{ marginTop: '30px' }}>
                            <h3 style={styles.subSectionTitle}>Histogramas de QUANTITYORDERED</h3>
                            <div style={styles.histogramsGrid}>
                                {histogramsQuantityOrdered.map((hist, index) => (
                                    <div key={`quantityordered-${index}`}>
                                        <Plot
                                            data={hist.data}
                                            layout={hist.layout}
                                            style={{ width: '100%', height: '300px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Matriz de correlación */}
            {!loading && !error && heatmap && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Matriz de Correlación</h2>
                    <div style={styles.centeredPlot}>
                        <Plot
                            data={heatmap.data}
                            layout={heatmap.layout}
                            style={{ width: '600px', height: '600px' }} // Ajusta el tamaño para que no sea demasiado grande
                        />
                    </div>
                </div>
            )}

            {/* Gráfico de dispersión 3D (PCA) */}
            {!loading && !error && pcaScatter && (
                <div style={styles.section}>
                    <h2 style={styles.sectionTitle}>Dispersión 3D (PCA)</h2>
                    <Plot
                        data={pcaScatter.data}
                        layout={pcaScatter.layout}
                        style={{ width: '100%', height: '600px' }}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;