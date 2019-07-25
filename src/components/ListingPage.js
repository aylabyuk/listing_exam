import React, { useState } from 'react';
import { Table, Select } from 'antd';
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const { Column, ColumnGroup } = Table;

const GET_VISITS = gql`
    query ($filter: String){
        visits(filter: $filter) {
            id
            datetime
            device
            ip
        }
    }
`

const ListingPage = () => {
    const [filter, setFilter] = useState("today")
    const { loading, data } = useQuery(GET_VISITS, { variables: { filter } });

    const onFilterChange = (value) => {
        setFilter(value)
    }
    
    return (
        <>
         <Select
            defaultValue="today"
            style={{ width: 120, marginBottom: '20px' }}
            onChange={onFilterChange}
        >
            <Select.Option value="today">Today</Select.Option>
            <Select.Option value="yesterday">Yesterday</Select.Option>
            <Select.Option value="lastWeek">Last Week</Select.Option>
            <Select.Option value="thisMonth">This Month</Select.Option>
        </Select>
        <Table dataSource={data.visits} loading={loading} rowKey="id">
            <ColumnGroup title="Visits">
                <Column title="Date" dataIndex="datetime" key="datetime" />
                <Column title="Device" dataIndex="device" key="device" />
                <Column title="IP" dataIndex="ip" key="ip" />
            </ColumnGroup>
        </Table>
        </>
    )
}

export default ListingPage
