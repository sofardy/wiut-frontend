import React, { useState } from "react";
import { Column } from "@ant-design/plots";
import { Checkbox, Input, Select, Slider } from "antd";

const StatisticsProduct = () => {
  const data = [
    {
      type: "f",
      sales: 38,
    },
    {
      type: "q",
      sales: 52,
    },
    {
      type: "w",
      sales: 61,
    },
    {
      type: "r",
      sales: 145,
    },
    {
      type: "t",
      sales: 48,
    },
    {
      type: "y",
      sales: 38,
    },
    {
      type: "u",
      sales: 38,
    },
    {
      type: "i",
      sales: 38,
    },
    {
      type: "a",
      sales: 48,
    },
    {
      type: "b",
      sales: 38,
    },
    {
      type: "c",
      sales: 38,
    },
    {
      type: "d",
      sales: 100,
    },
    {
      type: "e",
      sales: 48,
    },
    {
      type: "p",
      sales: 25,
    },
    {
      type: "g",
      sales: 38,
    },
    {
      type: "h",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "bottom",
      // 'top', 'bottom', 'middle',
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "salom",
      },
      sales: {
        alias: "salom",
      },
    },
    color: ({ type }) => {
      if (type === "r" || type === "p") {
        return "#000000";
      }
      return "#D9D9D9";
    },
    style: {
      borderRadius: 25,
      shadowColor: "black",
    },
  };

  const marks = {
    0: "1M",
    30: "3M",
    60: "6M",
    100: "всё время",
  };

  return (
    <>
    <div className="filters mb-3">
            <div className="row">
              <div className="col-md-4">
                <span className="small-text">Магазин</span>
                <Input
                  style={{ borderRadius: "25.5px" }}
                  placeholder="Search..."
                  className="filter-select w-100 mt-2"
                />
              </div>
              <div className="col-md-4">
                <span className="small-text">Магазин</span>
                <Select
                  allowClear
                  className="w-100 mt-2"
                  showSearch
                  placeholder="Все категории"
                  optionFilterProp="children"
                //   onChange={onChange}
                //   onSearch={onSearch}
                  defaultActiveFirstOption={true}
                  filterOption={(input, option) =>
                    (option?.children)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  <Select.Option value="jack">alifshop</Select.Option>
                  <Select.Option value="lucy">Lucy</Select.Option>
                  <Select.Option value="tom">Tom</Select.Option>
                </Select>
              </div>
              <div className="col-md-4">
                <span className="small-text">Магазин</span>
                <Input
                  style={{ borderRadius: "25.5px" }}
                  placeholder="Search..."
                  className="filter-select w-100 mt-2"
                />
              </div>
            </div>
    </div>
    <div className="main-contex">
      <p className="component-title">История цены</p>
      <div className="row">
        <div className="col-md-8">
          <Column {...config} />
        </div>
        <div className="col-md-4">
          <div className="d-flex flex-column bd-highlight h-md-400">
            <div className="bd-highlight">
              <p className="description">Временной диапазон</p>
              <Slider marks={marks} defaultValue={37} />
            </div>
            <div className="bd-highlight my-auto">
              <p className="description mt-5">Временной диапазон</p>
              <div className="mb-2">
                <Checkbox>alifshop.uz</Checkbox>
              </div>
              <Checkbox>alifshop.uz</Checkbox>
            </div>
            <div className="bd-highlight">
              <button className="py-2 px-4 main-btn">Смотреть на alifshop</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StatisticsProduct;
