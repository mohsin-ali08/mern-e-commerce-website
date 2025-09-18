import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Radio, Checkbox, Slider, Typography, Divider, Tag } from "antd";

const { Title } = Typography;

const FilterSideBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    category: "",
    gander: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const categories = ["Top Wear", "Bottom Wear"];
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange", "Gray", "Brown"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = ["Cotton", "Polyester", "Wool", "Silk", "Denim", "Leather"];
  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour", "New Balance"];
  const genders = ["Men", "Women"];

  // Load filters from URL params
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gander: params.gander || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: Number(params.minPrice) || 0,
      maxPrice: Number(params.maxPrice) || 100,
    });
  }, [searchParams]);

  // Update URL
  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  // Handle change
  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  return (
    <div className="p-6 bg-white">
      <Title level={4} className="mb-4 text-gray-800">Filters</Title>

      {/* Category */}
      <Divider orientation="left">Category</Divider>
      <Radio.Group
        onChange={(e) => handleFilterChange("category", e.target.value)}
        value={filters.category}
        className="flex flex-col gap-2"
      >
        {categories.map((cat) => (
          <Radio key={cat} value={cat}>{cat}</Radio>
        ))}
      </Radio.Group>

      {/* Gender */}
      <Divider orientation="left">Gender</Divider>
      <Radio.Group
        onChange={(e) => handleFilterChange("gander", e.target.value)}
        value={filters.gander}
        className="flex flex-col gap-2"
      >
        {genders.map((g) => (
          <Radio key={g} value={g}>{g}</Radio>
        ))}
      </Radio.Group>

      {/* Color */}
      <Divider orientation="left">Color</Divider>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <Tag.CheckableTag
            key={color}
            checked={filters.color === color}
            onChange={() => handleFilterChange("color", color)}
             className={`w-9 h-9 rounded-full border-2 focus:outline-none transition-transform transform hover:scale-110 ${
                  filters.color === color
                    ? "ring-2 ring-blue-500 border-black"
                    : "border-gray-300"
                }`}
            style={{ backgroundColor: color.toLowerCase(), color: "white", borderRadius: "50%", width: 28, height: 28 }}
          />
        ))}
      </div>

      {/* Size */}
      <Divider orientation="left">Size</Divider>
      <Checkbox.Group
        options={sizes}
        value={filters.size}
        onChange={(val) => handleFilterChange("size", val)}
        className="flex flex-col gap-2"
      />

      {/* Material */}
      <Divider orientation="left">Material</Divider>
      <Checkbox.Group
        options={materials}
        value={filters.material}
        onChange={(val) => handleFilterChange("material", val)}
        className="flex flex-col gap-2"
      />

      {/* Brand */}
      <Divider orientation="left">Brand</Divider>
      <Checkbox.Group
        options={brands}
        value={filters.brand}
        onChange={(val) => handleFilterChange("brand", val)}
        className="flex flex-col gap-2"
      />

      {/* Price */}
      <Divider orientation="left">Price Range</Divider>
      <Slider
        range
        min={0}
        max={100}
        value={[filters.minPrice, filters.maxPrice]}
        onChange={(val) => handleFilterChange("minPrice", val[0]) || handleFilterChange("maxPrice", val[1])}
      />
      <div className="flex justify-between text-sm text-gray-600">
        <span>${filters.minPrice}</span>
        <span>${filters.maxPrice}</span>
      </div>
    </div>
  );
};

export default FilterSideBar;
