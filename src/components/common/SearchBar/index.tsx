import styles from "./SearchBar.module.css";

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
};

export default SearchBar;
