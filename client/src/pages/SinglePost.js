import React from "react";
import { useQuery, gql } from '@apollo/client'
import { Card, Grid } from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../components/LikeButton";


const FETCH_POST_QUERY = gql`
  query($postId: ID!){
    getPost(postId: $postId){
      id body createdAt username likeCount
      likes {
        username
      }
      commentCount
      comments{
        id username createdAt body
      }
    }
  }
`;

function SinglePost(props) {
  const postId = props.match.params.postId
  console.log('postId: ', postId)
  const { data: { getPost } } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })
  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>
  } else {
    const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost
    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
          floated="right"
          size="small"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
  if()
  return (

  );
}

export default SinglePost;
