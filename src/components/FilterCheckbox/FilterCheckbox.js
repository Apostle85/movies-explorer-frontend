import "./FilterCheckbox.css";

export default function FilterCheckbox(props) {
  return (
      <label className="filter-checkbox">
        <input className="filter-checkbox__input" type="checkbox" />
        <div className="filter-checkbox__switch"></div>
      </label>
  );
}
