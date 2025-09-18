import React from "react";
import { useSearchParams } from "react-router-dom";
import { Select } from "antd";

const { Option } = Select;

export const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const current = searchParams.get("sortBy") || "";

  const handleChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    setSearchParams(params);
  };

  return (
    <div className="flex items-center md:justify-end justify-center mb-6">
      <Select
        value={current || undefined} 
        onChange={handleChange}
        placeholder="Sort By"
        allowClear
        style={{ width: 260 }}
        size="large"
        dropdownStyle={{ borderRadius: "10px" }}
      >
        <Option value="priceAsc">Price: Low to High</Option>
        <Option value="priceDesc">Price: High to Low</Option>
        <Option value="popularity">Popularity</Option>
      </Select>
    </div>
  );
};
