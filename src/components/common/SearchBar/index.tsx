import styles from "./SearchBar.module.css";
import icon from "../../../assets/magnifying-glass-svgrepo-com.svg";


const SearchBar = (props: any) => {
    return (
        <input 
         key="search-bar"
         value={props.keyword}
         placeholder={"Search Buildings"}
         onChange={(e) => props.onChange(e.target.value)}
         className={styles.searchBar}
        />
    );
  }
  
  export default SearchBar;