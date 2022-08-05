export default function CardMenuReport(props) {
  return (
    <>
      <div style={{ display: "none" }}>
        {(document.title = "Reportes de " + props.type)}
      </div>
      <div className="viewTitle">
        <h1>Reportes de {props.type}</h1>
      </div>
      <div className="viewBody">
        <div className="schedules-cards-container">
          <div className="cards-container">{props.children}</div>
        </div>
      </div>
    </>
  );
}
