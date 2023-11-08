import { GraphQLClient, gql } from 'graphql-request';
const token = `Bearer ${process.env.HYGRAPH_TOKEN}`;

const hygraph = new GraphQLClient(
  'https://api-us-west-2.hygraph.com/v2/clonip6y9eh7001up3i1c52l4/master',
  {
    headers: { Authorization: token },
  }
);

export const getAllPosts = async () => {
  const QUERY = gql`
    {
      posts {
        id
        title
        excerpt
        image {
          url
        }
        categories {
          categoryName
          id
        }
        slug
      }
    }
  `;
  const { posts } = await hygraph.request(QUERY);

  return posts;
};

export const getCategories = async () => {
  const QUERY = gql`
    {
      categories {
        categoryName
        id
        slug
      }
    }
  `;

  const { categories } = await hygraph.request(QUERY);
  return categories;
};

export const getSimilarPosts = async () => {
  const QUERY = gql`
    {
      posts {
        id
        title
        excerpt
        image {
          url
        }
        categories {
          categoryName
          id
        }
        slug
      }
    }
  `;
  const posts = await hygraph.request(QUERY);
  console.log('hhh ', posts);
  return posts;
};

/*
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featuredImage {
          url
        }
        author {
          id
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        id
        content {
          raw
        }
        categories {
          id
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        id
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        id
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            id
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
              id
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          id
          name
          bio
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
        id
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
        id
      }
    }
  `;
  const result = await request(graphqlAPI, query);

  return result.posts;
};
*/
