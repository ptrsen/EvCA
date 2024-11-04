import React, { useEffect, useState, useRef} from 'react';
import { Input, InputNumber, Button } from 'antd';
import AdjacencyMatrixHeatmap from '../components/graphs/AdjacencyMatrixHeatmap';
import * as tf from '@tensorflow/tfjs';

//import { evaluate } from 'mathjs';
import { create, all } from 'mathjs'
const math = create(all)

const Page1 = () => {


    const [matrixTensor, setMatrixTensor] = useState(null); 
    const matrixTensorRef = useRef(matrixTensor);  // useRef to store the latest matrixTensor

    const [size, setSize] = useState(6); // number of nodes

    /*
    const [expression, setExpression] = useState('');
    const [scope, setScope] = useState(null);

    const [step, setStep] = useState(0); 
    const [delay, setDelay] = useState(1000); // 1 seg

    const [isPaused, setIsPaused] = useState(true);
    const [intervalId, setIntervalId] = useState(null);
    */
    

    // Generate initial adjacency matrix
    const generateAdjacencyMatrix = (size) => {
        return tf.randomUniform([size, size], 0, 256, 'float32');
    };


    
    /*
     // convert expression indexing, [0,0] to [1,1], [1,0] to [2,1]
    const convertToOneBasedIndexing = (expr) => {
        return expr.replace(/\[(\d+),(\d+)\]/g, (_, row, col) => {
            return `[${parseInt(row, 10) + 1},${parseInt(col, 10) + 1}]`;
        });
    };

    // Update Functions
    const updateFunction = (matrix) => {
        let node_exp;
        let code_exp;  

        try {
            console.log('Expression:', expression);
            // Parse the expression
            node_exp = math.parse(convertToOneBasedIndexing(expression));
            // Compile the expression
            code_exp = node_exp.compile();        
        } catch (error) {
            // Show an error dialog if parsing or compiling fails
            alert('Error parsing or compiling the expression: ' + error.message);
            return matrix; // Return the original matrix in case of an error
        }

        try {
            // Map the matrix values with the evaluated expression
            return matrix.map(row =>
                row.map(cell => {
                    scope.x = cell;
                    const newCell = code_exp.evaluate(scope);
                    return newCell;   
                })
            );
        } catch (error) {
            // Show an error dialog if evaluation fails
            alert('Error evaluating the expression: ' + error.message);
            return matrix; // Return the original matrix in case of an error
        }
    };

    const inverseUpdateFunction= (matrix) => {
        return matrix.map(row => row.map(cell => cell ^ 1));  //  Flip back
    };

    // Function to update adjacency matrix
    const updateMatrix = (matrix, step, direction) => {
        let updatedMatrix;
        if (direction === 'forward') {
            updatedMatrix = updateFunction(matrix);
        } else if (direction === 'backward') {
            updatedMatrix = inverseUpdateFunction(matrix); 
        }
        setMatrixData(updatedMatrix);
        setStep(step);
        scope.A = math.matrix(updatedMatrix);
    };


    // Buttons actions
    const handlePlay = () => {
        setIsPaused(false);
        if (!intervalId) {
            const id = setInterval(() => {
                setStep(prevStep => {
                    updateMatrix(matrixRef.current, prevStep + 1, 'forward');
                    return prevStep + 1;
                });
            }, delay); 
            setIntervalId(id);
        }
    };

    const handlePause = () => {
        setIsPaused(true);
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const handleStepForward = () => {
        updateMatrix(matrixData, step + 1, 'forward');
    };

    const handleStepBackward = () => {
        if (step > 0) {
            updateMatrix(matrixData, step - 1, 'backward');
        }
    };
    */

    useEffect(() => {
        const initialMatrixTensor = generateAdjacencyMatrix(size);
        setMatrixTensor(initialMatrixTensor)
       // const initalScope = { x: 0, A: math.matrix(initialMatrix) }
       // setScope(initalScope);
    }, [size]);

    useEffect(() => {
        matrixTensorRef.current = matrixTensor; // Keep the ref updated with the latest matrixData
    }, [matrixTensor]);

    return (
        <div>
            <h1>CA</h1>
            {/* Input field for the update function expression 
            <div>
                <label>
                    Update Function:
                    <Input
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        placeholder="Update Function (e.g., x^2 + 2*x + 1, A[0,0])"
                    />
                </label>
            </div>

            <div>
                <label>
                    Delay:
                    <InputNumber
                        value={delay}
                        onChange={(value) => setDelay(value)}
                    />
                </label>
                <label>
                    Steps:
                    <InputNumber  
                        value={step} 
                        onChange={(value) => {
                            const newStep = Number(value);
                            setStep(newStep);
                            const direction = newStep > step ? 'forward' : 'backward';
                            updateMatrix(matrixData, newStep, direction);
                        }}
                        disabled={!isPaused} 
                    />
                </label>
                <Button onClick={handlePlay} disabled={!isPaused}>Play</Button>
                <Button onClick={handlePause} disabled={isPaused}>Pause</Button>
                <Button onClick={handleStepForward}  disabled={!isPaused || intervalId !== null}>Step Forward</Button>
                <Button onClick={handleStepBackward} disabled={!isPaused || step <= 0 || intervalId !== null}>Step Backward</Button>
            </div>
            */}

            <AdjacencyMatrixHeatmap matrixTensor={matrixTensor} />
        </div>
    );
};

export default Page1;