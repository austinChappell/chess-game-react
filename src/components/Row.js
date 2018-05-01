import React, { Component } from 'react';

import Square from './Square';

class Row extends Component {
  state = {
    columns: ['1', '2', '3', '4', '5', '6', '7', '8'],
  }

  render() {
    const {
      columns,
    } = this.state;

    const {
      evenRow,
      pieces,
      rowLabel,
    } = this.props;

    return (
      <div className="Row">
        {columns.map((col, index) => {
          const evenCol = index % 2 === 0;
          const dark = evenRow !== evenCol;
          const columnLabel = String(index + 1);
          const piece = pieces.find(p => {
            const foundRow = p.row === rowLabel;
            const foundCol = p.column === columnLabel;
            return foundRow && foundCol;
          });

          return (
            <Square
              key={index}
              columnLabel={columnLabel}
              dark={dark}
              rowLabel={rowLabel}
              piece={piece ? piece : null}
            />
          )
        })}
      </div>
    )
  }
}

export default Row;
