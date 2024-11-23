// MLM salesman
const args = process.argv.slice(2);
const totalRows = Number(args[0]) || 5;
const totalCols = Number(args[1]) || 6;
const numberOfIterations = Number(args[2]) || 1000;


function startProgram(rows, cols, runs) {
    if (totalRows <= 0 || totalCols <= 0 || numberOfIterations <= 0) 
        {
            console.error("Please use a number like 1, 5 or 10 :D")
        }   
    if (isNaN(totalRows) === true || isNaN(totalCols) === true || isNaN(numberOfIterations === true))
    {
        console.error("please insert numbers!")
    }
    const allowedMovements = [
        [-1, 0],
        [1, 0], 
        [0, -1],
        [0, 1], 
    ];

    function genRandomMovement(x) {
        return Math.floor(Math.random() * x);
    }

    function startConverting() {
        const grid = [];
        for(let i = 0; i < rows; i++) {
            grid.push(new Array(cols).fill(0));
        }
        grid[0][0] = 1;

        const salesman = [[0,0]];
        let totalSalesman = 1;
        let totalHours = 0;

            while (totalSalesman < rows * cols) {
                const newConvertedSalesman = [];
                for( const [x, y] of salesman) {
                    const possibleMovements = allowedMovements.map(([dx, dy]) => [x +dx, y + dy])
                        .filter(([nx, ny]) => nx >= 0 && nx < rows && ny >= 0 && ny < cols);

                    if (possibleMovements.length > 0) {
                        const [nx, ny] = possibleMovements[genRandomMovement(possibleMovements.length)];
                        if (grid[nx][ny] === 0) {
                            grid[nx][ny] = 1;
                            totalSalesman++;
                            newConvertedSalesman.push([nx,ny]);
                    }
                }
            }
            salesman.push(...newConvertedSalesman);
            totalHours++;
        }
        return totalHours;
    }
    let totalTime = 0;
    for (let i = 0; i < runs; i++) 
        {
        totalTime += startConverting();
    }
    return totalTime / runs;
}

const averageHours = startProgram(totalRows , totalCols , numberOfIterations);
console.log(`The average hours it took to convert (${totalRows }x${totalCols } grid, ${numberOfIterations} iterations): ${averageHours.toFixed(2)} hours`);
