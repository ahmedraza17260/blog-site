import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Img from "gatsby-image"

class BlogPostContentfulTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPost
    const post1 = this.props.data.contentfulPostDesc
    const siteTitle = this.props.data.site.siteMetadata.title
    // const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.title} description={post.subtitle} />
        {/* <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        > */}
        <header>
          <Img fluid={post.image.fluid} />
          <h1 style={{ textAlign: "center" }}>{post.title}</h1>
        </header>
        <section
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON.stringify(post1.description)),
          }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
        {/* </article> */}
        {/* <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.slug} rel="prev">
                  ← {previous.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.slug} rel="next">
                  {next.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav> */}
      </Layout>
    )
  }
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      title
      subtitle
      author
      description {
        raw
      }
      image {
        fluid {
          ...GatsbyContentfulFluid
        }
      }
    }
    contentfulPostDesc(slug: { eq: $slug }) {
      description {
        raw
      }
    }
  }
`
export const allPageQuery = JSON.stringify(pageQuery)
