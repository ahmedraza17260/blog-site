import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import styled from "styled-components"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  align-content: center;
  margin-bottom: 20px;
`
const PostImage = styled.div`
  flex: 25%;
  margin-right: 1rem;
  align-item: center;
  justify-content: center;
  align-content: center;
  margin-top: 0;
  margin-bottom: 30px;
  vertical-align: center;
`

const PostText = styled.div`
  flex: 75%;
  align-item: center;
  justify-content: center;
  align-content: center;
  margin-top: -45px;
  margin-bottom: 0px;
`

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allContentfulPost.nodes

    if (posts.length === 0) {
      return (
        <Layout location={this.props.location} title={siteTitle}>
          <SEO title="All posts" />
          <Bio />
          <p>
            No blog posts found. Add markdown posts to "content/blog" (or the
            directory you specified for the "gatsby-source-filesystem" plugin in
            gatsby-config.js).
          </p>
        </Layout>
      )
    }

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        <Bio />
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.title || post.slug

            return (
              <Post key={post.slug}>
                {/* <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                > */}
                <PostImage>
                  <Img
                    style={{
                      width: "150px",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      verticalAlign: "center",
                    }}
                    fluid={post.image.fluid}
                  />
                </PostImage>
                <PostText
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    verticalAlign: "center",
                  }}
                >
                  <header>
                    <h1>
                      <Link style={{ textAlign: "center" }} to={post.slug}>
                        {title}
                      </Link>
                    </h1>
                    {/* <small>{post.frontmatter.date}</small> */}
                  </header>
                  <section>
                    <p>{post.subtitle}</p>
                    {/* <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    /> */}
                  </section>
                </PostText>
                {/* </article> */}
              </Post>
            )
          })}
        </ol>
      </Layout>
    )
  }
}
export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      nodes {
        title
        subtitle
        author
        slug
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`
export const allPageQuery = JSON.stringify(pageQuery)
