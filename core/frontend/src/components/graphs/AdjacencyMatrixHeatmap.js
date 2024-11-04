import React from 'react';
import Plot from 'react-plotly.js';
import * as tf from '@tensorflow/tfjs';

const AdjacencyMatrixHeatmap = ({matrixTensor}) => {
    
    // Display loading if is empty
    if (!matrixTensor) {
        return <div>Loading...</div>;
    }

     // Normalize Matrix Tensor 
    const normalizedMatrixTensor = (matrixTensor) => {
        const minVal = matrixTensor.min();
        const maxVal = matrixTensor.max();
        const normalizedMatrixTensor = matrixTensor.sub(minVal).div(maxVal.sub(minVal));
        return normalizedMatrixTensor
    };

    // Convert to regular JavaScript array to graph
    const matrixJs = matrixTensor.arraySync();
    const nomMatrixJs = normalizedMatrixTensor(matrixTensor).arraySync();
    

    return (
        <Plot
            data={[
                {
                    z: nomMatrixJs,
                    type: 'heatmap',
                    colorscale: 'Greys', // built-in gradient from white to black
                    reversescale: true,  // Invert the Greys scale (from black to white)
                    showscale: true,
                    zmin: 0, 
                    zmax: 1,
                }
            ]}
            layout={{
                annotations: matrixJs.flatMap((row, i) =>
                    row.map((value, j) => ({
                        x: j,
                        y: i,
                        text: value.toFixed(2),
                        xref: 'x',
                        yref: 'y',
                        showarrow: false,
                        font: {
                            color: nomMatrixJs[i][j] > 0.5 ? 'white' : 'black'
                        },
                    }))
                ),
                xaxis: { 
                    title: 'Node', 
                    side: 'top', 
                    automargin: true,
                    showgrid: true,
                },
                yaxis: { 
                    title: 'Node', 
                    autorange: 'reversed', 
                    automargin: true,
                    showgrid: true,
                },
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 50,
                },
                autosize: true,
            }}
            config={{
                responsive: true,     // Make the chart responsive
                displayModeBar: true, // Show the modebar
                displaylogo: false,   // Hide the Plotly logo 
                modeBarButtonsToRemove: ['Pan','zoom2d', 'zoomIn2d', 'zoomOut2d', 'resetScale2d'], // Remove built-in buttons   
            }}
            style={{ width: '100%', height: '100%' }} // Set to fill the container
        />
    );
};

export default AdjacencyMatrixHeatmap;
