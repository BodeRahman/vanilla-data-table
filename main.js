const columnDefs = [
  
];
const gridOptions = {

    defaultColDef: {
        sortable: true,
        filter: 'agTextColumnFilter',
        resizable: true,
        headerCheckboxSelection: isFirstColumn,
        checkboxSelection: isFirstColumn,
    },
    
    suppressRowClickSelection: true,
    rowSelection: 'multiple',
    columnDefs: columnDefs,
    enableSorting: true,
    enableFilter: true,
    pagination: true,
};

function isFirstColumn(params) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

const eGridDiv = document.querySelector('#all-tab-pane');

new agGrid.Grid(eGridDiv, gridOptions);

function dynamicallyConfigureColumnsFromObject(anObject){
    const colDefs = gridOptions.api.getColumnDefs();
    colDefs.length=0;
    const keys = Object.keys(anObject)
    keys.forEach(key => colDefs.push({field : key}));
    gridOptions.api.setColumnDefs(colDefs);
}

// simple JSON example

// fetch('https://cornie-assessment.herokuapp.com/users/6iC46vxqNsvax5y').then(function (response) {
//     return response.json();
// }).then(function (data) {
//     dynamicallyConfigureColumnsFromObject(data[0])
//     gridOptions.api.setRowData(data);
// })

// SWAPI example

fetch('https://cornie-assessment.herokuapp.com/users/6iC46vxqNsvax5y',
    { 
        method: 'GET',
        headers: {
                    'Content-Type': 'application/json'
                }
    }
).then(function (response) {
    return response.json();
}).then(function (data) {
    dynamicallyConfigureColumnsFromObject(data.data[0])
    gridOptions.api.setRowData(data.data);
})
