import TownsListLi from './TownPageLi';

export default function TownsList({ list }) {
  return (
    <div className="mt-4">
      <ul className="unstyled mt-0">
        {list.map((town) => (
          <li className="mb-4" key={town.id}>
            <TownsListLi item={town} />
          </li>
        ))}
      </ul>
    </div>
  );
}
