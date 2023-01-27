import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm(props) {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__search-container">
          <input
            className="search-form__input"
            // value={this.state.name || ""}
            // onChange={this.handleChangeName}
            // required
            // type={this.props.type || "text"}
            // name={this.props.name}
            // minLength={this.props.minLength || null}
            // maxLength={this.props.maxLength || null}
            // id={this.props.id}
            // className={this.props.className}
            placeholder="Фильм"
          />
          <button className="search-form__search-button" type="submit">
            Найти
          </button>
        </div>
        <div className="search-form__checkbox-container">
          <FilterCheckbox />
          <p className="search-form__checkbox-title">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}
