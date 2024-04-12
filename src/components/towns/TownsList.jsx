import TownsListLi from './TownPageLi';

export default function TownsList({ list }) {
  return (
    <div>
      <ul className="unstyled">
        {list.map((town) => (
          <li className="mb-4" key={town.id}>
            <TownsListLi item={town} />
          </li>
        ))}
      </ul>
    </div>
  );
}
