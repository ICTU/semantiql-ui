import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from 'lodash'

const objectify = (k, data) =>  {
    return _.every(data, x => _.isObject(x))? data : data.map(v => _.set({}, k, v))
}

const renderSubcomponents = keys => row => {
    return keys.map(k => renderSubcomponent(k, objectify(k, row.original[k])))
}

function renderSubcomponent(name, data) {
    return (
        <div style={{ padding: 20 }}>
            <Table data={data} name={name} 
                defaultPageSize={data.length} 
                filterable={false} 
                showPagination={false} />
        </div>
    )
}

function Table({ data, name, defaultPageSize = 20, showPagination = true, filterable = true}) {
    const allKeys = _.pull(Object.keys((data || [{}])[0]), '__typename')
    const objectKeys = _.compact(allKeys.map(key => _.isObject(data[0][key]) ? key : null))
    const keys = _.difference(allKeys, objectKeys)

    const columns = keys.map(key => ({ Header: key, accessor: key }))

    return (
        <ReactTable
            filterable={filterable}
            defaultFilterMethod={(filter, row) => `${row[filter.id]}`.match(`${filter.value}`)}
            showPagination={showPagination}
            columns={[{Header: name, columns}]}
            data={data || []}
            defaultPageSize={defaultPageSize}
            noDataText="Data is coming..."
            className="-striped -highlight"
            SubComponent={objectKeys.length ? renderSubcomponents(objectKeys) : null} />
    );
}

function BasicTable(props) {    
    const { data, collectionName } = props
    const myData = data[collectionName] || [{}]
    return Table({ data: myData, name: collectionName})
}

export default BasicTable
