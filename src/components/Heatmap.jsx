import React from 'react';
import Plotly from 'react-plotly.js';

const Heatmap = ({ plotData }) => {
  if (!plotData || !plotData.data || !plotData.layout) {
    return <p>No hay datos disponibles para el gráfico.</p>;
  }

  return (
    <div>
      <Plotly
        data={plotData.data}
        layout={{
          ...plotData.layout,
          width: 800,
          height: 600,
          margin: { t: 50, b: 100, l: 100, r: 50 },
          title: plotData.layout.title || 'Matriz de Correlación',
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Heatmap;