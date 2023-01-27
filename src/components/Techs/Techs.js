import './Techs.css';

export default function Techs(props) {
  const techs = ['HTML','CSS','JS','React','Git','Express.js','mongoDB'];
  const listTechs = techs.map((tech, index) => (
    <li key={ index } className="tech techs__element">{tech}</li>
  ));

  return (
    <section className="techs">
      <h2 className="techs__heading">Технологии</h2>
      <h3 className="techs__title">7 технологий</h3>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className="techs__list">{listTechs}</ul>
    </section>
  );
}
