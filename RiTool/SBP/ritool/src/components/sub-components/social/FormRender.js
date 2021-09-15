import React from "react";
import { withCookies } from "react-cookie";
import { connect } from "react-redux";
import history from "../../../history";
import {
  Segment,
  Dimmer,
  Loader,
  Button,
  Icon,
  Header,
  Message,
  Grid,
  Form,
  Comment,
  List,
} from "semantic-ui-react";
import {
  fetchForm,
  fetchFile,
  postComments,
  getComments,
  deleteComment,
} from "../../../actions/form";
import { reduxForm, Field } from "redux-form";
import SocialHeader from "./SocialHeader";

class FormRender extends React.Component {
  async componentDidMount() {
    this.props.getComments(
      this.props.cookies.cookies.usertoken,
      this.props.match.params.id
    );
    await this.props.fetchForm(
      this.props.cookies.cookies.usertoken,
      this.props.match.params.id
    );

    if (!this.props.formFetch[this.props.match.params.id]) {
      history.push("/Social");
    }
  }

  fileClick = (path, filename) => {
    console.log(path);
    window.open(path);
  };

  renderFormIcons() {
    if (
      this.props.formFetch[this.props.match.params.id].user["username"] ===
      this.props.loggedInUserName
    ) {
      return (
        <div>
          <Icon
            name="delete"
            circular
            color="red"
            size="large"
            onClick={() => {
              history.push(
                `/Social/Form/DeleteForm/${this.props.match.params.id}`
              );
            }}
          />
          <Icon name="bookmark" circular color="teal" size="large" />
        </div>
      );
    }
  }

  renderTextField = ({ input, meta, label, type }) => {
    return (
      <Form.Field>
        <input
          placeholder={label}
          {...input}
          autoComplete="off"
          type={type}
          style={{ minHeight: 75 }}
        />
        {/* {this.renderError(meta)} */}
      </Form.Field>
    );
  };

  onCommentSubmit = (formData) => {
    postComments(
      this.props.cookies.cookies.usertoken,
      this.props.match.params.id,
      formData.comment
    );
  };

  onDeleteComment = (id) => {
    console.log(id);
    deleteComment(this.props.cookies.cookies.usertoken, id);
  };

  renderComments = () => {
    const comments = [];
    if (this.props.fetchedComments) {
      this.props.fetchedComments.forEach((e) => {
        const date = new Date(e.created_at);
        if (
          e.user.username === this.props.loggedInUserName &&
          `${e.form}` === `${this.props.match.params.id}`
        ) {
          comments.push(
            <Comment key={`${e.user.username}${e.created_at}`}>
              <Comment.Content>
                <Button
                  floated="right"
                  basic
                  size="mini"
                  color="red"
                  icon="delete"
                  circular
                  onClick={() => this.onDeleteComment(e.id)}
                />
                <Comment.Author as="a">{e.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}</div>
                </Comment.Metadata>
                <Comment.Text>{e.body_content}</Comment.Text>
              </Comment.Content>
            </Comment>
          );
        } else if (`${e.form}` === `${this.props.match.params.id}`) {
          comments.push(
            <Comment key={`${e.user.username}${e.created_at}`}>
              <Comment.Content>
                <Comment.Author as="a">{e.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`}</div>
                </Comment.Metadata>
                <Comment.Text>{e.body_content}</Comment.Text>
              </Comment.Content>
            </Comment>
          );
        }
      });
      return comments;
    } else {
      console.log("It is empty");
    }
  };

  renderForm() {
    const form = this.props.formFetch[this.props.match.params.id];

    if (form) {
      const username = this.props.formFetch[this.props.match.params.id].user
        ? this.props.formFetch[this.props.match.params.id].user["username"]
        : "Loading...";
      const files = [];
      if (form.file_url) {
        Object.entries(form.file_url).forEach(([key, value]) => {
          files.push(
            <List.Item key={key} fluid>
              <List.Icon name="file" size="small" verticalAlign="middle" />
              <List.Content>
                <List.Header as="a" onClick={() => this.fileClick(value, key)}>
                  {key}
                </List.Header>
                <List.Description as="a">Click to Download</List.Description>
              </List.Content>
            </List.Item>
            // <Button
            //   value={value}
            //   key={key}
            //   basic
            //   fluid
            //   color="teal"
            //   onClick={() => this.fileClick(value, key)}
            // >
            //   <Icon name="file" />
            //   {key}
            // </Button>
          );
        });
      }
      return (
        <div>
          {this.renderFormIcons()}

          <Grid>
            <Grid.Row style={{ height: "5vh" }} />
            <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column stretched width={10}>
                <Segment>
                  <Header textAlign="center" as="h1" content={form.title} />
                  <Message>{form.details}</Message>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3}>
                <Segment compact>
                  <Header
                    textAlign="center"
                    block
                  >{`Author: ${username}`}</Header>
                  <List divided relaxed fluid>
                    {files}
                  </List>
                  {/* <Button.Group vertical labeled icon size="small" fluid>
                    {files}
                  </Button.Group> */}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{ height: "10vh" }} />
            <Grid.Row>
              <Grid.Column width={2} />
              <Grid.Column width={10}>
                <Form onSubmit={this.props.handleSubmit(this.onCommentSubmit)}>
                  <Field
                    name="comment"
                    id="input-comment"
                    fieldtype="input"
                    placeholder="Enter Summary"
                    label="Enter your Comment here!"
                    component={this.renderTextField}
                  />
                  <Button floated="right" content="Post" basic color="blue" />
                  <Comment.Group>
                    <Header as="h3" dividing content="COMMENTS" />
                    {this.renderComments()}
                  </Comment.Group>
                </Form>
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    } else {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }
  }

  render() {
    return (
      <div>
        <SocialHeader />
        {this.renderForm()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.authenticate.isSignedIn,
    loggedInUserName: state.authenticate.userId,
    formFetch: state.formInfo,
    userInfo: state.userInfo,
    fetchedComments: state.formInfo.fetchedComments,
  };
};

const formWrapped = reduxForm({
  form: "commentAdded",
})(FormRender);

export default withCookies(
  connect(mapStateToProps, { fetchForm, postComments, getComments })(
    formWrapped
  )
);
