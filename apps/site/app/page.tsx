import { getBlogListing } from '@mono/queries';

export default async function Index() {
  const blogArticles = await getBlogListing();

  return (
    <ul>
      {blogArticles.map((article) => (
        <li key={article.title}>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}
