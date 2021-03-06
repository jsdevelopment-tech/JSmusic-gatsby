import React from 'react';
import { graphql } from 'gatsby';
import RichText from '../components/RichText';
import Layout from '../components/layout'
import styled, { keyframes } from 'styled-components'
import { fadeIn, rollIn } from 'react-animations'

const tadaFlip = keyframes(rollIn);
const fadeInAnimation = keyframes`${fadeIn}`;

const HeadImg = styled.img`
  border-radius: 50%;
  width: 35%;
  border: .1rem solid #66FEFF;
  text-align: center;
`
const HeadImgContainer = styled.div`
  text-align: center;
    animation: 1s ${tadaFlip};
  max-width:900px;
  margin: 0 auto;

`;

const PageContent = styled.div`
  animation: 4s ${fadeInAnimation};
    max-width:900px;
    margin: 0 auto 150px;


`
const PageTitle = styled.div`
    margin: 0 auto;
    max-width:900px;

`
const PageMain = styled.div`
  padding-top: 20px;
`
export const query = graphql`
query PageQuery($id: String) {
  prismic {
    allPages(id: $id) {
      edges {
        node {
          page_title
          header_img
          content
          _meta {
            uid
          }
        }
      }
    }
  }
}
`

const Page = (props) => {
  const prismicContent = props.data.prismic.allPages.edges[0]
  if (!prismicContent) return null
  const pageTitle = props.data.prismic.allPages.edges[0].node.page_title;
  const pageContent = props.data.prismic.allPages.edges[0].node.content;
  const pageHeaderImg = props.data.prismic.allPages.edges[0].node.header_img.url;
  return (

    <Layout>
      <PageMain>
        <PageTitle>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <RichText render={pageTitle} />
              </div>
            </div>
          </div>
        </PageTitle>
        <HeadImgContainer>
          <HeadImg alt={props.data.prismic.allPages.edges[0].node.header_img.alt} src={pageHeaderImg} />
        </HeadImgContainer>
        <PageContent>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <RichText render={pageContent} />
              </div>
            </div>
          </div>

        </PageContent>
      </PageMain>
    </Layout>

  )
}
export default Page;