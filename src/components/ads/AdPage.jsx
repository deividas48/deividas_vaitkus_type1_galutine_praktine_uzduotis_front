export default function AdPage({ item }) {
  return (
    <div>
      <ul>
        <li>{item.id}</li>
        <li>{item.title}</li>
        <li>{item.main_image_url}</li>
        <li>{item.description}</li>
        <li>{item.price}</li>
        <li>{item.phone}</li>
        <li>{item.type}</li>
        <li>{item.town_id}</li>
        <li>{item.user_id}</li>
        <li>{item.category_id}</li>
        <li>{item.created_at}</li>
        <li>{item.is_published}</li>
      </ul>
    </div>
  );
}
