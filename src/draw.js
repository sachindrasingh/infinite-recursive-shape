const pixelEnum = ' -|';

/* Main function to create  is used to add value in Matrix. Start from X and Y
 * @param x {Number} x axis position in Matrix   
 * @param y {Number} y axis position in Matrix   
 * @param width {Number} width    
 * @param Height {Number} Height    
 * @param padding {Number} padding    
 * @return Function || 2 dimensional array
 */
const draw = (width, height, padding) => {
    // Create Array of (n) Height to create Matrix.
    let Matrix = Array(height);
    Matrix = Matrix.fill(0);
    Matrix = Matrix.map((x) => {
        // add column or width in each row to create Matrix.
        return Array(width).fill(0)
    });
    /* fillValue function is used to fill value in Matrix based on given axis.
     * @param x {Number} x axis position in Matrix   
     * @param y {Number} y axis position in Matrix   
     * @param w {Number} width    
     * @param h {Number} Height    
     * @return recursive function || 2 dimensional array
     */
    const fillValue = ({ x, y }, w, h) => {
        // Return genrated Matrix if there is no row or column to fill.
        if (w < 1 || h < 1) {
            return Matrix
        }


        // Fill top and bottom borders (row in Matrix).
        // Start from (curent Axis) till (Axis + Remaining and inner width) 
        for (let j = y; j < y + w; ++j) {
            // Fill value top border
            Matrix[x][j] = 1;
            // Fill value bottom border
            Matrix[x + h - 1][j] = 1;
        }

        // Fill left and right borders (column in Matrix).
        // Start from (curent Axis) till (Axis + Remaining and inner Height) 
        for (let i = x; i < x + h; ++i) {
            // Fill value right border
            Matrix[i][y] = 2;
            // Fill value left border
            Matrix[i][y + w - 1] = 2;
        }
        // Axis - ( (current Axis + padding) / 2 + 1) to add the padding and (+ 1) is next Axis
        // Width - (width - padding - 2) to add padding and the current borders (Both) 
        // Height - (height - padding - 2) to add padding and the current borders (Both) 
        return fillValue({ x: x + padding / 2 + 1, y: y + padding / 2 + 1 }, w - padding - 2, h - padding - 2)
    }

    // Start filing the matrix (Start from 0 0). 
    return fillValue({ x: 0, y: 0 }, width, height);
}

const drawShape = (width, height, padding) => {
    width = parseInt(width);
    height = parseInt(height);
    padding = parseInt(padding);
    let shape = draw(width, height, padding);
    shape = shape.map((arr) => {
        return arr.map((val) => {
            return pixelEnum[val];
        }).join('')
    }).join('\n');
    return shape;
}

// Condition to create UMD (Universal Module Definition)
if(typeof(window) !== "object") {
    module.exports = {
        draw:draw,
        drawShape: drawShape
    };
}