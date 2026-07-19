import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({searchTerm,setSearchTerm}) {
  return (
    <div className="searchbar">
      <FaSearch className="search-icon"/>
      <input
        type="text"
        placeholder="Search food..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
      />
    </div>
  );
}