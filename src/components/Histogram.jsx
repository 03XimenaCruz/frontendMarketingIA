import React from 'react';
import Plotly from 'react-plotly.js';

const Histogram = ({ plotData }) => {
  if (!plotData || !plotData.data || !plotData.layout) {
    return <p>No hay datos disponibles para el histograma.</p>;
  }

  return (
    <div>
      <Plotly
        data={plotData.data}
        layout={{
          ...plotData.layout,
          width: 600,
          height: 400,
          margin: { t: 50, b: 50, l: 50, r: 50 },
          title: plotData.layout.title || `Histograma de Clúster`,
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Histogram;