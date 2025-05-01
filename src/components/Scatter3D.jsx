import React from 'react';
import Plotly from 'react-plotly.js';

const Scatter3D = ({ plotData }) => {
  if (!plotData || !plotData.data || !plotData.layout) {
    return <p>No hay datos disponibles para el gráfico 3D.</p>;
  }

  return (
    <div>
      <Plotly
        data={plotData.data}
        layout={{
          ...plotData.layout,
          width: 800,
          height: 600,
          margin: { t: 50, b: 50, l: 50, r: 50 },
          title: plotData.layout.title || 'Gráfico de Dispersión 3D (PCA)',
          scene: {
            xaxis: { title: 'PCA1' },
            yaxis: { title: 'PCA2' },
            zaxis: { title: 'PCA3' },
          },
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Scatter3D;