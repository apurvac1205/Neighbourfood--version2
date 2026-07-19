import "./FilterBar.css";

const categories=[
"All",
"Meals",
"Bakery",
"Vegetables",
"Fruits",
"Beverages"
];

export default function FilterBar({selected,setSelected}) {
  return (
    <div className="filter-bar">
      {categories.map(category=>(
        <button
          key={category}
          className={selected===category?"active-filter":""}
          onClick={()=>setSelected(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}