import './AboutProject.css';

export default function AboutProject(props){
    return (
        <section id="about-project" className="about-project">
            <h2 className="about-project__heading">О проекте</h2>
            <div className="about-project__articles">
                <div className="about-project__article">
                    <h3 className="about-project__title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__article">
                    <h3 className="about-project__title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__deadline">
                <div className="about-project__deadline-part about-project__deadline-part_type_backend">
                    <div className="about-project__deadline-block about-project__deadline-block_type_backend">1 неделя</div>
                    <p className="about-project__deadline-block-name">Back-end</p>
                </div>
                <div className="about-project__deadline-part about-project__deadline-part_type_frontend">
                    <div className="about-project__deadline-block about-project__deadline-block_type_frontend">4 недели</div>
                    <p className="about-project__deadline-block-name">Front-end</p>
                </div>
            </div>
        </section>
    )
}
