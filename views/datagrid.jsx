import React from 'react';
import DataGrid from 'react-data-grid';

const columns = [{ key: 'id', name: 'ID' }, { key: 'title', name: 'Title' }];
const rows = [{ id: 1, title: 'Title 1' }];
const rowGetter = rowNumber => rows[rowNumber];

function GetGrid(props) {
    return <DataGrid
        columns={columns}
        rowGetter={rowGetter}
        rowsCount={rows.length}
        minHeight={500} />;
}

module.exports = GetGrid;
