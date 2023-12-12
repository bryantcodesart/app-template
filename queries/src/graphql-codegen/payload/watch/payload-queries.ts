import { request } from 'graphql-request';
import { graphql } from '../__generated__';
import { PAYLOAD_API_ENDPOINT } from '../PAYLOAD_API_ENDPOINT';

interface BlogArticleListing {
  id: string;
  title: string;
  excerpt: string;
}
export async function getBlogListing(): Promise<BlogArticleListing[]> {
  // const GetBlogListingQuery = ;
  const result = await request(
    PAYLOAD_API_ENDPOINT,
    graphql(/* GraphQL */ `
      query GetBlogListing {
        Blogs {
          docs {
            id
            title
            excerpt
          }
        }
      }
    `)
  );
  const reshaped = result.Blogs.docs.map(({ id, title, excerpt }) => ({
    id: id.toString(),
    title,
    excerpt,
  }));
  return reshaped;
}
