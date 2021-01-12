import {Layout, Slider} from "antd";
import React from "react";

const Filter = ({pageQDispatch,queryParams}) => {
    const {abv_gt, abv_lt, ibu_gt, ibu_lt, ebc_gt, ebc_lt} = queryParams
    const queryParamsRangeDispatch = (type,range) => {
        pageQDispatch({type: `queryParams.${type}_gt`,payload: range[0]})
        pageQDispatch({type: `queryParams.${type}_lt`,payload: range[1]})
    }
    const abvChange = e => queryParamsRangeDispatch('abv', e)
    const ibuChange = e => queryParamsRangeDispatch('ibu', e)
    const ebcChange = e => queryParamsRangeDispatch('ebc', e)
    return <Layout.Sider theme="light" style={{padding: '20px'}}>
        <h4>Процент</h4>
        <Slider marks={{ 0: '0%', 60: '60%' }} range defaultValue={[abv_gt,abv_lt]} min={0} max={60}
                tipFormatter={ value => `${value}%`} onAfterChange={abvChange}/>
        <h4>Горечь</h4>
        <Slider marks={{ 0: '0', 95: '95' }} range defaultValue={[ibu_gt, ibu_lt]} min={0} max={95}
                tipFormatter={ value => `${value} IBU`} onAfterChange={ibuChange}/>
        <h4>Цвет</h4>
        <Slider marks={{ 0: '0', 120: '120' }} range defaultValue={[ebc_gt, ebc_lt]} min={0} max={120}
                tipFormatter={ value => `${value} EBC`} onAfterChange={ebcChange}/>
    </Layout.Sider>
}

export default Filter