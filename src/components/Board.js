import React, { Component } from 'react';

import Row from './Row';

class Board extends Component {
  state = {
    rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
  }

  render() {
    const {
      rows,
    } = this.state;

    const {
      pieces,
    } = this.props;

    return (
      <div className="Board">
        {rows.map((row, index) => {
          const evenRow = index % 2 === 0;
          return (
            <Row
              key={index}
              evenRow={evenRow}
              pieces={pieces}
              rowLabel={row}
            />
          )
        })}
      </div>
    )
  }
}

export default Board;
